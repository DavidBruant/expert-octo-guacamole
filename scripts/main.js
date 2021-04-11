//@ts-check

// adapted from https://observablehq.com/@d3/sankey-diagram (ISC licence)

import {create} from 'd3-selection'
import {format} from 'd3-format'
import {schemeCategory10} from 'd3-scale-chromatic'
import {scaleOrdinal} from 'd3-scale'
import { sankeyLinkHorizontal, sankey, sankeyJustify } from 'd3-sankey'
import _links from './budgetData.js'


const width = 954;
const height = 600;
const _color = scaleOrdinal(schemeCategory10);
const color = d => _color(d.category === undefined ? d.name : d.category);
const edgeColor = 'none';

var count = 0;

function Uid(name) {
  return new Id("O-" + (name == null ? "" : name + "-") + ++count);
}

function Id(id) {
  this.id = id;
  this.href = new URL(`#${id}`, location) + "";
}

Id.prototype.toString = function() {
  return "url(" + this.href + ")";
};

const _nodes = Array.from(new Set(_links.flatMap(l => [l.source, l.target])), name => ({name, category: name.replace(/ .*/, "")}));

const _sankey = sankey()
    .nodeId(d => d.name)
    .nodeAlign(sankeyJustify)
    .nodeWidth(15)
    .nodePadding(15)
    .extent([[1, 5], [width - 1, height - 5]]);


const __sankey = ({nodes, links}) => _sankey({
    nodes: _nodes.map(d => Object.assign({}, d)),
    links: _links.map(d => Object.assign({}, d))
});

const { nodes, links } = __sankey({nodes: _nodes, links: _links});

console.log('nodes, links', nodes, links)

const svg = create("svg")
    .attr("viewBox", [0, 0, width, height]);

svg.append("g")
    .attr("stroke", "#000")
    .selectAll("rect")
    .data(nodes)
    .join("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("height", d => d.y1 - d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("fill", color)
    .append("title")
    .text(d => `${d.name}\n${format(d.value)}`);

const link = svg.append("g")
    .attr("fill", "none")
    .attr("stroke-opacity", 0.5)
    .selectAll("g")
    .data(links)
    .join("g")
    .style("mix-blend-mode", "multiply");

link.append("path")
    .attr("d", sankeyLinkHorizontal())
    .attr("stroke", d => edgeColor === "none" ? "#aaa"
        : edgeColor === "path" ? d.uid
            : edgeColor === "input" ? color(d.source)
                : color(d.target))
    .attr("stroke-width", d => Math.max(1, d.width));

link.append("title")
    .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);

svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
    .attr("y", d => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
    .text(d => d.name);


document.querySelector('.content').append(svg.node())
