<svg viewBox="0,0,{width},{height}">
    <g stroke="#666" stroke-width="0">
        {#each nodes as {x0, y0, x1, y1, text, value, color}}
        <rect x={x0} y={y0} height={y1 - y0} width={x1 - x0} fill={color}>
            <title>{`${text}\n${format(value)}`}</title>
        </rect>
        {/each}
    </g>
    <g fill="none" stroke-opacity="0.4">
        {#each links as link}
        <g style="mix-blend-mode: multiply;">
            <linearGradient id={`link-${link.index}`}>
                <stop offset="0%" stop-color={link.source.color}></stop>
                <stop offset="100%" stop-color={link.target.color}></stop>
            </linearGradient>
            <path
                d={d(link)}
                stroke={`url('#link-${link.index}')`}
                stroke-width={Math.max(1, link.width)}
            />
            <title>{`${link.source.text} → ${link.target.text}\n${format(link.value)}`}</title>

        </g>
        {/each}
    </g>
    <g font-family="sans-serif" font-size="10">
        {#each nodes as {x0, y0, x1, y1, text}}
        <text 
            x={x0 < width / 2 ? x1 + 6 : x0 - 6} 
            y={(y1 + y0) / 2} 
            dy="0.35em" 
            text-anchor={x0 < width / 2 ? "start" : "end"}
        >
        {text}
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