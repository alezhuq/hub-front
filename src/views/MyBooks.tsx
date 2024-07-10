"use client";
import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import BookItem from "@/components/BookItem";
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

const MyBooks: React.FC = () => {
  const [books, setBooks] = React.useState<Array<Book>>([]);

  const account = useAccountStore((state) => state.account);

  const { enqueueSnackbar } = useSnackbar();

  const getMyBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/books/my/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account.auth_token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Не вдалося отримати книги");
      }
      const data = await response.json();

      setBooks(data);
    } catch (error) {
      enqueueSnackbar("Не вдалося отримати книги", {
        variant: "error",
      });
      console.log(error);
    }
  };

  React.useEffect(() => {
    getMyBooks();
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
          <h1>Мої книжки</h1>
        </motion.div>
        <Books>
          {books.map((book, index) => (
            <BookItem key={index} book={book} getBooks={getMyBooks} />
          ))}
        </Books>
      </Wrapper>
    </motion.div>
  );
};

export default MyBooks;
