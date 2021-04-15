//@ts-check


const area_color_1 = '#0E7FAB';
const area_color_2 = '#F8C738';
const area_color_3 = '#EC3500';
const area_color_4 = '#B8C30F';

export const nodesById = new Map(Object.entries({
    'RF': {
        text: 'Recettes de fonctionnement',
        color: area_color_3
    },
    'RI': {
        text: `Recettes d'investissement`,
        color: area_color_1
    },
    'DF': {
        text: `Dépenses de fonctionnement`,
        color: area_color_2
    },
    'DI': {
        text: `Dépenses d'investissement`,
        color: area_color_4
    },
    'RF_DotEtat': {
        text: `Dotation de l'État`,
        color: area_color_3
    },
    'RF_FiscDirecte': {
        text: `Fiscalité directe`,
        color: area_color_3
    },
    'RF_FiscIndirecte': {
        text: `Fiscalité indirecte`,
        color: area_color_3
    },
    'RF_Divers': {
        text: `Recettes diverses`,
        color: area_color_3
    },
    'EP': {
        text: 'Épargne',
        color: area_color_3
    },
    'DF_Solidarite': {
        text: 'Solidarité',
        color: area_color_2
    },
    'DF_Interventions': {
        text: 'Interventions (SDIS …)',
        color: area_color_2
    },
    'DF_Autres': {
        text: 'Autres (personnel …)',
        color: area_color_2
    },
    'I_Emprunt': {
        text: 'Emprunts',
        color: area_color_1
    },
    'I_Autres': {
        text: `Autres recettes d'investissement`,
        color: area_color_1
    },
    'DI_Remboursement': {
        text: `Remboursement Emprunts`,
        color: area_color_4
    },
    'DI_Construction': {
        text: `ROUTES + COLLÈGES + BÂTIMENTS + AMÉNAGEMENT`,
        color: area_color_4
    },
    'DI_Subventions': {
        text: `Subventions`,
        color: area_color_4
    },
}).map( ([id, node]) => ([id, {id, ...node}])) )

export const links = [
    // Recettes de fonctionnement
    {
        source: nodesById.get('RF_DotEtat'),
        target: nodesById.get('RF'),
        value: 187.1
    },
    {
        source: nodesById.get('RF_FiscDirecte'),
        target: nodesById.get('RF'),
        value: 495.6
    },
    {
        source: nodesById.get('RF_FiscIndirecte'),
        target: nodesById.get('RF'),
        value: 745.0
    },
    {
        source: nodesById.get('RF_Divers'),
        target: nodesById.get('RF'),
        value: 217.7
    },

    {
        source: nodesById.get('RF'),
        target: nodesById.get('DF'),
        value: 1495.3
    },

    // Épargne
    {
        source: nodesById.get('RF'),
        target: nodesById.get('EP'),
        value: 150.2
    },

    // Dépenses de fonctionnement
    {
        source: nodesById.get('DF'),
        target: nodesById.get('DF_Solidarite'),
        value: 952.3
    },

    {
        source: nodesById.get('DF'),
        target: nodesById.get('DF_Interventions'),
        value: 169.9
    },

    {
        source: nodesById.get('DF'),
        target: nodesById.get('DF_Autres'),
        value: 373.0
    },

    // Investissement
    {
        source: nodesById.get('EP'),
        target: nodesById.get('DI'),
        value: 150.2
    },
    {
        source: nodesById.get('I_Emprunt'),
        target: nodesById.get('RI'),
        value: 70.0
    },
    {
        source: nodesById.get('I_Autres'),
        target: nodesById.get('RI'),
        value: 36.2
    },
    {
        source: nodesById.get('RI'),
        target: nodesById.get('DI'),
        value : 70.0 + 36.2
    },


    // Dépenses d'investissement
    {
        source: nodesById.get('DI'),
        target: nodesById.get('DI_Remboursement'),
        value: 66.6
    },
    {
        source: nodesById.get('DI'),
        target: nodesById.get('DI_Construction'),
        value: 141.7
    },
    {
        source: nodesById.get('DI'),
        target: nodesById.get('DI_Subventions'),
        value: 58.7
    }
]