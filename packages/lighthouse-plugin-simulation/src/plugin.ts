import * as LH from 'lighthouse/types/lh.js';
import SimulationAudit from './audits/fcp-details.js';

export default <LH.Config.Plugin>{
    // array of audits that this plugin contributes
    audits: [{ path: 'lighthouse-plugin-simulation/dist/audits/fcp-details.js' }],

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
