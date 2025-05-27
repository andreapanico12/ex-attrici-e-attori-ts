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
    typeof obj.awards === "string" &&
    [
      "American", "British", "Australian", "Israeli-American", "South African", 
      "French", "Indian", "Israeli", "Spanish", "South Korean", "Chinese"
    ].includes(obj.nationality)
  );
}


async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    
    if (!response.ok) return null;

    const data = await response.json();

    if (isActress(data)) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Errore nel recupero dell'attrice:", error);
    return null;
  }
}

getActress(1).then(actress => {
  if (actress) {
    console.log("Attrice trovata:", actress.name);
  } else {
    console.log("Attrice non trovata o dato non valido.");
  }
});



async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch(`http://localhost:3333/actresses`);

    if (!response.ok) {
      console.error("Errore nella risposta del server");
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.warn("Il dato ricevuto non è un array");
      return [];
    }

    // Filtra solo gli elementi che passano il controllo del type guard
    const validActresses = data.filter(isActress);

    return validActresses;
  } catch (error) {
    console.error("Errore nel recupero delle attrici:", error);
    return [];
  }
}

getAllActresses().then(actresses => {
  if (actresses.length > 0) {
    console.log(`Trovate ${actresses.length} attrici.`);
  } else {
    console.log("Nessuna attrice trovata o dati non validi.");
  }
});



async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
  const promises = ids.map(id => getActress(id));
  const results = await Promise.all(promises);
  return results; // array di Actress oppure null
}

getActresses([1, 2, 3, 999]).then(results => {
  results.forEach((actress, index) => {
    if (actress) {
      console.log(`Attrice trovata: ${actress.name}`);
    } else {
      console.log(`Attrice con ID ${index + 1} non trovata.`);
    }
  });
});