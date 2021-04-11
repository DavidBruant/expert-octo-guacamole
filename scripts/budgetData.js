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

export default [
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
    }
]