const SimulationAudit = require('./audits/simulation-stats');
const path = require('path');

const manifest = {
    // array of audits that this plugin contributes
    audits: [{ path: path.resolve(__dirname, './audits/simulation-stats.js') }],

    // categories that will show up on the final report. We add a category
    // that references our audit (weight 0 so it doesn't affect scores).
    category: {
        title: 'Simulation',
        description: 'Mobile simulation detailed report.',
        auditRefs: [
            { id: SimulationAudit.meta.id, weight: 1 }
        ],
    }
};

module.exports = manifest;