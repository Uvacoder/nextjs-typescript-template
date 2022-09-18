import { API_URL } from "../utils/config";

export type House = {
  url: string;
  name: string;
  region: string;
  coatOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  currentLord: string;
  heir: string;
  overlord: string;
  founded: string;
  founder: string;
  diedOut: string;
  ancestralWeapons: string[];
  cadetBranches: string[];
  swornMembers: string[];
};

export async function getHouseById(id: number): Promise<House> {
  return fetch(`${API_URL}/houses/${id}`).then((response) => response.json());
}
