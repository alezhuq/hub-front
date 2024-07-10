"use client";

import React from "react";
import styled from "@emotion/styled";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAccountStore } from "@/store";
import { DateTime as luxon } from "luxon";

const Wrapper = styled.header`
  width: 100%;
  height: 180px;
  background-color: #0a0a0a;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  gap: 20px;
  height: fit-content;
`;
const Date = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
`;
const NavList = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;
const NavItem = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease-in-out;

  &.active {
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    opacity: 0.8;
  }

  &:hover {
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    opacity: 0.8;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ButtonAuth = styled.button<{ isOutlined: boolean }>`
  ${(p) => `
  padding: 5px 10px;
  background-color: ${
    p.isOutlined ? "transparent" : "rgba(255, 255, 255, 0.8)"
  };
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: ${p.isOutlined ? "rgba(255, 255, 255, 0.8)" : "#000"};
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  `}
`;

const Line = styled.hr`
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 50px;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 20px;
  text-align: center;
`;
const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const account = useAccountStore((state) => state.account);

  return (
    <Wrapper>
      <FooterContainer>
        <Content>
          <FooterLogo>
            <AutoStoriesIcon
              sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 45 }}
            />
            <Date>© {luxon.now().year}</Date>
          </FooterLogo>

          <NavList>
            <NavItem href={"/"} className={pathname === "/" ? "active" : ""}>
              Home
            </NavItem>
            <NavItem
              href={"/books"}
              className={pathname.includes("/books") ? "active" : ""}
            >
              Books
            </NavItem>
          </NavList>

          <Buttons>
            {!account.auth_token && (
              <ButtonAuth isOutlined onClick={() => router.push("/log-in")}>
                Log In
              </ButtonAuth>
            )}
            {!account.auth_token && (
              <ButtonAuth
                isOutlined={false}
                onClick={() => router.push("/sign-in")}
              >
                Sign Up
              </ButtonAuth>
            )}
          </Buttons>
        </Content>
        <Line />
        <Description>
          Copyright © {luxon.now().year} All Rights Reserved "BookHub"
        </Description>
      </FooterContainer>
    </Wrapper>
  );
};

export default Footer;
