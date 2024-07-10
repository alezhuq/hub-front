import Book from "@/views/Book";

type Params = {
  id: string;
}

export default async function({ params: {id}}: {params: Params}) {
  return <Book id={id}/>
}