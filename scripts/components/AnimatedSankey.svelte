<section>
    {#if playing}
    <button on:click={pause}>Pause</button>
    {:else}
    <button on:click={play}>Play</button>
    {/if}

    <button on:click={startOver}>Start over</button>
    
    <div class="element-control">
        {#each apparitionSequence as element}
            <button></button>   
        {/each}
    </div>
</section>

{#if text}
<section class="text">
    {#key text}
    <span in:fade="{{duration: transitionDuration}}" out:fade="{{duration: transitionDuration/2}}">{text}</span>
    {/key}
</section>
{:else}
<section class="text discrete">
    <span>(le texte d'explication va apparaitre ici)</span>
</section>
{/if}

<svg viewBox="0,0,{width},{height}">
    <g stroke="#666" stroke-width="0">
        {#each visibleNodes as {x0, y0, x1, y1, text, value, color, introend}}
        <rect x={x0} y={y0} height={y1 - y0} width={x1 -
         x0} fill={color} in:fade="{{duration: transitionDuration}}" on:introend={introend}>
            <title>{`${text}\n${format(value)}`}</title>
        </rect>
        {/each}
    </g>
    <g fill="none" stroke-opacity="0.4">
        {#each visibleLinks as link}
        <g>
            <linearGradient id={`link-${link.index}`}>
                <stop offset="0%" stop-color={link.source.color}></stop>
                <stop offset="100%" stop-color={link.target.color}></stop>
            </linearGradient>
            <path
                d={sankeyLink(link)}
                stroke={`url('#link-${link.index}')`}
                stroke-width={Math.max(1, link.width)}
                in:draw="{{duration: transitionDuration}}"
                on:introend={link.introend}
            />
            <title>{`${link.source.text} → ${link.target.text}\n${format(link.value)}`}</title>

        </g>
        {/each}
    </g>
    <g font-family="sans-serif" font-size="14">
        {#each visibleNodes as {x0, y0, x1, y1, text}}
        <text 
            x={x0 < width / 2 ? x1 + 6 : x0 - 6} 
            y={(y1 + y0) / 2} 
            dy="0.35em" 
            text-anchor={x0 < width / 2 ? "start" : "end"}
            in:fade="{{duration: transitionDuration}}"
        >
        {text}
        </text>
        {/each}
    </g>
</svg>

<style lang="scss">
.element-control{
    display: flex;
    flex-direction: row;

    padding: 1rem 0;

    button{
        flex: 1;
        height: 1rem;
        background-color: rgb(79, 155, 202);
        border: none;

        &:not(:first-of-type){
            border-left: 2px solid rgb(75, 2, 75);
        }

    }
}

.text{
    padding: 0.5rem 0 1rem 0;
    text-align: center;

    height: 6rem;

    position: relative;

    span{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }


    &.discrete{
        color: grey;
        font-style: italic;
    }
}

</style>

<script>
    import { fade, slide, draw } from 'svelte/transition';
    
    import {format} from 'd3-format'
    import { sankeyLinkHorizontal } from 'd3-sankey'

    export let width;
    export let height;

    export let nodes;
    export let links;

    const transitionDuration = 700;

    const sankeyLink = sankeyLinkHorizontal()

    let playing = false;
    let text;
    let nextToDisplayIndex;
    let appearingElements;

    const apparitionSequence = [
        {
            text: `Pour construire son budget le Département dispose de plusieurs sources 
            de revenus ou recettes de fonctionnement. Ces recettes proviennent principalement du produit 
            des impôts et taxes directes et indirectes, ainsi que des dotations versées par l’Etat.`,
            group: links.filter(l => l.target.id === 'RF').map(l => l.source)
        },
        {
            group: links.filter(l => l.target.id === 'RF'),
        },
        {
            group: [ nodes.find(n => n.id === 'RF') ]
        },
        {
            text: `Ces recettes financent les allocations et prestations sociales ou de solidarité gérées
            par le Département, les services de secours (pompiers), les transports, les collèges, 
            l’entretien des routes, les intérêts d’emprunts et permettent le fonctionnement de 
            l’administration départementale (personnel, entretien bâtiments, charges courantes…)`,
            group: links.filter(l => l.target.id === 'DF'),
        },
        {
            group: [ nodes.find(n => n.id === 'DF') ]
        },
        {
            group: links.filter(l => l.source.id === 'DF'),
        },
        {
            group: links.filter(l => l.source.id === 'DF').map(l => l.target)
        },
        {
            text: `La maitrise de ces dépenses de fonctionnement permet au Département 
            de constituer une épargne`,
            group: [
                ...links.filter(l => l.target.id === 'EP'),
                nodes.find(n => n.id === 'EP')
            ]
        },
        {

            text: `Les recettes d'investissement sont constituées de dotations de l’Etat 
            et de subventions mais peuvent également provenir de la vente de patrimoine`,
            group: [ nodes.find(n => n.id === 'I_Autres') ]
        },
        {
            text: `Les emprunts permettent au Département d'atteindre l’équilibre budgétaire et
                    d’investir dans des projets d’ampleur ou durables.`,
            group: [ nodes.find(n => n.id === 'I_Emprunt') ]
        },
        {
            text: `L’épargne ajoutée aux recettes d'investissement et à l’emprunt va 
            permettre le financement des dépenses d’investissement structurantes 
            nécessaires au développement du territoire girondin : collèges, routes, 
            bâtiments, subventions aux partenaires territoriaux (communes, bailleurs sociaux…)`,
            group: [
                ...links.filter(l => l.target.id === 'RI'),
                nodes.find(n => n.id === 'RI')
            ]
        },
        {
            group: [
                ...links.filter(l => l.target.id === 'DI'),
                nodes.find(n => n.id === 'DI')
            ]
        },
        {
            group: [
                ...links.filter(l => l.source.id === 'DI'),
                ...links.filter(l => l.source.id === 'DI').map(l => l.target)
            ]
        },
        {
            text: `Chaque année le vote du compte administratif du Département valide les 
            équilibres budgétaires issus du vote du budget. La qualité de la gestion financière 
            permet de garantir l'exercice des missions et la capacité d'investir en faveur du 
            développement du territoire girondin`,
            group: []
        }
    ]


    console.log('apparitionSequence', apparitionSequence)


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

                    function introend(){
                        thisElementResolve()
                    }

                    console.log('element', element)
                    for(const e of element.group){
                        e.introend = introend
                    }

                    appearingElements[nextToDisplayIndex] = element
                    if(element.text){
                        text = element.text
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
        appearingElements = [];
        text = undefined;
    }

    startOver()

    $: visibleNodes = appearingElements.map(el => el.group).flat().filter(el => !el.source);
    $: visibleLinks = appearingElements.map(el => el.group).flat().filter(el => el.source);

    $: console.log('visibles', visibleNodes, visibleLinks)

</script>