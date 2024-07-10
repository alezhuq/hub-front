import React from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "@/constants";
import { useAccountStore } from "@/store";
import { useSnackbar } from "notistack";

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

const BookItem = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  background-color: #d9d9d9;
  align-items: center;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 10, 0.7);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 10, 0.7);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 10, 0.7);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  .book-image {
    margin-top: 20px;
    object-fit: cover;
    width: 120px;
    height: 150px;
  }
  .like-button {
    position: absolute;
    right: 1px;
    top: 1px;
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
const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  margin-top: 20px;
`;

export default function Book({
  book,
  getBooks,
}: {
  book: Book;
  getBooks: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const account = useAccountStore((state) => state.account);

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/books/${book.id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account.auth_token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Не вдалося видалити книгу");
      }
      getBooks();
      enqueueSnackbar("Книгу успішно видалено", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Не вдалося видалити книгу", {
        variant: "error",
      });
      console.log(error);
    }
  };

  return (
    <div key={book.id}>
      <BookItem href={"/books/" + book.id}>
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          color="error"
          className="like-button"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        <Image
          src={book.picture || "/book.png"}
          width={100}
          height={200}
          alt="book"
          className="book-image"
        />
        <BookItemBottom>
          <BookTitle>{book.title}</BookTitle>
          <BookAuthor>{`${book.authorLastName} ${book.authorFirstName}`}</BookAuthor>
        </BookItemBottom>
      </BookItem>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "4px",
            width: "500px",
            textAlign: "center",
            p: 4,
          }}
        >
          <Typography variant="h4">
            Ви впевнені що хочете видалити {book.title}?
          </Typography>
          <Buttons>
            <Button
              variant="contained"
              color="inherit"
              size="large"
              fullWidth
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: "500",
              }}
              onClick={() => setOpen(false)}
            >
              Назад
            </Button>
            <Button
              variant="contained"
              color="error"
              size="large"
              fullWidth
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: "500",
              }}
              onClick={() => {
                handleDelete();
                setOpen(false);
              }}
            >
              Видалити
            </Button>
          </Buttons>
        </Box>
      </Modal>
    </div>
  );
}
