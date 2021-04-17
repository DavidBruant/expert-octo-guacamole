
{#if playing}
    <button on:click={pause}>Pause</button>
{:else}
    <button on:click={play}>Play</button>
{/if}

<button on:click={startOver}>Start over</button>


<section>
{#each appearingElements as carré (carré.i)}
    <div class="carré" transition:fade on:introend={carré.introend} style="background-color: {carré.color}"></div>   
{/each}
</section>

<style lang="scss">
    button{
        min-width: 3rem;
        min-height: 3rem;
    }

    .carré{
        display: inline-block;
        margin-right: 1rem;
        width: 4rem;
        height: 4rem;
        border: 3px solid #808080;

        border-radius: 1rem;
    }
</style>

<script>
    import { fade, slide } from 'svelte/transition';

    let playing = false;

    const count = 9;

    const carrés = Array(count).fill().map((_, i) => {
        const greyShade = Math.round(i*255/(count-1)).toString(16);
        console.log('greyShade', greyShade)
        return {i, color: `#${greyShade}${greyShade}${greyShade}`}
    });

    const apparitionSequence = [...carrés]

    let nextToDisplayIndex;
    let appearingElements;

    function play(){
        playing = true;

        let previousElementDonePromise = Promise.resolve()

        for(const element of apparitionSequence.slice(nextToDisplayIndex)){
            previousElementDonePromise = previousElementDonePromise.then(() => {
                if(playing){
                    let thisElementResolve;
                    const p = new Promise((resolve, reject) => {
                        thisElementResolve = resolve
                    })

                    appearingElements[nextToDisplayIndex] = {
                        ...element, 
                        introend(){
                            thisElementResolve()
                        }
                    }

                    nextToDisplayIndex++

                    return p;
                }
                else{
                    return;
                }

            })
        }

        previousElementDonePromise.then(() => {playing = false})

    }

    function pause(){
        playing = false;
    }

    function startOver(){
        pause()
        nextToDisplayIndex = 0;
        appearingElements = []
    }

    startOver()

</script>