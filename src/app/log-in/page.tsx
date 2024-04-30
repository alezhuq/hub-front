'use client'
import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 64px);
  background-color: #0a0a0a;
`

const Input = styled.input`
  margin-bottom: 20px;
  font-size: 18px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: none;
  background-color: #171717;
  color: rgba(255, 255, 255, 0.9);
`

const ButtonAuth = styled.button<{ isOutlined: boolean }>`
  ${(p) => `
  padding: 10px 20px;
  background-color: ${p.isOutlined ? 'transparent' : 'rgba(255, 255, 255, 0.9)'};
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: ${p.isOutlined ? 'rgba(255, 255, 255, 0.9)' : '#0a0a0a'};
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  `}
`
const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 38px;
  color: rgba(255, 255, 255, 0.9);
`

const AuthBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: calc(100vh * 0.2);
`

const animation = {
  hidden: { y: -100, opacity: 0 },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
}

const LogIn = () => {
  return (
    <motion.div initial="hidden" whileInView="visible">
      <Container>
        <AuthBlock>
          <motion.div custom={1} variants={animation}>
            <Title>Log in to BookHub</Title>
          </motion.div>
          <motion.div custom={2} variants={animation}>
            <Input type="email" placeholder="Email" />
          </motion.div>
          <motion.div custom={3} variants={animation}>
            <Input type="password" placeholder="Password" />
          </motion.div>
          <motion.div custom={4} variants={animation}>
            <ButtonAuth isOutlined>Log in</ButtonAuth>
          </motion.div>
        </AuthBlock>
      </Container>
    </motion.div>
  )
}

export default LogIn
