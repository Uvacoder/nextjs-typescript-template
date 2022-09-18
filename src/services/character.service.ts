import { API_URL } from "../utils/config";

export type Character = {
  id: number;
  url: string;
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
};

export async function getCharacterById(id: number): Promise<Character> {
  return fetch(`${API_URL}/characters/${id}`)
    .then((response) => response.json())
    .then((character) => ({ ...character, id }));
}
