//@ts-check

// adapted from https://observablehq.com/@d3/sankey-diagram (ISC licence)

import sankeyLayout from './sankeyLayout.js'
import {nodesById, links as _links} from './budgetData.js'
import Sankey from './components/Sankey.svelte'

const width = 954;
const height = 600;

console.log('nodesById, _links', nodesById, _links)

const { nodes, links } = sankeyLayout({
    nodes: [...nodesById.values()],
    links: _links, 
    height, 
    width
})

console.log('nodes, links', nodes, links)

new Sankey({
    target: document.querySelector('.content'),
    props: {
        width,
        height,
        nodes,
        links
    }
})
