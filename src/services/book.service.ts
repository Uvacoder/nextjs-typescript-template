import { API_URL } from "../utils/config";
import { getIdFromUrl } from "../utils/helpers";

export type Book = {
  id: number;
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: string[];
  povCharacters: string[];
};

export async function getBooks(): Promise<Book[]> {
  return fetch(`${API_URL}/books`)
    .then((res) => res.json())
    .then((books) =>
      books.map((book: Book) => ({ ...book, id: getIdFromUrl(book.url) }))
    );
}

export async function getBookById(id: number): Promise<Book> {
  return fetch(`${API_URL}/books/${id}`)
    .then((response) => response.json())
    .then((book) => ({ ...book, id }));
}
