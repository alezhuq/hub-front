"use client";
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { API_URL } from "@/constants";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useAccountStore } from "@/store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 64px);
  background-color: #0a0a0a;
`;

const ButtonAuth = styled.button<{ isOutlined: boolean }>`
  ${(p) => `
  padding: 10px 20px;
  background-color: ${
    p.isOutlined ? "transparent" : "rgba(255, 255, 255, 0.9)"
  };
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: ${p.isOutlined ? "rgba(255, 255, 255, 0.9)" : "#0a0a0a"};
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  `}
`;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 38px;
  color: rgba(255, 255, 255, 0.9);
`;
const AuthBlock = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  padding-top: calc(100vh * 0.2);
`;

const animation = {
  hidden: { y: -100, opacity: 0 },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

const textStyle = {
  ".MuiInputBase-input": {
    color: "rgba(255, 255, 255, 0.6) !important",
  },
  "&.MuiTextField-root": {
    "& .MuiInputLabel-outlined": {
      color: "rgba(255, 255, 255, 0.6)",
    },
    "& .MuiInputBase-inputSizeSmall": {
      color: "rgba(255, 255, 255, 0.6)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.6)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.6)",
    },
    "& .MuiFormHelperText-contained": {
      color: "error.main",
      margin: 0,
    },
  },
};

type Book = {
  description: string;
  genre: number;
  id: number;
  likesCount: number;
  pdfFile: string;
  sharesCount: number;
  size: number;
  title: string;
};

const SignIn = () => {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [books, setBooks] = React.useState<Array<Book>>([]);

  const [userBooks, setUserBooks] = React.useState<Array<number>>([]);

  const router = useRouter();

  const account = useAccountStore((state) => state.account);

  if (account.auth_token) {
    router.push("/");
    return null;
  }

  const handleChange = (event: SelectChangeEvent<typeof userBooks>) => {
    const {
      target: { value },
    } = event;
    setUserBooks(value as Array<number>);
  };

  const { enqueueSnackbar } = useSnackbar();

  const getBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/books/`);
      const data = await response.json();
      console.log(data);
      setBooks(data);
    } catch (error) {
      enqueueSnackbar("Помилка завантаження книг", { variant: "error" });
      console.error(error);
    }
  };

  const createAccount = async () => {
    try {
      const response = await fetch(`${API_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: name,
          last_name: surname,
          email,
          password,
          likes: userBooks,
        }),
      });

      if (!response.ok) {
        throw new Error("Не вдалося створити аккаунт");
      }

      const data = await response.json();
      console.log(data);
      enqueueSnackbar("Аккаунт успішно створено", { variant: "success" });
      router.push("/log-in");
    } catch (error) {
      enqueueSnackbar("Помилка створення аккаунту", { variant: "error" });
      console.error(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <motion.div initial="hidden" whileInView="visible">
      <Container>
        <AuthBlock>
          <motion.div custom={1} variants={animation}>
            <Title>Зареєструватись в BookHub</Title>
          </motion.div>
          <motion.div custom={2} variants={animation}>
            <TextField
              sx={textStyle}
              variant="outlined"
              type="text"
              label="Ім'я"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </motion.div>
          <motion.div custom={3} variants={animation}>
            <TextField
              sx={textStyle}
              type="text"
              label="Фамілія"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </motion.div>
          <motion.div custom={4} variants={animation}>
            <TextField
              sx={textStyle}
              type="email"
              label="Пошта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
          <motion.div custom={5} variants={animation}>
            <TextField
              sx={textStyle}
              type="password"
              label="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>
          <motion.div custom={6} variants={animation}>
            <FormControl sx={{ width: 238 }}>
              <InputLabel
                id="demo-multiple-checkbox-label"
                sx={{ color: "rgba(255, 255, 255, 0.6) !important" }}
              >
                Книги
              </InputLabel>
              <Select
                sx={{
                  width: 238,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.6)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.6)",
                  },
                  "& .MuiInputLabel-formControl": {
                    color: "rgba(255, 255, 255, 0.6)",
                  },
                  color: "rgba(255, 255, 255, 0.6)",
                }}
                inputProps={{
                  floatingLabelFocusStyle: {
                    color: "rgba(255, 255, 255, 0.6)",
                  },
                }}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={userBooks}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    inputProps={{
                      floatingLabelFocusStyle: {
                        color: "rgba(255, 255, 255, 0.6)",
                      },
                    }}
                    label="Книги"
                  />
                }
                renderValue={(selected) =>
                  selected
                    .map(
                      (bookId) =>
                        books.find((book) => book.id === bookId)?.title
                    )
                    .join(", ")
                }
              >
                {books.map((book) => (
                  <MenuItem key={book.id} value={book.id}>
                    <Checkbox
                      checked={Boolean(
                        userBooks.find((bookId) => bookId === book.id)
                      )}
                    />
                    <ListItemText primary={book.title} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </motion.div>
          <motion.div custom={7} variants={animation}>
            <ButtonAuth isOutlined onClick={() => createAccount()}>
              Створити аккаунт
            </ButtonAuth>
          </motion.div>
        </AuthBlock>
      </Container>
    </motion.div>
  );
};

export default SignIn;
