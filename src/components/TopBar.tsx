import {
  ActionIcon,
  Box,
  Group,
  Title,
  useMantineColorScheme,
  Text,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import { Link, useLocation } from "react-router-dom";

export default function TopBar() {
  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const isDiscover =
    location.pathname === "/" || location.pathname.startsWith("/book");

  const isMyBooks = location.pathname === "/my-books";

  return (
    <Box mb="xl">
      <Group position="apart">
        <Title order={1}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            GOT Books
          </Link>
        </Title>

        <Group>
          <Text
            component={Link}
            to="/"
            weight={isDiscover ? "bold" : undefined}
            size="lg"
          >
            Discover
          </Text>
          <Text
            component={Link}
            to="/my-books"
            weight={isMyBooks ? "bold" : undefined}
            size="lg"
          >
            My books
          </Text>
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
