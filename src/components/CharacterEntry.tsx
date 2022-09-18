import { Card, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { Character } from "../services/character.service";

interface CharacterEntryProps {
  character: Character;
}
export default function CharacterEntry({ character }: CharacterEntryProps) {
  return (
    <Card
      p="xs"
      radius="md"
      withBorder
      component={Link}
      to={`/character/${character.id}`}
    >
      <Text weight="bold" size="xl">
        {character.name}
      </Text>
    </Card>
  );
}
