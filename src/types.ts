export type Person = {
  readonly id: number;              // numero identificativo, non modificabile
  readonly name: string;           // nome completo, stringa non modificabile
  birth_year: number;              // anno di nascita
  death_year?: number;             // anno di morte (opzionale)
  biography: string;               // breve biografia
  image: string;                   // URL dell'immagine
};

type Nationality =
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese";



export type Actress = Person & {
  most_famous_movies: [string, string, string]; // tupla di 3 stringhe
  awards: string;
  nationality: Nationality;
};


function isActress(obj: any): obj is Actress {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.birth_year === "number" &&
    (typeof obj.death_year === "undefined" || typeof obj.death_year === "number") &&
    typeof obj.biography === "string" &&
    typeof obj.image === "string" &&
    Array.isArray(obj.most_famous_movies) &&
    obj.most_famous_movies.length === 3 &&
    obj.most_famous_movies.every(movie => typeof movie === "string") &&
    typeof obj.awards === "string" &&
    [
      "American", "British", "Australian", "Israeli-American", "South African", 
      "French", "Indian", "Israeli", "Spanish", "South Korean", "Chinese"
    ].includes(obj.nationality)
  );
}