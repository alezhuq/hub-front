"use client";
import React, { use, useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { API_URL } from "@/constants";
import { useAccountStore } from "@/store";
import { useRouter } from "next/navigation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 64px);
  background-color: #0a0a0a;
`;

const Input = styled.input`
  margin-bottom: 20px;
  font-size: 18px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: none;
  background-color: #171717;
  color: rgba(255, 255, 255, 0.9);
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

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const account = useAccountStore((state) => state.account);
  const setAccount = useAccountStore((state) => state.setAccount);

  if (account.auth_token) {
    router.push("/");
    return null;
  }

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Не вдалося увійти в систему");
      }

      const data = await response.json();

      const resfreshResponse = await fetch(`${API_URL}/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: data.refresh_token,
        }),
      });

      if (!resfreshResponse.ok) {
        throw new Error("Не вдалося оновити токен");
      }

      const refreshTokenData = await resfreshResponse.json();

      console.log("access2", refreshTokenData.access);

      setAccount({
        auth_token: refreshTokenData.access,
        refresh_token: refreshTokenData.refresh,
      });

      enqueueSnackbar("Успішний вхід", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Не вдалося увійти в систему", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <motion.div initial="hidden" whileInView="visible">
      <Container>
        <AuthBlock>
          <motion.div custom={1} variants={animation}>
            <Title>Логін</Title>
          </motion.div>
          <motion.div custom={2} variants={animation}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
          <motion.div custom={3} variants={animation}>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>
          <motion.div custom={4} variants={animation}>
            <ButtonAuth isOutlined onClick={() => handleLogin()}>
              Log in
            </ButtonAuth>
          </motion.div>
        </AuthBlock>
      </Container>
    </motion.div>
  );
};

export default LogIn;
