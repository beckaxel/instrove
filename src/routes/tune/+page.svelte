<script lang="ts">
	import MicrophoneSelect from "$lib/components/MicrophoneSelect.svelte";

    let microphone = $state<string>();
</script>

<MicrophoneSelect onchange={(m: string) => microphone = m} />

<style>

</style>