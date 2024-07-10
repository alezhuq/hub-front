"use client";
import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import { API_URL } from "@/constants";
import { useSnackbar } from "notistack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ClearIcon from "@mui/icons-material/Clear";
import UploadPhoto from "@/components/UploadPhoto";
import { useAccountStore } from "@/store";

const AccountInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 500px;
`;

const Title = styled.h1`
  margin-top: 30px;
  font-size: 38px;
  color: #0a0a0a;
`;

const rightAnimation = {
  hidden: { x: 100, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.3 },
  }),
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type Genre = { id: number; name: string };

const AddBook = () => {
  const [genres, setGenres] = React.useState<Array<Genre>>([]);

  const [genre, setGenre] = React.useState<number | undefined>(undefined);
  const [bookName, setBookName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [size, setSize] = React.useState<number>(0);
  const [image, setImage] = React.useState<File | null>(null);

  const [file, setFile] = React.useState<File | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const account = useAccountStore((state) => state.account);

  const getGenres = async () => {
    try {
      const response = await fetch(`${API_URL}/genres/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Не вдалося отримати жанри");
      }

      const data = await response.json();

      setGenres(data);
    } catch (error) {
      enqueueSnackbar("Не вдалося отримати жанри", {
        variant: "error",
      });
      console.error(error);
    }
  };

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const createBook = async () => {
    if (
      !genre ||
      !bookName ||
      !description ||
      !file ||
      !image ||
      isNaN(Number(size))
    ) {
      enqueueSnackbar("Заповніть всі поля", {
        variant: "error",
      });
      return;
    }
    if (file?.name.split(".").pop() !== "pdf") {
      enqueueSnackbar("Файл має бути у форматі PDF", {
        variant: "error",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("pdfFile", file);
      formData.append("picture", image);
      formData.append("title", bookName);
      formData.append("description", description);
      formData.append("genre", genre.toString());
      formData.append("size", size.toString());

      const response = await fetch(`${API_URL}/books/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${account.auth_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Не вдалося додати книгу");
      }

      setGenre(undefined);
      setBookName("");
      setDescription("");
      setSize(0);
      setFile(null);
      setImage(null);

      enqueueSnackbar("Книгу успішно додано", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Не вдалося додати книгу", {
        variant: "error",
      });
      console.error(error);
    }
  };

  const handleSelectGenre = (event: SelectChangeEvent<number>) => {
    setGenre(event.target.value as number);
  };

  React.useEffect(() => {
    getGenres();
  }, []);

  console.log(file);

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.4, once: true }}
      >
        <AccountInner>
          <Title>Додати книгу</Title>

          <TextField
            sx={{
              outline: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #171717",
              },
            }}
            type="text"
            label="Назва книги"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Жанр
            </InputLabel>
            <Select
              sx={{
                outline: "none",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #171717",
                },
              }}
              fullWidth
              label="Жанр"
              value={genre}
              onChange={handleSelectGenre}
            >
              {genres &&
                genres.map((genre: Genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            sx={{
              outline: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #171717",
              },
            }}
            type="number"
            label="Кількість сторінок"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            fullWidth
          />
          <TextField
            sx={{
              outline: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #171717",
              },
            }}
            type="text"
            label="Опис книги"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <Button
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: "500",
            }}
            component="label"
            variant="contained"
            color="inherit"
            startIcon={file ? <ClearIcon /> : <CloudUploadIcon />}
            size="large"
          >
            Завантажити книжку у форматі PDF
            <VisuallyHiddenInput
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </Button>
          <div style={{ width: "100%", display: "flex" }}>
            <UploadPhoto
              text="Завантажити обкладинку"
              name="image"
              onFileSet={(name, file) => setImage(file)}
              onFileDelete={(name) => setImage(null)}
              height={200}
              width={500}
            />
          </div>
          <Button
            sx={{
              marginBottom: "30px",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: "500",
              backgroundColor: "#171717",
              color: "rgba(255, 255, 255, 0.9)",
              "&:hover": {
                backgroundColor: "#171717",
                color: "rgba(255, 255, 255, 0.9)",
              },
            }}
            variant="contained"
            size="large"
            onClick={() => createBook()}
          >
            Додати книгу
          </Button>
        </AccountInner>
      </motion.div>
    </>
  );
};

export default AddBook;
