import { API_URL } from "../config";

export type Book = {
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
  return fetch(`${API_URL}/books`).then((res) => res.json());
}

export async function getBookById(id: number): Promise<Book> {
  return fetch(`${API_URL}/books/${id}`).then((response) => response.json());
}
