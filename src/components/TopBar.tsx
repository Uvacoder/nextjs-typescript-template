import {
  ActionIcon,
  Box,
  Group,
  Title,
  useMantineColorScheme,
  Text,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import { Link } from "react-router-dom";

export default function TopBar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Box mb="xl">
      <Group position="apart">
        <Title order={1}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            GOT Books
          </Link>
        </Title>
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
