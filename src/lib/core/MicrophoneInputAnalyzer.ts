import levelAudioWorkletProcessorUrl from '$lib/audio/LevelAudioWorkletProcessor?worker&url'
import { Ticker } from './Ticker';

export interface IMicrophoneInputAnalyzerOptions {
    updateInterval?: number;
    level?: boolean;
    pitch?: boolean;
}

export interface ILevel {
    rms: number;
    peak: number;
    clipped: boolean;
}

export interface IMicrophoneInputAnalyerMessage {
    level?: ILevel;
    pitch?: number;
}

export type MicrophoneInputAnalyerCallback = (message: IMicrophoneInputAnalyerMessage) => void;

export class MicrophoneInputAnalyzer {

    private readonly ticker: Ticker;

    private microphone: string | null = null;
    private levelNode: AudioWorkletNode | null;
    private audioSourceNode: MediaStreamAudioSourceNode | null;
    private currentLevel: ILevel | null;
    
    constructor(
        private readonly audioContext: AudioContext,
        private readonly callback: MicrophoneInputAnalyerCallback,
        options?: IMicrophoneInputAnalyzerOptions
    ) {
        this.audioContext = new AudioContext({ sampleRate: 48000 });
        this.audioContext.suspend();
        this.levelNode = null;
        this.audioSourceNode = null;

        if (options?.level !== false)
            this.initializeLevelNode();

        this.currentLevel = null;

        this.ticker = new Ticker(options?.updateInterval || 100, this.onTick.bind(this));
    }

    public get level(): boolean {
        return this.levelNode !== null;
    }

    public get microphoneId(): string | null {
        return this.microphone;
    }

    private async initializeLevelNode() {
        await this.audioContext.audioWorklet.addModule(levelAudioWorkletProcessorUrl);
        this.levelNode = new AudioWorkletNode(this.audioContext, 'level-processor');
        this.levelNode.port.onmessage = this.onLevelMessage.bind(this);
    }

    private onLevelMessage(event: MessageEvent<ILevelAudioWorkletProcessorMessage>) {
        console.log(event.data);
        this.currentLevel = { ...event.data };
    }

    private onTick() {
        this.callback({
            level: this.currentLevel !== null ? this.currentLevel : undefined
        });
    }

    public async start(microphoneId: string) {

        this.microphone = microphoneId;
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:  {
                deviceId: { exact: this.microphone },
                channelCount: { ideal: 2 },
                autoGainControl: { exact: false },
                echoCancellation: { exact:  false },
                noiseSuppression: { exact: false },
                sampleRate: { exact: this.audioContext.sampleRate }, 
                sampleSize: { ideal: 16 }
            }
        });
        this.audioSourceNode = this.audioContext.createMediaStreamSource(stream);
        if (this.levelNode !== null)
            this.audioSourceNode.connect(this.levelNode);
        this.audioContext.resume();
        this.ticker.start();
    }

    public async stop() {
        this.ticker.stop();
        this.audioContext.suspend();
        if (this.levelNode !== null)
            this.audioSourceNode?.disconnect(this.levelNode);
        this.audioSourceNode = null;
        this.microphone = null;
    }
}
