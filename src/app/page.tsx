'use client'
import Image from 'next/image'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const MainWrapper = styled.header`
  width: 100%;
  background-image: linear-gradient(to bottom, rgba(10, 10, 10, 0.5), rgba(10, 10, 10, 1)),
    url('./mainImage.jpg');
  background-repeat: no-repeat;
  background-size: cover;
`
const MainBlock = styled.div`
  height: calc(100vh - 64px);
`
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`
const Title = styled.h1<{ isDarkText: boolean }>`
  font-size: 50px;
  font-weight: 600;
  color: ${(p) => (p.isDarkText ? '#0a0a0a' : 'rgba(255, 255, 255, 0.9)')};
  text-align: center;
  padding-top: 200px;
  max-width: 90%;
  margin: 0 auto;
`

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  max-width: 70%;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 300px;
`
const AboutTextBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  align-items: center;
  .image {
    object-fit: cover;
    border-radius: 15px;
  }
`
const AboutTitle = styled.h1`
  font-size: 50px;
  font-weight: 600;
  line-height: 1.5;
  color: #0a0a0a;
  text-align: left;
  padding-top: 200px;
`
const AboutSubTitle = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  color: #0a0a0a;
  text-align: left;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 300px;
`

const Highlights = styled.div`
  width: 100%;
  background-color: #0a0a0a;
`
const HighlightsInner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  align-items: center;
  padding: 110px 0;
`
const Highlight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`
const HighlightTitle = styled.h1`
  font-size: 50px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`
const HighlightSubTitle = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
`
const mainAnimation = {
  hidden: { y: -200, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.3, duration: 0.4 },
  }),
}

const leftAnimation = {
  hidden: { x: -100, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.3 },
  }),
}
const rightAnimation = {
  hidden: { x: 100, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.3 },
  }),
}
const topAnimation = {
  hidden: { y: 100, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.3 },
  }),
}
const bottomAnimation = {
  hidden: { y: -100, opacity: 0, transition: { duration: 0.5 } },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.3 },
  }),
}
export default function Home() {
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.4, once: true }}
      >
        <MainWrapper>
          <MainBlock>
            <Container>
              <motion.div custom={1} variants={mainAnimation}>
                <Title isDarkText={false}>
                  BookHub – Українська онлайн платформа для молодих авторів
                </Title>
              </motion.div>
              <motion.div custom={2} variants={mainAnimation}>
                <SubTitle>
                  Ласкаво запрошуємо вас на BookHub – інноваційну українську онлайн
                  платформу, створену спеціально для талановитих молодих авторів. Тут
                  кожен може відкрити для себе світ слова, де креативність зустрічається з
                  можливостями.
                </SubTitle>
              </motion.div>
            </Container>
          </MainBlock>
        </MainWrapper>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }}
      >
        <Container>
          <AboutTextBlock>
            <div>
              <motion.div custom={1} variants={leftAnimation}>
                <AboutTitle>Що таке BookHub?</AboutTitle>
              </motion.div>
              <motion.div custom={2} variants={leftAnimation}>
                <AboutSubTitle>
                  BookHub - це цифрова бібліотека, яка пропонує широкий вибір книг з
                  різних жанрів. Це одне місце для всіх любителів книг, де вони можуть
                  читати, ділитися книгами з іншими подібно налаштованими особами. BookHub
                  - це спільнота книголюбів, яка має на меті об'єднати читачів з усього
                  світу.
                </AboutSubTitle>
              </motion.div>
            </div>
            <motion.div custom={3} variants={rightAnimation}>
              <Image
                src="/about.jpg"
                width={600}
                height={600}
                alt="aboutImage"
                className="image"
              />
            </motion.div>
          </AboutTextBlock>
        </Container>
      </motion.div>
      <Highlights>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4, once: true }}
        >
          <Container>
            <HighlightsInner>
              <motion.div custom={1} variants={topAnimation}>
                <Highlight>
                  <HighlightTitle>20 мільйонів+</HighlightTitle>
                  <HighlightSubTitle>
                    активних читачів та авторів на BookHub. Приєднайся до них!
                  </HighlightSubTitle>
                </Highlight>
              </motion.div>
              <motion.div custom={2} variants={bottomAnimation}>
                <Highlight>
                  <HighlightTitle>1.5k робітників</HighlightTitle>
                  <HighlightSubTitle>
                    працють щоб забезпечити вам найкращий досвід читання.
                  </HighlightSubTitle>
                </Highlight>
              </motion.div>
              <motion.div custom={3} variants={topAnimation}>
                <Highlight>
                  <HighlightTitle>5+ років</HighlightTitle>
                  <HighlightSubTitle>
                    досвіду роботи. Ми знаємось на своїй справі!
                  </HighlightSubTitle>
                </Highlight>
              </motion.div>
            </HighlightsInner>
          </Container>
        </motion.div>
      </Highlights>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }}
      >
        <Container>
          <AboutTextBlock>
            <motion.div custom={3} variants={leftAnimation}>
              <Image
                src="/about2.avif"
                width={600}
                height={600}
                alt="aboutImage"
                className="image"
              />
            </motion.div>
            <div>
              <motion.div custom={1} variants={rightAnimation}>
                <AboutTitle>Приєднуйся до великої сім'ї BookHub</AboutTitle>
              </motion.div>
              <motion.div custom={2} variants={rightAnimation}>
                <AboutSubTitle>
                  Ми запрошуємо вас стати частиною сім'ї BookHub - спільноти, де історії
                  оживають, а любов до літератури не має меж. Повторно відкрийте радість
                  читання, з'єднуйтеся з подібними особами і нехай сторінки BookHub
                  збагатять вашу літературну пригоду. Розпочніть свій шлях з BookHub
                  сьогодні - де розгортаються історії, встановлюються зв'язки і
                  святкується магія літератури!
                </AboutSubTitle>
              </motion.div>
            </div>
          </AboutTextBlock>
        </Container>
      </motion.div>
    </>
  )
}
