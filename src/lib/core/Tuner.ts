import type { IPitch } from "./IPitch";
import type { IPitchDetector } from "./IPitchDetector";
import { ACF2PlusPitchDetector } from "./PitchDetectors";
import { Tuning } from "./Tuning";

export class Tuner {

    private _pitch: IPitch | null;
    private _rms: number;

    constructor(
        public readonly sampleRate: number,
        public readonly rmsThreshold: number = 0.01,
        public readonly pitchDetector: IPitchDetector = ACF2PlusPitchDetector,
        public readonly tuning: Tuning = new Tuning()
    ) { 
        this._pitch = null;
        this._rms = 0;
    }

    public get pitch(): IPitch | null {
        return this._pitch;
    }

    public get rms(): number {
        return this._rms;
    }

    public next(buffer: Float32Array): boolean {
        this._rms = this.detectRms(buffer);
        if (this.rms < this.rmsThreshold) {
            this._pitch = null;
            return false;
        }
            
        const frequency = this.detectFrequency(buffer);
        this._pitch = this.tuning.getPitch(frequency);
        return true;
    }

    private detectRms(buffer: Float32Array): number {
    
        const size = buffer.length;
        
        let rms = 0;
        for (let i = 0; i < size; i++)
            rms += Math.pow(buffer[i], 2);
        rms = Math.sqrt(rms / size);

        return rms;
    }

    private detectFrequency(buffer: Float32Array): number {
        return this.pitchDetector.detectPitch(buffer, this.sampleRate);
    }
}
