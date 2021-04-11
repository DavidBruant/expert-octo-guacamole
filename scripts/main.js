//@ts-check

// adapted from https://observablehq.com/@d3/sankey-diagram (ISC licence)

import * as d3 from 'd3';
import { sankeyLinkHorizontal, sankey, sankeyCenter, sankeyJustify } from 'd3-sankey'

const width = 954;
const height = 600;
const _color = d3.scaleOrdinal(d3.schemeCategory10);
const color = d => _color(d.category === undefined ? d.name : d.category);
const edgeColor = 'path';
const units = "TWh"

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

const budgNodes = {
    'R': 'Recettes',
    'D': 'Dépenses',
    'RF': 'Recettes de fonctionnement',
    'RI': `Recettes d'investissement`,
    'DF': `Dépenses de fonctionnement`,
    'DI': `Dépenses d'investissement`,
    
    'RF_DotEtat': `Dotation de l'État`,
    'RF_FiscDirecte': `Fiscalité directe`,
    'RF_FiscIndirecte': `Fiscalité indirecte`,
    'RF_Divers': `Recettes diverses`,

    'EP': 'Épargne',

    'DF_Solidarite': 'Solidarité',
    'DF_Interventions': 'Interventions (SDIS …)',
    'DF_Autres': 'Autres (personnel …)',

    'I_Emprunt': 'Emprunts',
    'I_Autres': `Autres recettes d'investissement`,

    'DI_Remboursement': `Remboursement Emprunts`,
    'DI_Construction': `ROUTES + COLLÈGES + BÂTIMENTS + AMÉNAGEMENT`,
    'DI_Subventions': `Subventions`,
}

/*


Dépenses d'investissement
267,0 M€
Remboursement Emprunts 66,6 M€
ROUTES + COLLÈGES + BÂTIMENTS + AMÉNAGEMENT 141,7 M€
Subventions 58,7 M€

*/

d3.csv('./data/energy.csv').then(_links => {

    _links = [
        // Recettes de fonctionnement
        {
            source: budgNodes.RF_DotEtat,
            target: budgNodes.RF,
            value: 187.1
        },
        {
            source: budgNodes.RF_FiscDirecte,
            target: budgNodes.RF,
            value: 495.6
        },
        {
            source: budgNodes.RF_FiscIndirecte,
            target: budgNodes.RF,
            value: 745.0
        },
        {
            source: budgNodes.RF_Divers,
            target: budgNodes.RF,
            value: 217.7
        },

        {
            source: budgNodes.RF,
            target: budgNodes.DF,
            value: 1495.3
        },

        // Épargne
        {
            source: budgNodes.RF,
            target: budgNodes.EP,
            value: 150.2
        },

        // Dépenses de fonctionnement
        {
            source: budgNodes.DF,
            target: budgNodes.DF_Solidarite,
            value: 952.3
        },

        {
            source: budgNodes.DF,
            target: budgNodes.DF_Interventions,
            value: 169.9
        },

        {
            source: budgNodes.DF,
            target: budgNodes.DF_Autres,
            value: 373.0
        },

        // Investissement
        {
            source: budgNodes.EP,
            target: budgNodes.DI,
            value: 150.2
        },
        {
            source: budgNodes.I_Emprunt,
            target: budgNodes.RI,
            value: 70.0
        },
        {
            source: budgNodes.I_Autres,
            target: budgNodes.RI,
            value: 36.2
        },
        {
            source: budgNodes.RI,
            target: budgNodes.DI,
            value : 70.0 + 36.2
        },


        // Dépenses d'investissement
        {
            source: budgNodes.DI,
            target: budgNodes.DI_Remboursement,
            value: 66.6
        },
        {
            source: budgNodes.DI,
            target: budgNodes.DI_Construction,
            value: 141.7
        },
        {
            source: budgNodes.DI,
            target: budgNodes.DI_Subventions,
            value: 58.7
        },


/*
    'DI_Remboursement': `Remboursement Emprunts`,
    'DI_Construction': `ROUTES + COLLÈGES + BÂTIMENTS + AMÉNAGEMENT`,
    'DI_Subventions': `Subventions`,

Dépenses d'investissement
267,0 M€
Remboursement Emprunts 66,6 M€
ROUTES + COLLÈGES + BÂTIMENTS + AMÉNAGEMENT 141,7 M€
Subventions 58,7 M€

*/

    ]

    const _nodes = Array.from(new Set(_links.flatMap(l => [l.source, l.target])), name => ({name, category: name.replace(/ .*/, "")}));
    

    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);

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
        .text(d => `${d.name}\n${d3.format(d.value)}`);

    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.5)
        .selectAll("g")
        .data(links)
        .join("g")
        .style("mix-blend-mode", "multiply");

    if (edgeColor === "path") {
        const gradient = link.append("linearGradient")
            .attr("id", d => (d.uid = Uid("link")).id)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", d => d.source.x1)
            .attr("x2", d => d.target.x0);

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d => color(d.source));

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d => color(d.target));
    }

    link.append("path")
        .attr("d", sankeyLinkHorizontal())
        .attr("stroke", d => edgeColor === "none" ? "#aaa"
            : edgeColor === "path" ? d.uid
                : edgeColor === "input" ? color(d.source)
                    : color(d.target))
        .attr("stroke-width", d => Math.max(1, d.width));

    link.append("title")
        .text(d => `${d.source.name} → ${d.target.name}\n${d3.format(d.value)}`);

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
})
