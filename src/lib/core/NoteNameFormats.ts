import type { INoteNameFormat } from "./INoteNameFormat";
import { Note } from "./Note";

export class DefaultNoteFormat implements INoteNameFormat {
    
    private semitoneNameMap = [
        'C',
        'C#/Db',
        'D',
        'D#/Eb',
        'E',
        'F',
        'F#/Gb',
        'G',
        'G#/Ab',
        'A',
        'A#/Bb',
        'B'
    ];
    
    noteToString(note: Note): string {
       return `${this.semitoneNameMap[note.semitone]}${note.octave}`;
    }
}