<button on:click={increment}>+</button><button on:click={decrement}>-</button>

<section>
{#each carrés as carré (carré.i)}
    {#if shown.has(carré.i)}
        <div class="carré" transition:fade></div>   
    {/if}
{/each}
</section>

<style lang="scss">
    button{
        width: 2rem;
        height: 2rem;
    }

    .carré{
        display: inline-block;
        margin-right: 1rem;
        width: 4rem;
        height: 4rem;
        background-color: coral;
    }
</style>

<script>
    import { fade, slide } from 'svelte/transition';

    let maxShown = 2

    function increment(){
        maxShown++
    }

    function decrement(){
        maxShown--
    }

    const count = 10;

    const carrés = Array(count).fill().map((_, i) => ({i}));

    let shown;

    $: shown = new Set(carrés.filter(c => c.i <= maxShown).map(c => c.i))

</script>