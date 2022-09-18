import {
  Stack,
  Title,
  Text,
  useMantineColorScheme,
  Space,
  Grid,
  Card,
  Group,
  Anchor,
  Box,
} from "@mantine/core";
import {
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router-dom";
import AddRemoveButton from "../components/AddRemoveButton";
import CharacterEntry from "../components/CharacterEntry";
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
  const params = useParams();
  const { book, characters } = useLoaderData() as LoaderData;
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <Group position="apart">
        <Box>
          <Title order={2}>{book.name}</Title>
          <Text color={colorScheme === "dark" ? "gray.5" : "gray.7"}>
            by {book.authors.join(", ")}
          </Text>
        </Box>

        <AddRemoveButton bookId={book.id} />
      </Group>

      <Space h="xl" />

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

      <Space h="xl" />

      <Stack spacing="xs">
        <Group position="apart">
          <Title order={3}>Main characters</Title>
          <Anchor component={Link} to={`/book/${params.bookId}/all-characters`}>
            See all characters
          </Anchor>
        </Group>

        <Grid gutter="xs">
          {characters.map((character) => (
            <Grid.Col span={6} key={`character-${character.id}`}>
              <CharacterEntry character={character} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </>
  );
}
