import {
  Card,
  Stack,
  Title,
  Text,
  useMantineColorScheme,
  TextInput,
  Group,
  Box,
} from "@mantine/core";
import { Link, useFetcher, useLoaderData } from "react-router-dom";
import { getBooks } from "../services/book.service";
import { IconSearch } from "@tabler/icons";
import { useState } from "react";
import AddRemoveButton from "../components/AddRemoveButton";

type LoaderData = {
  books: Awaited<ReturnType<typeof getBooks>>;
};

export async function myBooksLoader() {
  const books = await getBooks();
  const myBookIdsEntry = localStorage.getItem("books");
  const myBookIds = myBookIdsEntry ? JSON.parse(myBookIdsEntry) : [];
  const data: LoaderData = {
    books: books.filter((book) => myBookIds.includes(book.id)),
  };
  return data;
}

export default function MyBooks() {
  const { books } = useLoaderData() as LoaderData;
  const reload = useFetcher();
  const { colorScheme } = useMantineColorScheme();
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter(
    (book) => !search || book.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Title order={2} mb="md">
        My books
      </Title>

      <Stack>
        <TextInput
          placeholder="Search for a book"
          icon={<IconSearch size={14} />}
          onChange={(event) => setSearch(event.currentTarget.value)}
          value={search}
        />

        {filteredBooks.map((book) => (
          <Card
            key={`book-${book.id}`}
            component={Link}
            to={`/book/${book.id}`}
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
          >
            <Group position="apart">
              <Box>
                <Text weight="bold" size="xl">
                  {book.name}
                </Text>
                <Text color={colorScheme === "dark" ? "gray.5" : "gray.7"}>
                  by {book.authors.join(", ")}
                </Text>
              </Box>

              <AddRemoveButton
                bookId={book.id}
                tooltipPosition="left"
                onAddRemove={() => reload.submit({}, { method: "post" })}
              />
            </Group>
          </Card>
        ))}
      </Stack>
    </>
  );
}
