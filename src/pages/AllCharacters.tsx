import {
  Card,
  Grid,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useState } from "react";
import {
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { getBookById } from "../services/book.service";
import { getCharacterById } from "../services/character.service";
import { getIdFromUrl, isNumeric } from "../utils/helpers";

type LoaderData = {
  book: Awaited<ReturnType<typeof getBookById>>;
  characters: Awaited<ReturnType<typeof getCharacterById>>[];
};

export async function allCharactersLoader({ params }: LoaderFunctionArgs) {
  const { bookId } = params;
  if (!bookId || !isNumeric(bookId)) return redirect("/");

  const book = await getBookById(Number(bookId));

  const characters = await Promise.all(
    book.characters.map((character) =>
      getCharacterById(getIdFromUrl(character))
    )
  );

  const data: LoaderData = { book, characters };
  return data;
}

export default function AllCharacters() {
  const { book, characters } = useLoaderData() as LoaderData;
  const [search, setSearch] = useState("");

  const filteredCharacters = characters.filter(
    (character) =>
      !search || character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Title order={3} size="h5">
        <Link
          to={`/book/${book.id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {book.name}
        </Link>
      </Title>
      <Title order={2}>All characters</Title>

      <Space h="xl" />

      <Stack>
        <TextInput
          placeholder="Search for a character"
          icon={<IconSearch size={14} />}
          onChange={(event) => setSearch(event.currentTarget.value)}
          value={search}
        />

        <Grid gutter="xs">
          {filteredCharacters.map((character) => (
            <Grid.Col span={6}>
              <Card p="xs" radius="md" withBorder component="span">
                <Text weight="bold" size="xl">
                  {character.name}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </>
  );
}
