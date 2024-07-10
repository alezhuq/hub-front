"use client";
import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {
  ListItemText,
  ListItemAvatar,
  Avatar,
  Rating,
  TextField,
  Button,
} from "@mui/material";
import { API_URL } from "@/constants";
import { useSnackbar } from "notistack";
import Link from "next/link";
import { useAccountStore } from "@/store";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;
const BookWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
  margin-bottom: 60px;
`;
const TopWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  align-items: center;
  margin: 120px 0;
  position: relative;
  .book-image {
    object-fit: cover;
    width: 500px;
    height: 700px;
  }
`;
const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  align-items: center;
  h1 {
    font-size: 50px;
    font-weight: 600;
    line-height: 1.5;
    color: #0a0a0a;
    text-align: left;
  }
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
    text-align: left;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    text-align: left;
    line-height: 1.6;
  }
`;

const comments = [
  {
    author: "John Doe",
    avatar: "/avatar1.jpg",
    text: "Great book!",
    score: 5,
  },
  {
    author: "John Doe",
    avatar: "/avatar1.jpg",
    text: "Great book!",
    score: 5,
  },
];

type Rating = {
  id: number;
  book: number;
  grade: number;
  reading_time: string;
  comment: string;
  user_name: string;
  user_lastname: string;
  user: number;
};

type Book = {
  id: number;
  title: string;
  description: string;
  pdfFile: string;
  size: number;
  genreName: string;
  picture: string;
  likesCount: number;
  sharesCount: number;
  authorFirstName: string | null;
  authorLastName: string | null;
  ratings: Rating[];
};

const Book = ({ id }: { id: string }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  const [newComment, setNewComment] = React.useState("");

  const [newRating, setNewRating] = React.useState(0);

  const [currentBook, setCurrentBook] = React.useState<Book | null>(null);

  const [isUserAddedComment, setIsUserAddedComment] = React.useState(false);

  const isAddedCommet = React.useRef<boolean>(false);

  const [timeSpent, setTimeSpent] = React.useState<number>(0);
  const startTime = React.useRef<number | null>(null);
  const isActive = React.useRef<boolean>(true);

  const account = useAccountStore((state) => state.account);

  const commentId = React.useRef<number | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleRatingChange = (newValue: number | null) => {
    if (newValue === null) {
      return;
    }
    setNewRating(newValue);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const getBookData = async () => {
    try {
      const response = await fetch(`${API_URL}/books/${id}/`, {
        method: "GET",
        headers: account.auth_token
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${account.auth_token}`,
            }
          : { "Content-Type": "application/json" },
      });
      const data = await response.json();

      setIsLiked(Boolean(data.is_liked));

      setCurrentBook(data);
      if (!account.auth_token) return;

      const accountResponse = await fetch(`${API_URL}/account/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account.auth_token}`,
        },
      });

      if (!accountResponse.ok) {
        throw new Error("Не вдалося отримати дані про акаунт");
      }

      const accountData = await accountResponse.json();

      const isUserAddedCommentToBook = data.ratings.some(
        (rating: Rating) =>
          rating.user === accountData.id && rating.grade !== null
      );

      const isCommentExist = data.ratings.some(
        (rating: Rating) => rating.user === accountData.id
      );

      commentId.current = data.ratings.find(
        (rating: Rating) => rating.user === accountData.id
      )?.id;

      isAddedCommet.current = isCommentExist;
      setIsUserAddedComment(isUserAddedCommentToBook);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Не вдалося отримати дані про книгу", {
        variant: "error",
      });
    }
  };

  const handleShare = async () => {
    try {
      if (account.auth_token) {
        const response = await fetch(`${API_URL}/books/${id}/share/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${account.auth_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Не вдалося поділитись книгою");
        }
      }

      const currentUrl = window.location.href;

      navigator.clipboard.writeText(currentUrl).then(() => {
        enqueueSnackbar("Книга успішно скопійована", {
          variant: "success",
        });
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Не вдалося поділитись книгою", {
        variant: "error",
      });
    }
  };

  const handleAddComment = async () => {
    if (!account.auth_token) return;
    try {
      const response = await fetch(
        isAddedCommet.current
          ? `${API_URL}/bookratings/${commentId.current}/`
          : `${API_URL}/books/${id}/rate/`,
        {
          method: isAddedCommet.current ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${account.auth_token}`,
          },
          body: JSON.stringify({
            comment: newComment,
            grade: newRating,
            book: id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Не вдалося додати коментар");
      }

      setNewComment("");
      setNewRating(0);
      getBookData();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Не вдалося додати коментар", {
        variant: "error",
      });
    }
  };

  const handleLikeBook = async () => {
    if (!account.auth_token) return;
    try {
      const response = await fetch(`${API_URL}/books/${id}/like/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account.auth_token}`,
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Не вдалося вподобати книгу");
      }
      getBookData();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Не вдалося вподобати книгу", {
        variant: "error",
      });
    }
  };

  React.useEffect(() => {
    if (!account.auth_token) return;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    const handleBlur = () => {
      stopTimer();
    };

    const handleFocus = () => {
      startTimer();
    };

    const startTimer = () => {
      if (!startTime.current) {
        startTime.current = Date.now();
      }
      isActive.current = true;
    };

    const stopTimer = () => {
      if (isActive && startTime.current) {
        const elapsedTime = Math.floor((Date.now() - startTime.current) / 1000);
        setTimeSpent((prevTime) => prevTime + elapsedTime);
        startTime.current = null;
        isActive.current = false;
        sendTimeToServer(elapsedTime);
      }
    };

    const sendTimeToServer = async (time: number) => {
      try {
        const response = await fetch(
          isAddedCommet.current
            ? `${API_URL}/bookratings/${commentId.current}/`
            : `${API_URL}/books/${id}/rate/`,
          {
            method: isAddedCommet.current ? "PATCH" : "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${account.auth_token}`,
            },
            body: JSON.stringify({
              reading_time: time,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Не вдалося вподобати книгу");
        }

        getBookData();
      } catch (error) {
        console.error(error);
        enqueueSnackbar("Не вдалося вподобати книгу", {
          variant: "error",
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    startTimer();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      stopTimer();
    };
  }, [startTime, isActive]);

  React.useEffect(() => {
    getBookData();
  }, []);



  return (
    <Container>
      <TopWrapper>
        <Image
          src={currentBook?.picture || ""}
          width={500}
          height={700}
          alt="book"
          className="book-image"
        />
        <TextBlock>
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
            <Box>
              {account.auth_token && (
                <Tooltip
                  title={isLiked ? "Видалити з обраних" : "Додати в обрані"}
                >
                  <IconButton color="error" onClick={() => handleLikeBook()}>
                    <FavoriteIcon
                      fontSize="large"
                      sx={{ fill: isLiked ? "#DC143C" : "#d9d9d9" }}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            <Tooltip title="Поділитись">
              <IconButton color="inherit" onClick={() => handleShare()}>
                <ReplyIcon fontSize="large" sx={{ fill: "gray" }} />
              </IconButton>
            </Tooltip>
          </Box>

          <h1>{currentBook?.title}</h1>
          <p>{currentBook?.genreName}</p>
          <h2>{`${currentBook?.authorLastName} ${currentBook?.authorFirstName}`}</h2>
          <p>{currentBook?.description}</p>
        </TextBlock>
      </TopWrapper>
      <BookWrapper>
        <iframe src={currentBook?.pdfFile} width="100%" height="100%"></iframe>
      </BookWrapper>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Відгуки
        </Typography>
        <Divider />
        <List sx={{ marginTop: 2 }}>
          {currentBook?.ratings
            .filter((rating) => rating.grade !== null)
            .map((comment, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={comment.user_name} sx={{ bgcolor: "violet" }}>
                      {comment.user_lastname[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${comment.user_lastname} ${comment.user_name}`}
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          component="span"
                          color="text.primary"
                        >
                          {comment.comment}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Rating
                  name="read-only"
                  value={comment.grade}
                  readOnly
                  precision={0.5}
                />
                {index !== comments.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          {account.auth_token ? (
            isUserAddedComment ? (
              <Box>
                <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
                  Ви вже залишили коментар
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}
              >
                <TextField
                  label="Коментар"
                  multiline
                  rows={3}
                  variant="outlined"
                  value={newComment}
                  onChange={handleCommentChange}
                  fullWidth
                />
                <Rating
                  name="new-rating"
                  value={newRating}
                  onChange={(event, newValue) => handleRatingChange(newValue)}
                  sx={{ marginTop: 1, width: "fit-content" }}
                  precision={0.5}
                />
                <Button
                  variant="contained"
                  onClick={handleAddComment}
                  sx={{
                    marginTop: 3,
                    backgroundColor: "#0a0a0a",
                    "&:hover": {
                      backgroundColor: "#171717",
                    },
                    width: "200px",
                  }}
                >
                  Залишити коментар
                </Button>
              </Box>
            )
          ) : (
            <Box>
              <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
                <Link href="/log-in">Увійдіть</Link> щоб мати змогу залишити
                коментар
              </Typography>
            </Box>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default Book;
