'use client'
import { FC } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eee;
`
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`
const AccountMain = styled.div`
  display: grid;
  padding-top: 56px;
  grid-gap: 32px;
  min-height: calc(100vh - 156px);
  grid-template-columns: auto 1fr;
`
const AccountContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  margin-bottom: 77px;
  padding: 0px 20px;
`
const AccountNav = styled.div`
  .account__nav_item {
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding-left: 20px;
    padding-right: 20px;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    color: #0a0a0a;
    font-weight: 600;
    background-color: #fff;
    border-left: 3px solid #fff;
    &.active {
      background-color: rgba(255, 255, 255, 0.5);
      border-left: 3px solid #0a0a0a;
    }
  }
`
const AccountLogout = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-left: 20px;
  padding-right: 20px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  color: #0a0a0a;
  font-weight: 600;
  background-color: #fff;
  svg {
    width: 35px;
    height: 35px;
    fill: $primary-blue;
    margin-right: 30px;
  }
`

const LocaleLayout: FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <Wrapper>
      <Container>
        <AccountMain>
          <div>
            <AccountNav>
              <div className="account__nav_top">
                <div
                  onClick={() => router.push('/account')}
                  className={
                    pathname === '/account'
                      ? 'account__nav_item active'
                      : 'account__nav_item'
                  }
                >
                  <PersonIcon /> Account overview
                </div>
                <div
                  onClick={() => router.push('/account/liked')}
                  className={
                    pathname.includes('/account/liked')
                      ? 'account__nav_item active'
                      : 'account__nav_item'
                  }
                >
                  <FavoriteIcon /> Liked books
                </div>
                <div
                  onClick={() => router.push('/account/my-books')}
                  className={
                    pathname.includes('/account/my-books')
                      ? 'account__nav_item active'
                      : 'account__nav_item'
                  }
                >
                  <MenuBookIcon /> My Books
                </div>
                <div
                  onClick={() => router.push('/account/add-book')}
                  className={
                    pathname.includes('/account/add-book')
                      ? 'account__nav_item active'
                      : 'account__nav_item'
                  }
                >
                  <AddIcon /> Add Book
                </div>
              </div>
              <AccountLogout onClick={() => router.push('/sign-in')}>
                <LogoutIcon /> Logout
              </AccountLogout>
            </AccountNav>
          </div>
          <AccountContent>{children}</AccountContent>
        </AccountMain>
      </Container>
    </Wrapper>
  )
}
export default LocaleLayout
