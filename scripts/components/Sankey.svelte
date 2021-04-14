
<svg viewBox="0,0,{width},{height}">
    <g stroke="#000">
        {#each nodes as {x0, y0, x1, y1, name, value}}
        <rect x={x0} y={y0} height={y1 - y0} width={x1 - x0} fill="#1f77b4">
            <title>{`${name}\n${format(value)}`}</title>
        </rect>
        {/each}
    </g>
    <g fill="none" stroke-opacity="0.5">
        {#each links as link}
        <g style="mix-blend-mode: multiply;">
            <!--
            <linearGradient id="O-link-50" gradientUnits="userSpaceOnUse" x1="149.85714285714286" x2="268.7142857142857">
                <stop offset="0%" stop-color="#bcbd22"></stop>
                <stop offset="100%" stop-color="#2ca02c"></stop>
            </linearGradient>
            
            
                stroke="url(https://d3.static.observableusercontent.com/worker/worker.b27817614567202ca570c82c9fabb31eb369828472fb4541a8cb38bc0f0813a3.html#O-link-50)"
            -->
            <path
                d={d(link)}
                stroke="#aaa"
                stroke-width={Math.max(1, link.width)}
            />
            <title>{`${link.source.name} → ${link.target.name}\n${format(link.value)}`}</title>

        </g>
        {/each}
    </g>
    <g font-family="sans-serif" font-size="10">
        {#each nodes as {x0, y0, x1, y1, name}}
        <text 
            x={x0 < width / 2 ? x1 + 6 : x0 - 6} 
            y={(y1 + y0) / 2} 
            dy="0.35em" 
            text-anchor={x0 < width / 2 ? "start" : "end"}
        >
        {name}
        </text>
        {/each}
    </g>
</svg>

<style lang="scss">

</style>

<script>
    import {format} from 'd3-format'
    import { sankeyLinkHorizontal } from 'd3-sankey'

    export let width;
    export let height;

    export let nodes;
    export let links;

    const d = sankeyLinkHorizontal()

</script>