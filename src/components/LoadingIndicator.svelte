<div class="wrapper">
    <div id="dot-1" class="dot"></div>
    <div id="dot-2" class="dot"></div>
    <div id="dot-3" class="dot"></div>
</div>


<style>

    .wrapper {
        display: flex;
        justify-content: center;
    }

    .dot {
        width: 12px;
        height: 12px;
        background-color: var(--accent-color);
        border-radius: 100%;
        margin: 2px;
        opacity: 0.3;
        animation: pulse 1s infinite;
    }

    #dot-2 {
        animation-delay: 0.33s;
    }

    #dot-3 {
        animation-delay: 0.66s;
    }

    @keyframes pulse {
        0%, 80% {
            opacity: 0.3;
        }
        40% {
            opacity: 1;
        }
    }

</style>
