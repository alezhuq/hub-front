'use client'
import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import Image from 'next/image'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
`

const Books = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 30px;
  justify-content: center;
`

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
`
const BookItemBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  padding: 20px;
  width: 100%;
  background-color: #0a0a0a;
`
const BookTitle = styled.h1`
  font-size: 25px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`
const BookAuthor = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
`
const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  margin-top: 20px;
`
const items = [
  {
    id: '1',
    title: '1984',
    author: 'George Orwell',
    image: '/book.webp',
    modal: false,
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    image: '/book.webp',
    modal: false,
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    image: '/book.webp',
    modal: false,
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    image: '/book.webp',
    modal: false,
  },
  {
    id: '5',
    title: '1984',
    author: 'George Orwell',
    image: '/book.webp',
    modal: false,
  },
  {
    id: '6',
    title: '1984',
    author: 'George Orwell',
    image: '/book.webp',
    modal: false,
  },
]

const topAnimation = {
  hidden: { y: 100, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.3 },
  }),
}
const bottomAnimation = {
  hidden: { y: -100, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.3 },
  }),
}

const rightAnimation = {
  hidden: { x: 100, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.3 },
  }),
}

const MyBooks: React.FC = () => {
  const [books, setBooks] = React.useState([...items])
  const handleOpen = (id: string) => {
    setBooks(
      books.map((book) => {
        if (book.id === id) {
          return { ...book, modal: true }
        }
        return book
      })
    )
  }
  const handleClose = (id: string) => {
    setBooks(
      books.map((book) => {
        if (book.id === id) {
          return { ...book, modal: false }
        }
        return book
      })
    )
  }
  const handleDelete = (id: string) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  return (
    <motion.div
      style={{ width: '100%' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.4, once: true }}
    >
      <Wrapper>
        <motion.div custom={1} variants={rightAnimation}>
          <h1>My Books</h1>
        </motion.div>
        <Books>
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              custom={2 + index}
              variants={index % 2 === 0 ? topAnimation : bottomAnimation}
            >
              <BookItem href={'/books/' + book.id}>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault()
                    handleOpen(book.id)
                  }}
                  color="error"
                  className="like-button"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
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
              <Modal open={book.modal} onClose={() => handleClose(book.id)}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '4px',
                    width: '500px',
                    textAlign: 'center',
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
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        fontWeight: '500',
                      }}
                      onClick={() => handleClose(book.id)}
                    >
                      Назад
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="large"
                      fullWidth
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        fontWeight: '500',
                      }}
                      onClick={() => {
                        handleClose(book.id)
                        handleDelete(book.id)
                      }}
                    >
                      Видалити
                    </Button>
                  </Buttons>
                </Box>
              </Modal>
            </motion.div>
          ))}
        </Books>
      </Wrapper>
    </motion.div>
  )
}

export default MyBooks
