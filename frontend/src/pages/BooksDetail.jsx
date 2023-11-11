import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Flex justifyContent="flex-start" w={"100%"}>
        <Link to="/">
          <Button mt={3} ml={10} colorScheme="red">Back</Button>
        </Link>
      </Flex>
      <Box bg={"#427D9D"} w={"50%"} borderRadius={10}>
        {isLoading ? (
          <Skeleton height="300px" my="6" />
        ) : (
          <Flex my="6">
            <Box w="300px">
              <Image
                src={`http://localhost:8000/${book.image}`}
                alt={book.title}
                ml={5}
              />
            </Box>
            <Box ml="10">
              <Heading as="h1" size="lg" color="white" fontSize={"10xl"}>
                {book.title}
              </Heading>
              <Text fontSize="2xl" fontWeight="semibold" color="white">
                {book.author}
              </Text>
              <Text fontSize="2xl" fontWeight="semibold" color="white">
                {book.publisher}
              </Text>
              <Text fontSize="2xl" fontWeight="semibold" color="white" mb="4">
                {book.year} | {book.pages} pages
              </Text>
            </Box>
          </Flex>
        )}
        {localStorage.getItem("token") && (
          <HStack>
            <Popover>
              <PopoverTrigger>
                <Button colorScheme="red" ml={6} mb={4}>Delete</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>
                  Are you sure you want to delete this book?
                </PopoverBody>
                <Button onClick={handleDeleteBook} colorScheme="red">
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
            <Link to={`/editbook/${id}`}>
              <Button mb={4} ml={2}>Edit</Button>
            </Link>
          </HStack>
        )}
      </Box>
    </>
  );
}
