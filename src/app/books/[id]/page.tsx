"use client";
import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {
  ListItemText,
  ListItemAvatar,
  Avatar,
  Rating,
  TextField,
  Button,
} from "@mui/material";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;
const BookWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
  margin-bottom: 60px;
`;
const TopWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  align-items: center;
  margin: 120px 0;
  position: relative;
  .book-image {
    object-fit: cover;
    width: 500px;
    height: 700px;
  }
`;
const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  align-items: center;
  h1 {
    font-size: 50px;
    font-weight: 600;
    line-height: 1.5;
    color: #0a0a0a;
    text-align: left;
  }
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
    text-align: left;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    text-align: left;
    line-height: 1.6;
  }
`;

const books = [
  {
    id: "1",
    title: "Спадок князя Володимира",
    author: "Ірина Лисенко",
    image: "/mock.avif",
    description:
      "У захопливій історичній повісті «Спадок князя Володимира» відома українська письменниця Ірина Лисенко розповідає про великого князя Володимира та його вплив на історію України. Книга відкриває перед читачем захоплюючу історію про життя князя, його подвиги та важливі рішення, що сформували майбутнє держави. Автор змальовує життя князя Володимира у всій його багатогранності – від молодих років до його правління, допомагаючи читачеві краще зрозуміти історичний контекст та важливі події, які вплинули на долю країни. Повість поглиблено досліджує характер героя, його мотивації та внутрішній світ, роблячи кожен аспект життя князя Володимира цікавим та захоплюючим для читача. Крім того, книга містить багато епічних сцен та битв, які реалістично зображені та захоплюють уяву читача. «Спадок князя Володимира» – це не лише захопливий роман про великого правителя, але й важлива частина української історії, яка заслуговує на увагу та вивчення.",
  },
  {
    id: "2",
    title: "Закоханий Лісовик",
    author: "Олександр Мельник",
    image: "/mock.avif",
    description:
      "«Закоханий Лісовик» – це захоплюючий фентезі роман, який розповідає про таємничого лісовика та його кохання до звичайної дівчини. У світі, де магія та реальність переплітаються, герої стикаються з неймовірними пригодами та випробуваннями, які відкривають нові реалії та сили. Автор, Олександр Мельник, вдало поєднує елементи фентезі та романтики, створюючи унікальний світ, який захоплює з перших рядків. У романі відчутна напруга та емоційна глибина, а кожен персонаж, незалежно від своєї природи, має свою унікальну суть та історію. Читачі підкоряться зачаровує зворушливим коханням та захоплюючими пригодами головних героїв, що розкриваються на кожній сторінці. «Закоханий Лісовик» – це не лише фантастична історія, а й глибокий роздум над сенсом кохання, вірності та відданості, яка залишить незабутній слід у серцях читачів.",
  },
  {
    id: "3",
    title: "Таємниця карпатського замку",
    author: "Марія Коваль",
    image: "/mock.avif",
    description:
      "«Таємниця карпатського замку» – це захоплюючий детективний роман, автором якого є відома українська письменниця Марія Коваль. Книга розповідає історію загадкового зникнення місцевого магната в карпатському замку та спроби розгадати цю таємницю. Відправляючись на пошуки правди, герої стикаються з непередбачуваними перешкодами та небезпекою, але не зупиняються навіть перед найважчими випробуваннями. У романі Марії Коваль вдало поєднані елементи детективу та трилера, створюючи напружену атмосферу та захоплюючий сюжет, що тримає читача в напрузі до останньої сторінки. Кожен герой має свої таємниці та секрети, а детективні нитки переплітаються так, що важко передбачити розв'язок загадки. «Таємниця карпатського замку» – це захоплююче читання для тих, хто любить детективи та таємниці, що розкриваються під впливом власного розуму.",
  },
  {
    id: "4",
    title: "Пошук загубленого пергаменту",
    author: "Василь Шевчук",
    image: "/mock.avif",
    description:
      "«Пошук загубленого пергаменту» – це захоплюючий пригодницький роман, автором якого є талановитий український письменник Василь Шевчук. Книга розповідає про захоплюючі пригоди героїв, які вирушають у пошуки загубленого пергаменту – давнього артефакту, який містить ключ до неймовірних таємниць. Під час своєї подорожі герої стикаються з неймовірними перешкодами та небезпеками, але не втрачають віру у свій успіх. У романі Василя Шевчука майстерно поєднані елементи пригод та містики, створюючи захоплюючу атмосферу та напружений сюжет, який тримає читача в напрузі до останньої сторінки. Кожен герой має свої мети та мотивацію, що робить їхню подорож цікавою та непередбачуваною. «Пошук загубленого пергаменту» – це книга, яка не лише розповідає про пригоди героїв, а й надихає читача на власні відкриття та досягнення.",
  },
  {
    id: "5",
    title: "Легенди древнього Києва",
    author: "Оксана Іванова",
    image: "/mock.avif",
    description:
      "«Легенди древнього Києва» – це унікальна книга, автором якої є відома українська письменниця Оксана Іванова. У цій книзі зібрані та переказані найцікавіші легенди та міфи про давні часи Києва – давню столицю Київської Русі. Автор розкриває перед читачем багату та цікаву історію міста, що заслужено вважається колискою української державності. Кожна легенда має свої власні герої та події, які змальовані так, що занурюють читача у світ давніх часів. Переказані історії вражають своєю магічною атмосферою та живописністю описів, що робить книгу незабутнім читанням для всіх, хто цікавиться історією України та її столиці. «Легенди древнього Києва» – це не лише книга про минуле, а й про те, які сили та події формували дух міста та його мешканців на протязі віків.",
  },
];

const comments = [
  {
    author: "John Doe",
    avatar: "/avatar1.jpg",
    text: "Great book!",
    score: 5,
  },
  {
    author: "John Doe",
    avatar: "/avatar1.jpg",
    text: "Great book!",
    score: 5,
  },
];

const Book = ({ params: { id } }: { params: { id: string } }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  const [newComment, setNewComment] = React.useState("");

  const [newRating, setNewRating] = React.useState(0);

  const currentBook = books.find((book) => book.id === id);

  const handleRatingChange = (newValue: number | null) => {
    if (newValue === null) {
      return;
    }
    setNewRating(newValue);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    console.log(newComment);
  };

  return (
    <Container>
      <TopWrapper>
        <Image
          src={currentBook?.image || ""}
          width={500}
          height={700}
          alt="book"
          className="book-image"
        />
        <TextBlock>
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
            <Tooltip title={isLiked ? "Видалити з обраних" : "Додати в обрані"}>
              <IconButton color="error" onClick={() => setIsLiked(!isLiked)}>
                <FavoriteIcon
                  fontSize="large"
                  sx={{ fill: isLiked ? "#DC143C" : "#d9d9d9" }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Поділитись">
              <IconButton color="inherit" onClick={() => {}}>
                <ReplyIcon fontSize="large" sx={{ fill: "gray" }} />
              </IconButton>
            </Tooltip>
          </Box>

          <h1>{currentBook?.title}</h1>
          <h2>{currentBook?.author}</h2>
          <p>{currentBook?.description}</p>
        </TextBlock>
      </TopWrapper>
      <BookWrapper>
        <object
          data="/mock.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
        ></object>
      </BookWrapper>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Відгуки
        </Typography>
        <Divider />
        <List sx={{ marginTop: 2 }}>
          {comments.map((comment, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={comment.author} src={comment.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.author}
                  secondary={
                    <React.Fragment>
                      <Typography
                        variant="body2"
                        component="span"
                        color="text.primary"
                      >
                        {comment.text}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Rating name="read-only" value={comment.score} readOnly />
              {index !== comments.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
          <Box sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}>
            <TextField
              label="Add a comment"
              multiline
              rows={3}
              variant="outlined"
              value={newComment}
              onChange={handleCommentChange}
              fullWidth
            />
            <Rating
              name="new-rating"
              value={newRating}
              onChange={(event, newValue) => handleRatingChange(newValue)}
              sx={{ marginTop: 1, width: "fit-content" }}
              precision={0.5}
            />
            <Button
              variant="contained"
              onClick={handleAddComment}
              sx={{
                marginTop: 3,
                backgroundColor: "#0a0a0a",
                "&:hover": {
                  backgroundColor: "#171717",
                },
                width: "170px",
              }}
            >
              Add Comment
            </Button>
          </Box>
        </List>
      </Paper>
    </Container>
  );
};

export default Book;
