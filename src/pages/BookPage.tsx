import {
  Stack,
  Title,
  Text,
  useMantineColorScheme,
  Space,
  Grid,
  Card,
} from "@mantine/core";
import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import Infos from "../components/Infos";
import { getBookById } from "../services/book.service";
import { getCharacterById } from "../services/character.service";
import dayjs from "../utils/dayjs";
import { getIdFromUrl, isNumeric } from "../utils/helpers";

type LoaderData = {
  book: Awaited<ReturnType<typeof getBookById>>;
  characters: Awaited<ReturnType<typeof getCharacterById>>[];
};

export async function bookPageLoader({ params }: LoaderFunctionArgs) {
  const { bookId } = params;
  if (!bookId || !isNumeric(bookId)) return redirect("/");

  const book = await getBookById(Number(bookId));

  const characters = await Promise.all(
    book.povCharacters.map((character) =>
      getCharacterById(getIdFromUrl(character))
    )
  );

  const data: LoaderData = { book, characters };
  return data;
}

export default function BookPage() {
  const { book, characters } = useLoaderData() as LoaderData;
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <Title order={2}>{book.name}</Title>
      <Text color={colorScheme === "dark" ? "gray.5" : "gray.7"}>
        by {book.authors.join(", ")}
      </Text>

      <Space h="md" />

      <Infos
        infos={[
          {
            label: "Released",
            info: dayjs(book.released).format("MMMM D, YYYY"),
          },
          { label: "Publisher", info: book.publisher },
          { label: "ISBN", info: book.isbn },
          { label: "Pages", info: `${book.numberOfPages}` },
          { label: "Country", info: book.country },
          { label: "Media type", info: book.mediaType },
        ]}
      />

      <Space h="md" />

      <Stack spacing="xs">
        <Title order={3}>Main characters</Title>

        <Grid gutter="xs">
          {characters.map((character) => (
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
