"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { API_URL } from "@/constants";
import { useAccountStore } from "@/store";
import { useSnackbar } from "notistack";

const AccountInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  max-width: 400px;
  margin: 0 auto;
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

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const account = useAccountStore((state) => state.account);

  const { enqueueSnackbar } = useSnackbar();

  console.log(account.auth_token);

  const getAccountData = async () => {
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
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
    } catch (error) {
      enqueueSnackbar("Не вдалося отримати дані про акаунт", {
        variant: "error",
      });
      console.log(error);
    }
  };

  const updateAccountData = async () => {
    try {
      const response = await fetch(`${API_URL}/account/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account.auth_token}`,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
        }),
      });
      if (!response.ok) {
        throw new Error("Не вдалося оновити дані про акаунт");
      }
      enqueueSnackbar("Дані про акаунт успішно оновлено", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Не вдалося оновити дані про акаунт", {
        variant: "error",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAccountData();
  }, []);

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.4, once: true }}
        style={{ width: "100%" }}
      >
        <AccountInner>
          <motion.div custom={1} variants={rightAnimation}>
            <Title>Аккаунт</Title>
          </motion.div>
          <motion.div
            custom={2}
            variants={rightAnimation}
            style={{ width: "100%" }}
          >
            <TextField
              sx={{
                outline: "none",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #171717",
                },
              }}
              type="text"
              label="Ім'я"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
            />
          </motion.div>
          <motion.div
            custom={3}
            variants={rightAnimation}
            style={{ width: "100%" }}
          >
            <TextField
              sx={{
                outline: "none",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #171717",
                },
              }}
              type="text"
              label="Фамілія"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />
          </motion.div>
          <motion.div
            custom={4}
            variants={rightAnimation}
            style={{ width: "100%" }}
          >
            <TextField
              sx={{
                outline: "none",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #171717",
                },
              }}
              type="email"
              label="Пошта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </motion.div>
          <motion.div
            custom={5}
            variants={rightAnimation}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              sx={{
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
              onClick={() => updateAccountData()}
            >
              Зберегти
            </Button>
          </motion.div>
        </AccountInner>
      </motion.div>
    </>
  );
};

export default Account;
