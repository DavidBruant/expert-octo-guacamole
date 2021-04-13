//@ts-check

import { sankey, sankeyJustify } from 'd3-sankey'

export default function({nodes, links, height, width}){

    const _sankey = sankey()
        .nodeId(d => d.name)
        .nodeAlign(sankeyJustify)
        .nodeWidth(15)
        .nodePadding(15)
        .extent([[1, 5], [width - 1, height - 5]]);

    return _sankey({
        nodes: nodes.map(d => Object.assign({}, d)),
        links: links.map(d => Object.assign({}, d))
    })
}
