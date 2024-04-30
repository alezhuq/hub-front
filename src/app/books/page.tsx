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

const bookGenres = [
  { label: "Mystery", value: "mystery" },
  { label: "Science Fiction", value: "science_fiction" },
  { label: "Fantasy", value: "fantasy" },
  { label: "Romance", value: "romance" },
  { label: "Historical Fiction", value: "historical_fiction" },
  { label: "Thriller", value: "thriller" },
  { label: "Non-Fiction", value: "non_fiction" },
  { label: "Biography", value: "biography" },
  { label: "Horror", value: "horror" },
  { label: "Adventure", value: "adventure" },
  { label: "Poetry", value: "poetry" },
  { label: "Dystopian", value: "dystopian" },
  { label: "Comedy", value: "comedy" },
  { label: "Young Adult", value: "young_adult" },
  { label: "Children's", value: "childrens" },
  { label: "Crime", value: "crime" },
  { label: "Self-Help", value: "self_help" },
  { label: "Science", value: "science" },
  { label: "Travel", value: "travel" },
  { label: "Graphic Novel", value: "graphic_novel" },
];

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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
  &:hover {
    transform: translateY(-10px);
    transition: all 0.2s ease-in-out;
  }
  .book-image {
    margin-top: 20px;
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

const books = [
  {
    id: "1",
    title: "Спадок князя Володимира",
    author: "Ірина Лисенко",
    image: "/mock.avif",
  },
  {
    id: "2",
    title: "Закоханий Лісовик",
    author: "Олександр Мельник",
    image: "/mock.avif",
  },
  {
    id: "3",
    title: "Таємниця карпатського замку",
    author: "Марія Коваль",
    image: "/mock.avif",
  },
  {
    id: "4",
    title: "Пошук загубленого пергаменту",
    author: "Василь Шевчук",
    image: "/mock.avif",
  },
  {
    id: "5",
    title: "Легенди древнього Києва",
    author: "Оксана Іванова",
    image: "/mock.avif",
  },
];

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

const BooksPage: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const handleChangeGenres = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setSelectedGenres(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleGetRecomendation = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

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
                  {books.map((book, index) => (
                    <BookItem href={"/books/" + book.id}>
                      <Image
                        src={book.image}
                        width={100}
                        height={200}
                        alt="book"
                        className="book-image"
                      />
                      <BookItemBottom>
                        <BookTitle>{book.title}</BookTitle>
                        <BookAuthor>{book.author}</BookAuthor>
                      </BookItemBottom>
                    </BookItem>
                  )).filter((_, index) => index%2 === 0)}
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
              multiple
              label="Choose genres"
            >
              {bookGenres.map((genre) => (
                <MenuItem key={genre.value} value={genre.value}>
                  {genre.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ButtonSearch
            onClick={() => {
              setOpen(true);
              handleGetRecomendation();
            }}
          >
            Створити рекомендацію
          </ButtonSearch>
        </RecomendationBlock>
        <Books>
          {books.map((book, index) => (
            <motion.div
              custom={index}
              variants={index % 2 === 0 ? topAnimation : bottomAnimation}
            >
              <BookItem href={"/books/" + book.id}>
                <Image
                  src={book.image}
                  width={100}
                  height={200}
                  alt="book"
                  className="book-image"
                />
                <BookItemBottom>
                  <BookTitle>{book.title}</BookTitle>
                  <BookAuthor>{book.author}</BookAuthor>
                </BookItemBottom>
              </BookItem>
            </motion.div>
          ))}
        </Books>
      </Container>
    </motion.div>
  );
};

export default BooksPage;
