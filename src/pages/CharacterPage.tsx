import { Title, Text, Space, useMantineColorScheme } from "@mantine/core";
import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import Infos from "../components/Infos";
import { getCharacterById } from "../services/character.service";
import { getHouseById } from "../services/house.service";
import { getIdFromUrl, isNumeric } from "../utils/helpers";

type LoaderData = {
  character: Awaited<ReturnType<typeof getCharacterById>>;
  houses: Awaited<ReturnType<typeof getHouseById>>[];
};

export async function characterPageLoader({ params }: LoaderFunctionArgs) {
  const { characterId } = params;
  if (!characterId || !isNumeric(characterId)) return redirect("/");

  const character = await getCharacterById(Number(characterId));
  const houses = await Promise.all(
    character.allegiances.map((house) => getHouseById(getIdFromUrl(house)))
  );

  const data: LoaderData = { character, houses };
  return data;
}

export default function CharacterPage() {
  const { houses, character } = useLoaderData() as LoaderData;
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <Title order={2}>{character.name}</Title>
      <Text color={colorScheme === "dark" ? "gray.5" : "gray.7"}>
        of {houses.map((house) => house.name).join(", ")}
      </Text>

      <Space h="xl" />

      <Infos
        infos={[
          { label: "Gender", info: character.gender },
          { label: "Culture", info: character.culture },
          { label: "Born", info: character.born },
          { label: "Died", info: character.died },
          { label: "Played by", info: character.playedBy.join(", ") },
        ]}
      />
    </>
  );
}
