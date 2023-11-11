import { Card, Heading, Image, Text, VStack, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`}>
      <Card key={id} my={2} p={4} m={5} cursor="pointer">
        <VStack>
          <Image w={200} h={150} src={`http://localhost:8000/${image}`} />
          <Heading size={"md"}>
            {title} ({year})
          </Heading>
          <Text>
            <span>Publisher : </span>
            {publisher}
          </Text>
          <Text><span>Author : </span>
          {author}</Text>
        </VStack>
      </Card>
    </Link>
  );
}

export default Books;
