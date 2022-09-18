import { ActionIcon, Tooltip } from "@mantine/core";
import { FloatingPosition } from "@mantine/core/lib/Floating";
import { IconMinus, IconPlus } from "@tabler/icons";
import { useState } from "react";

interface AddRemoveButtonProps {
  bookId: number;
  tooltipPosition?: FloatingPosition;
}
export default function AddRemoveButton({
  bookId,
  tooltipPosition,
}: AddRemoveButtonProps) {
  const [isAdded, setIsAdded] = useState(() => {
    const books = localStorage.getItem("books");
    if (!books) return false;
    return JSON.parse(books).includes(bookId);
  });

  const add = (event: any) => {
    event.preventDefault();
    const books = localStorage.getItem("books");
    if (!books) {
      localStorage.setItem("books", JSON.stringify([bookId]));
    } else {
      const parsedBooks = JSON.parse(books);
      if (!parsedBooks.includes(bookId)) {
        parsedBooks.push(bookId);
        localStorage.setItem("books", JSON.stringify(parsedBooks));
      }
    }
    setIsAdded(true);
  };

  const remove = (event: any) => {
    event.preventDefault();
    const books = localStorage.getItem("books");
    if (!books) return;
    const parsedBooks = JSON.parse(books);
    const index = parsedBooks.indexOf(bookId);
    if (index > -1) {
      parsedBooks.splice(index, 1);
      localStorage.setItem("books", JSON.stringify(parsedBooks));
    }
    setIsAdded(false);
  };

  return isAdded ? (
    <Tooltip label="Remove from my books" position={tooltipPosition}>
      <ActionIcon onClick={remove} variant="default" size="lg">
        <IconMinus size={24} />
      </ActionIcon>
    </Tooltip>
  ) : (
    <Tooltip label="Add to my books" position={tooltipPosition}>
      <ActionIcon onClick={add} variant="default" size="lg">
        <IconPlus size={24} />
      </ActionIcon>
    </Tooltip>
  );
}
