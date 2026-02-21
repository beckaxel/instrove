import { Note } from "./Note";

export interface INoteNameFormat {
    noteToString(note: Note): string;
}