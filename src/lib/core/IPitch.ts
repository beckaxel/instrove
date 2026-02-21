import type { ITemperament } from "./ITemperament";
import { Note } from "./Note";

export interface IPitch {
    note: Note
    deviation: number
    frequency: number
    temperament: ITemperament
}