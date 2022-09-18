import {
  Card,
  Stack,
  Title,
  Text,
  useMantineColorScheme,
  TextInput,
} from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { getBooks } from "../services/book.service";
import { IconSearch } from "@tabler/icons";
import { useState } from "react";

type LoaderData = Awaited<ReturnType<typeof discoverLoader>>;

export async function discoverLoader() {
  const books = await getBooks();
  return { books };
}

export default function Discover() {
  const { books } = useLoaderData() as LoaderData;
  const { colorScheme } = useMantineColorScheme();
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter(
    (book) => !search || book.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Title order={2} mb="md">
        Discover
      </Title>

      <Stack>
        <TextInput
          placeholder="Search for a book"
          icon={<IconSearch size={14} />}
          onChange={(event) => setSearch(event.currentTarget.value)}
          value={search}
        />

        {filteredBooks.map((book) => (
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Stack spacing="xs">
              <Text weight="bold" size="xl">
                {book.name}
              </Text>
              <Text color={colorScheme === "dark" ? "gray.5" : "gray.7"}>
                by {book.authors.join(", ")}
              </Text>
            </Stack>
          </Card>
        ))}
      </Stack>
    </>
  );
}
