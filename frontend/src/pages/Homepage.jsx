import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";
import { Flex, Box } from "@chakra-ui/react";


export default function Homepage() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <Flex direction="row" wrap="wrap" justifyContent="center">
      {books?.books?.map((book) => (
          <Books key={`${book.id} ${book.title}`} {...book} />
      ))}
    </Flex>
  );
}
