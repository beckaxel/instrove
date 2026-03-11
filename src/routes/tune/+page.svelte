<script lang="ts">
    import MicrophoneSelect from "$lib/components/MicrophoneSelect.svelte";
	import { 
        MicrophoneInputAnalyzer, 
        type ILevel, 
        type IMicrophoneInputAnalyerMessage 
    } from '$lib/core/MicrophoneInputAnalyzer';
    
    const analyserOptions = {
        updateInterval: 100,
        level: true,
        pitch: false
    };

    let running = $state(false);
    let microphone = $state<string>();
    let level = $state<ILevel>();

    function microphoneChanged(newMicrophone: string) {
        const wasRunning = running;
        if (wasRunning)
            stop();
        microphone = newMicrophone;
        if (wasRunning)
            start();
    }

    function onUpdate(message: IMicrophoneInputAnalyerMessage) {
        level = message.level;
    }

    const analyser = new MicrophoneInputAnalyzer(
        new AudioContext({ sampleRate: 48000 }), 
        onUpdate, 
        analyserOptions
    );
    
    async function start() {
        if (!microphone)
            return;

        running = true;
        await analyser.start(microphone);
    }

    async function stop() {
        running = false;
        await analyser.stop();
    }

</script>

<div id="tune">
    <section id="microphone">
        <MicrophoneSelect onchange={microphoneChanged} />
    </section>
    <section id="controls">
        <button onclick={running ? stop : start}>{running ? 'stop' : 'start'}</button>
    </section>
    <section id="visualization">
        <p>RMS: {level ? level.rms : ''}</p>
        <p>PEAK: {level ? level.peak : ''}</p>
        <p>CLIPPED: {level ? level.clipped : ''}</p>
    </section>
</div>

<style>

</style>