"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";
import { API_URL } from "@/constants";
import { useAccountStore } from "@/store";
import { useSnackbar } from "notistack";

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
`;

const Books = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 30px;
  justify-content: center;
`;

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

const rightAnimation = {
  hidden: { x: 100, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    x: 0,
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

const Liked = () => {
  const [books, setBooks] = useState<Array<Book>>([]);
  const account = useAccountStore((state) => state.account);

  const { enqueueSnackbar } = useSnackbar();

  const getLikedBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/account/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account.auth_token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Не вдалося отримати дані про акаунт");
      }
      const data = await response.json();

      Promise.all(
        data.likes.map(async (id: string) => {
          const response = await fetch(`${API_URL}/books/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Не вдалося отримати дані про книгу");
          }
          return response.json();
        })
      ).then((booksData) => {
        setBooks(booksData);
      });
    } catch (error) {
      enqueueSnackbar("Не вдалося отримати дані про книги", {
        variant: "error",
      });
      console.log(error);
    }
  };

  const removeLike = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/books/${id}/like/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account.auth_token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Не вдалося видалити лайк");
      }
      getLikedBooks();

      enqueueSnackbar("Лайк видалено", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Не вдалося видалити лайк", {
        variant: "error",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getLikedBooks();
  }, []);

  return (
    <motion.div
      style={{ width: "100%" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.4, once: true }}
    >
      <Wrapper>
        <motion.div custom={1} variants={rightAnimation}>
          <h1>Лайки</h1>
        </motion.div>
        <Books>
          {books.map((book) => (
            <BookItem href={"/books/" + book.id}>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  removeLike(book.id);
                }}
                color="error"
                className="like-button"
              >
                <FavoriteIcon fontSize="small" sx={{ fill: "#DC143C" }} />
              </IconButton>
              <Image
                src={book.picture || ""}
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
          ))}
        </Books>
      </Wrapper>
    </motion.div>
  );
};

export default Liked;
