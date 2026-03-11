interface ILevelAudioWorkletProcessorMessage {
    rms: number;
    peak: number;
    clipped: boolean;
}

class LevelAudioWorkletProcessor extends AudioWorkletProcessor {
    
    constructor() {
        super();
    }

    private sendMessage(message: ILevelAudioWorkletProcessorMessage) {
        this.port.postMessage(message);
    }

    process(inputs: Float32Array[][]): boolean {
        const input = inputs[0][0];
        if (!input) 
            return true;

        let sum = 0;
        let peak = 0;

        for (let i = 0; i < input.length; i++) {
            const v = input[i];
            sum += v * v;
            const abs = Math.abs(v);
            if (abs > peak) 
                peak = abs;
        }

        this.sendMessage({
            rms: Math.round((Math.sqrt(sum / input.length) + Number.EPSILON) * 1000) / 1000,
            peak: Math.round((peak + Number.EPSILON) * 1000) / 1000,
            clipped: peak >= 0.98
        });

        return true;
    }
}

registerProcessor('level-processor', LevelAudioWorkletProcessor);