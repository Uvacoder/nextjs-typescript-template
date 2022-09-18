import {
  ActionIcon,
  Box,
  Group,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";

export default function TopBar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Box my="md">
      <Group position="apart">
        <Title size="h1">GOT Books</Title>
        <Group>
          <ActionIcon
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={130} /> : <IconMoonStars size={130} />}
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
}
