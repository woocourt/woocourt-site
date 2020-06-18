import { Character } from "./character.model";

export class Story {

  id: string;
  title: string;
  genre: any;
  characters?: Character[];
}
