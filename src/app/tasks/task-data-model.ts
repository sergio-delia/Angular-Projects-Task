export interface Task {
  //id: string,
  name: string;
  date: string;
  ticket: string;
  employer: Dipendenti;
  comment: string;
  hours: number;
}

export enum Dipendenti {
  'sergio' = 'Sergio D\'Elia',
  'stefano' = 'Stefano Polidoro',
  'daniele' = 'Daniele Rutigliano',
  'valentina' = 'Valentina Gadaleta',
  'paola' = 'Paola Galtieri'
}
