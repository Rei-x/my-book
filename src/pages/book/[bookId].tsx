import { Box, Button, Center, Container, Heading, HStack, Link, Spinner, Text, VStack, Wrap } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import api from '@/api';
import Layout from '@/components/Layout';
import { Resource, ResourceType } from '@/types/booksGet';
import MarkAsFavorite from '@/components/MarkAsFavorite';
import { motion } from 'framer-motion';

const clickLink = (uri: string) => {
  const a = document.createElement("a");
  a.target = "_blank";
  a.href = uri;
  a.click();
};

const BookPage: NextPage = () => {
  const router = useRouter();
  const { bookId } = router.query;
  const bookQuery = useQuery(["book", bookId], () => api.book.get(bookId as string || ""));

  const buttonText: Record<string, string> = {
    [ResourceType.ApplicationEpubZip]: "Epub",
    [ResourceType.ApplicationXMobipocketEbook]: "Mobi",
    [ResourceType.TextPlainCharsetUTF8]: "Txt",
  };

  const getButtonText = (resource: Resource) => {
    let text = "";
    if (resource.type in buttonText) {
      text += buttonText[resource.type];
    }
    if (resource.uri.endsWith(".noimages")) {
      text += " No Images";
    }
    return text;
  };

  const getHtmlLink = (resources: Resource[]) => {
    return resources.find((resource) => resource.uri.endsWith("htm"))?.uri;
  };

  return (
    <Layout>
      {bookQuery.isSuccess &&
        <Container
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} >
          <Heading p={2} mt={4} color="gray.500" size="lg" textAlign="center">{bookQuery.data.title}</Heading>
          <Center>
            <MarkAsFavorite bookId={bookId as string} />
          </Center>
          <Center mt={3}>
            {getHtmlLink(bookQuery.data.resources) && <Button colorScheme="green" onClick={() => clickLink(getHtmlLink(bookQuery.data.resources) || "")}>Read online</Button>}
          </Center>
          <Wrap justify="center" mt={4}>
            {bookQuery.data.resources.sort().map((resource) => {
              if (resource.type in buttonText) {
                return <Button key={resource.id} onClick={() => clickLink(resource.uri)}>{getButtonText(resource)}</Button>;
              }
            })}
          </Wrap>
        </Container>
      }
      {bookQuery.isLoading && <Center mt="7rem">
        <VStack>
          <Spinner size="lg" />
          <Text>Loading your book..</Text>
        </VStack>
      </Center>}

    </Layout>
  );
};

export default BookPage;