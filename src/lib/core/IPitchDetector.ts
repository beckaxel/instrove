export interface IPitchDetector {
    name: string;
    detectPitch(buffer: Float32Array, sampleRate: number): number;
}

