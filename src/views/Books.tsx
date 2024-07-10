"use client";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "@emotion/styled";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import { API_URL } from "@/constants";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useAccountStore } from "@/store";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: calc(100vh - 200px);
`;

const RecomendationBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
`;

const ButtonSearch = styled.button`
  padding: 10px 20px;
  height: 50px;
  background-color: #0a0a0a;
  border: none;
  color: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  margin-left: 20px;
  &:active {
    background-color: #171717;
  }
`;

const Books = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 30px;
  align-items: center;
  padding: 110px 0;
`;

const BooksRecomedation = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 50px;
  align-items: center;
`;

const BookItem = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  height: 400px;
  background-color: #d9d9d9;
  align-items: center;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 10, 0.7);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 10, 0.7);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 10, 0.7);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  padding-top: 20px;
  &:hover {
    transform: translateY(-10px);
    transition: all 0.2s ease-in-out;
  }
  .book-image {
    object-fit: cover;
    width: 160px;
    height: 200px;
  }
`;
const BookItemBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  padding: 20px;
  width: 100%;
  background-color: #0a0a0a;
  height: 100%;
`;
const BookTitle = styled.h1`
  font-size: 25px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`;
const BookAuthor = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
  outline: "none",
  height: "80vh",
};

const topAnimation = {
  hidden: { y: 100, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.3 },
  }),
};
const bottomAnimation = {
  hidden: { y: -100, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.3 },
  }),
};

type Book = {
  id: number;
  title: string;
  description: string;
  pdfFile: string;
  size: number;
  genreName: string;
  picture: string | null;
  likesCount: number;
  sharesCount: number;
  authorFirstName: string;
  authorLastName: string;
};

type Genre = {
  id: number;
  name: string;
};

const BooksPage: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string>("");

  const [open, setOpen] = React.useState(false);
  const [books, setBooks] = useState<Array<Book>>([]);
  const [genres, setGenres] = useState<Array<Genre>>([]);

  const [recomendationBooks, setRecomendationBooks] = useState<Array<Book>>([]);

  const router = useRouter();

  const searchParams = useSearchParams();

  const genre = searchParams.get("genre");

  const account = useAccountStore((state) => state.account);

  const { enqueueSnackbar } = useSnackbar();

  const getBooksAndGenres = async () => {
    try {
      const booksResponse = await fetch(
        genre ? `${API_URL}/books/?genre=${genre}` : `${API_URL}/books/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const genresResponse = await fetch(`${API_URL}/genres/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!booksResponse.ok || !genresResponse.ok) {
        throw new Error("Не вдалося отримати книги або жанри");
      }
      const booksData = await booksResponse.json();
      const genresData = await genresResponse.json();

      setBooks(booksData);
      setGenres(genresData);
    } catch (error) {
      enqueueSnackbar("Не вдалося отримати книги або жанри", {
        variant: "error",
      });
      console.log(error);
    }
  };

  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const handleChangeGenres = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setSelectedGenres(
      // On autofill we get a stringified value.
      value
    );
  };

  const handleFilter = () => {
    if (selectedGenres.length === 0) {
      router.push("/books/");
      return;
    }
    router.push(`/books/?genre=${selectedGenres}`);
  };

  const handleGetRecomendation = async () => {
    setLoading(true);
    try {
      const recomendationResponse = await fetch(`${API_URL}/recommend/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account.auth_token}`,
        },
      });

      if (!recomendationResponse.ok) {
        throw new Error("Не вдалося отримати рекомендацію");
      }

      const recomendationData = await recomendationResponse.json();

      console.log(recomendationData.recommended_books);

      setRecomendationBooks(
        recomendationData.recommended_books.map((book: Book) => ({
          ...book,
          picture: `${API_URL}/${book.picture}`,
        }))
      );
    } catch (error) {
      enqueueSnackbar("Не вдалося отримати рекомендацію", {
        variant: "error",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getBooksAndGenres();
  }, [genre]);

  console.log(recomendationBooks);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.4, once: true }}
    >
      <Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Ваша рекомендація:
            </h1>
            <Box
              sx={{
                paddingBottom: "20px",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                width: "100%",
                height: "65vh",
                overflowY: "scroll",
              }}
            >
              {!loading && (
                <BooksRecomedation>
                  {recomendationBooks.map((book, index) => (
                    <BookItem href={"/books/" + book.id}>
                      <div>
                        <Image
                          src={book.picture || "/book.png"}
                          width={100}
                          height={200}
                          alt="book"
                          className="book-image"
                        />
                      </div>
                      <BookItemBottom>
                        <BookTitle>{book.title}</BookTitle>
                        <BookAuthor>{`${book.authorFirstName} ${book.authorLastName}`}</BookAuthor>
                      </BookItemBottom>
                    </BookItem>
                  ))}
                </BooksRecomedation>
              )}
              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <CircularProgress size={200} sx={{ color: "#0a0a0a" }} />
                </Box>
              )}
            </Box>
          </Box>
        </Modal>
        <RecomendationBlock>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Обрати жанр</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              // @ts-ignore
              value={selectedGenres}
              onChange={handleChangeGenres}
              label="Choose genres"
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ButtonSearch onClick={() => handleFilter()}>
            Фільтрувати
          </ButtonSearch>
          {account.auth_token && (
            <ButtonSearch
              onClick={() => {
                setOpen(true);
                handleGetRecomendation();
              }}
            >
              Створити рекомендацію
            </ButtonSearch>
          )}
        </RecomendationBlock>
        <Books>
          {books.map((book, index) => (
            <BookItem href={"/books/" + book.id}>
              <div>
                <Image
                  src={book.picture || "/book.png"}
                  width={100}
                  height={200}
                  alt="book"
                  className="book-image"
                  objectFit="cover"
                />
              </div>
              <BookItemBottom>
                <BookTitle>{book.title}</BookTitle>
                <BookAuthor>{`${book.authorFirstName} ${book.authorLastName}`}</BookAuthor>
              </BookItemBottom>
            </BookItem>
          ))}
        </Books>
      </Container>
    </motion.div>
  );
};

export default BooksPage;
