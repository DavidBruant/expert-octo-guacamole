//@ts-check

// adapted from https://observablehq.com/@d3/sankey-diagram (ISC licence)

import sankeyLayout from './sankeyLayout.js'
import _links from './budgetData.js'
import Sankey from './components/Sankey.svelte'


const width = 954;
const height = 600;

const _nodes = [...new Set(_links.flatMap(l => [l.source, l.target]))].map(name => ({name}));

const { nodes, links } = sankeyLayout({nodes: _nodes, links: _links, height, width})

console.log('nodes, links', nodes, links)

const sankey = new Sankey({
    target: document.querySelector('.content'),
    props: {
        width,
        height,
        nodes,
        links
    }
})
