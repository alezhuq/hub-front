'use client'
import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'

const bookAuthors = [
  { value: 'Agatha Christie', label: 'Agatha Christie' },
  { value: 'J.K. Rowling', label: 'J.K. Rowling' },
  { value: 'George Orwell', label: 'George Orwell' },
  { value: 'Jane Austen', label: 'Jane Austen' },
  { value: 'Stephen King', label: 'Stephen King' },
  { value: 'Harper Lee', label: 'Harper Lee' },
  { value: 'J.R.R. Tolkien', label: 'J.R.R. Tolkien' },
  { value: 'F. Scott Fitzgerald', label: 'F. Scott Fitzgerald' },
  { value: 'Mark Twain', label: 'Mark Twain' },
  { value: 'Ernest Hemingway', label: 'Ernest Hemingway' },
  { value: 'Charles Dickens', label: 'Charles Dickens' },
  { value: 'Gabriel García Márquez', label: 'Gabriel García Márquez' },
  { value: 'Leo Tolstoy', label: 'Leo Tolstoy' },
  { value: 'Emily Brontë', label: 'Emily Brontë' },
  { value: 'Herman Melville', label: 'Herman Melville' },
  { value: 'Virginia Woolf', label: 'Virginia Woolf' },
  { value: 'Aldous Huxley', label: 'Aldous Huxley' },
  { value: 'Homer', label: 'Homer' },
  { value: 'Toni Morrison', label: 'Toni Morrison' },
  { value: 'Kazuo Ishiguro', label: 'Kazuo Ishiguro' },
]

const AccountInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 500px;
`

const Title = styled.h1`
  margin-top: 30px;
  font-size: 38px;
  color: #0a0a0a;
`

const ButtonAuth = styled.button<{ isOutlined: boolean }>`
  ${(p) => `
  padding: 10px 20px;
  background-color: ${p.isOutlined ? 'transparent' : 'rgba(255, 255, 255, 0.9)'};
  border: 2px solid #0a0a0a;
  color: ${p.isOutlined ? 'rgba(255, 255, 255, 0.9)' : '#0a0a0a'};
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  `}
`
const rightAnimation = {
  hidden: { x: 100, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.3 },
  }),
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const Account = () => {
  const [addAuthor, setAddAuthor] = React.useState<'manual' | 'select'>('manual')

  const [author, setAuthor] = React.useState('' as string)

  const handleAuthorChange = (event: SelectChangeEvent<string>) => {
    setAuthor(event.target.value as string)
  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    setAddAuthor(event.target.value as 'manual' | 'select')
  }

  const authorInputs = {
    manual: (
      <TextField
        sx={{
          outline: 'none',
          '& .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #171717',
          },
        }}
        type="text"
        label="Введіть автора"
        fullWidth
      />
    ),
    select: (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Виберіть автора</InputLabel>
        <Select
          sx={{
            outline: 'none',
            '& .MuiOutlinedInput-notchedOutline': {
              border: '2px solid #171717',
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={author}
          label="Виберіть автора"
          onChange={handleAuthorChange}
        >
          {bookAuthors.map((author) => (
            <MenuItem value={author.value}>{author.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
  }

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.4, once: true }}
      >
        <AccountInner>
          <motion.div
            custom={1}
            variants={rightAnimation}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Title>Add Book</Title>
          </motion.div>
          <motion.div custom={2} variants={rightAnimation} style={{ width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Автор</InputLabel>
              <Select
                sx={{
                  outline: 'none',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '2px solid #171717',
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={addAuthor}
                label="Автор"
                onChange={handleChange}
              >
                <MenuItem value={'manual'}>Додати в ручну</MenuItem>
                <MenuItem value={'select'}>Вибрати автора</MenuItem>
              </Select>
            </FormControl>
          </motion.div>
          <motion.div custom={3} variants={rightAnimation} style={{ width: '100%' }}>
            {authorInputs[addAuthor]}
          </motion.div>
          <motion.div custom={4} variants={rightAnimation} style={{ width: '100%' }}>
            <TextField
              sx={{
                outline: 'none',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '2px solid #171717',
                },
              }}
              type="text"
              label="Назва книги"
              fullWidth
            />
          </motion.div>
          <motion.div custom={5} variants={rightAnimation} style={{ width: '100%' }}>
            <TextField
              sx={{
                outline: 'none',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '2px solid #171717',
                },
              }}
              type="text"
              label="Опис книги"
              fullWidth
              multiline
              rows={4}
            />
          </motion.div>
          <motion.div custom={6} variants={rightAnimation} style={{ width: '100%' }}>
            <Button
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
              }}
              component="label"
              variant="contained"
              color="inherit"
              startIcon={<CloudUploadIcon />}
              size="large"
            >
              Завантажити книжку у форматі PDF
              <VisuallyHiddenInput type="file" accept=".pdf" />
            </Button>
          </motion.div>
          <motion.div
            custom={7}
            variants={rightAnimation}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              sx={{
                marginBottom: '30px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                backgroundColor: '#171717',
                color: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: '#171717',
                  color: 'rgba(255, 255, 255, 0.9)',
                },
              }}
              variant="contained"
              size="large"
            >
              Додати книгу
            </Button>
          </motion.div>
        </AccountInner>
      </motion.div>
    </>
  )
}

export default Account
