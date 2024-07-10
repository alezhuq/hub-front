"use client";
import styled from "@emotion/styled";
import React from "react";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSnackbar } from "notistack";
import { API_URL } from "@/constants";
import { Avatar } from "@mui/material";
import { useAccountStore } from "@/store";

const Wrapper = styled.header`
  width: 100%;
  height: 64px;
  background-color: #0a0a0a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;
const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
`;
const HeaderNavigation = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 80px;
`;
const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  gap: 10px;
  height: fit-content;
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
  margin-left: auto;
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

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const account = useAccountStore((state) => state.account);
    
  const [lastName, setLastName] = React.useState("");

  const { enqueueSnackbar } = useSnackbar();

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
      setLastName(data.last_name);
    } catch (error) {
      enqueueSnackbar("Не вдалося отримати дані про акаунт", {
        variant: "error",
      });
      console.log(error);
    }
  };

  React.useEffect(() => {
    
    if (
      account.auth_token
    ) {
      getAccountData();
    }
  }, [account]);

  return (
    <Wrapper>
      <HeaderContainer>
        <HeaderNavigation>
          <HeaderLogo>
            <AutoStoriesIcon
              sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 45 }}
            />
            <h1>BookHub</h1>
          </HeaderLogo>
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
                Логін
              </ButtonAuth>
            )}
            {!account.auth_token && (
              <ButtonAuth
                isOutlined={false}
                onClick={() => router.push("/sign-in")}
              >
                Реєстрація
              </ButtonAuth>
            )}
            {account.auth_token && (
              <Avatar
                onClick={() => router.push("/account")}
                sx={{ cursor: "pointer" }}
              >
                {lastName[0]}
              </Avatar>
            )}
          </Buttons>
        </HeaderNavigation>
      </HeaderContainer>
    </Wrapper>
  );
};

export default Header;
