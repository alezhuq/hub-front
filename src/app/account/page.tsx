"use client";
import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
            <Title>Account</Title>
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
              label="Name"
              value={"Pavel"}
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
              label="Surname"
              value={"Shylo"}
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
              label="Email"
              value={"pasha20030407@gmail.com"}
              fullWidth
            />
          </motion.div>
          <motion.div
            custom={5}
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
              type="password"
              label="Password"
              value={"password"}
              fullWidth
            />
          </motion.div>
          <motion.div
            custom={6}
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
            >
              Save
            </Button>
          </motion.div>
        </AccountInner>
      </motion.div>
    </>
  );
};

export default Account;
