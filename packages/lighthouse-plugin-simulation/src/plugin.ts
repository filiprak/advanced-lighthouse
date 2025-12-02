import * as LH from 'lighthouse/types/lh.js';
import SimulationAuditFCP from './audits/fcp-pessimistic.js';
import SimulationAuditFCPOpt from './audits/fcp-optimistic.js';
import SimulationAuditLCP from './audits/lcp-pessimistic.js';
import SimulationAuditLCPOpt from './audits/lcp-optimistic.js';
import SimulationAuditTBT from './audits/tbt-pessimistic.js';
import SimulationAuditTBTOpt from './audits/tbt-optimistic.js';
import SimulationAuditSI from './audits/si-pessimistic.js';
import SimulationAuditSIOpt from './audits/si-optimistic.js';

export default <LH.Config.Plugin>{
    // array of audits that this plugin contributes
    audits: [
        { path: 'lighthouse-plugin-simulation/dist/audits/fcp-pessimistic.js' },
        { path: 'lighthouse-plugin-simulation/dist/audits/fcp-optimistic.js' },
        { path: 'lighthouse-plugin-simulation/dist/audits/lcp-pessimistic.js' },
        { path: 'lighthouse-plugin-simulation/dist/audits/lcp-optimistic.js' },
        { path: 'lighthouse-plugin-simulation/dist/audits/tbt-pessimistic.js' },
        { path: 'lighthouse-plugin-simulation/dist/audits/tbt-optimistic.js' },
        { path: 'lighthouse-plugin-simulation/dist/audits/si-pessimistic.js' },
        { path: 'lighthouse-plugin-simulation/dist/audits/si-optimistic.js' },
    ],

    // categories that will show up on the final report. We add a category
    // that references our audit (weight 0 so it doesn't affect scores).
    category: {
        title: 'Simulation',
        description: 'Mobile simulation detailed report.',
        auditRefs: [
            { id: SimulationAuditFCP.meta.id, weight: 1 },
            { id: SimulationAuditFCPOpt.meta.id, weight: 1 },
            { id: SimulationAuditLCP.meta.id, weight: 1 },
            { id: SimulationAuditLCPOpt.meta.id, weight: 1 },
            { id: SimulationAuditTBT.meta.id, weight: 1 },
            { id: SimulationAuditTBTOpt.meta.id, weight: 1 },
            { id: SimulationAuditSI.meta.id, weight: 1 },
            { id: SimulationAuditSIOpt.meta.id, weight: 1 },
        ],
    }
};
