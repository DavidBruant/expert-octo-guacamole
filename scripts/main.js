//@ts-check

// adapted from https://observablehq.com/@d3/sankey-diagram (ISC licence)

import sankeyLayout from './sankeyLayout.js'
import {nodesById, links as _links} from './budgetData.js'
import AnimatedSankey from './components/AnimatedSankey.svelte'


const width = 900;
const height = 500;

console.log('nodesById, _links', nodesById, _links)

const { nodes, links } = sankeyLayout({
    nodes: [...nodesById.values()],
    links: _links, 
    height, 
    width
})

console.log('nodes, links', nodes, links)

new AnimatedSankey({
    target: document.querySelector('.content'),
    props: {
        width,
        height,
        nodes,
        links
    },
    intro: true
})


