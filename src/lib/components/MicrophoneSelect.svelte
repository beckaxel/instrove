<script lang="ts">
	import { m } from '$lib/paraglide/messages';
    import { onMount } from 'svelte';

    let { onchange } = $props();

    let microphones = $state<MediaDeviceInfo[]>([]);
    let selectedOptionValue = $state<MediaDeviceInfo>();
    let selectedMicrophone = $state<MediaDeviceInfo>();

    function onSelectChange() {
    
        if (selectedMicrophone === selectedOptionValue?.deviceId)
            return;

        selectedMicrophone = selectedOptionValue;
        onchange(selectedMicrophone?.deviceId);
    }

    async function updateMicrophones() {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        microphones = mediaDevices.filter(d => d.kind === 'audioinput');

        selectedOptionValue = microphones.length > 0 
            ? microphones.find(m => m.deviceId === selectedMicrophone?.deviceId) || microphones[0]
            : undefined;  

        onSelectChange();
    }

	onMount(() => {
        updateMicrophones();
		navigator.mediaDevices.addEventListener('devicechange', updateMicrophones);
		return () => navigator.mediaDevices.removeEventListener('devicechange', updateMicrophones);
	});
</script>

<select bind:value={selectedOptionValue} onchange={onSelectChange}>
    {#if microphones.length === 0}
        <option disabled>{m.microphone_not_found}</option>
    {:else}
        {#each microphones as microphone}
            <option value="{microphone}">{microphone.label}</option>
        {/each}
    {/if}
</select>