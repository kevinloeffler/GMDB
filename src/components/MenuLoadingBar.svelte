<div class="wrapper" bind:this={wrapperElement}>
    <div class="progress" bind:this={progressElement}></div>
</div>


<script lang="ts">

    import {onDestroy, onMount} from 'svelte'

    let wrapperElement: Optional<HTMLDivElement>
    let progressElement: Optional<HTMLDivElement>

    let progressWidth: number
    $: progressWidth = progressElement?.offsetWidth || 0

    let wrapperWidth: number
    $: wrapperWidth = wrapperElement?.offsetWidth || 0

    let interval: Optional<NodeJS.Timer>

    onMount(() => {
        interval = setInterval(() => {
            updateProgressBar()
        }, 500)
    })

    onDestroy(() => {
        clearInterval(interval)
    })

    function updateProgressBar() {
        if (!progressElement) return
        progressElement.style.width = `${Math.random() * ((wrapperWidth - progressWidth - 10) / 3) + progressWidth}px`
    }

</script>


<style>

    .wrapper {
        position: relative;
        width: 100%;
        height: 8px;
        border-radius: 100px;
        overflow: hidden;
        background-color: var(--secondary-color);
    }

    .progress {
        position: absolute;
        left: 0;
        height: 100%;
        width: 0;
        background-color: var(--accent-color);
    }

</style>