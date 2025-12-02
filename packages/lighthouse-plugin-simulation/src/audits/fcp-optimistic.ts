import * as LH from 'lighthouse/types/lh.js';
import SimulationAuditFCP from './fcp-pessimistic.js';

class SimulationAuditFCPOpt extends SimulationAuditFCP {
    static get meta(): LH.Audit.Meta {
        return {
            ...super.meta,
            id: 'fcp-optimistic',
            title: 'FCP Simulation details - Optimistic Case',
        };
    }

    static get optimistic(): boolean {
        return true;
    }
}

export default SimulationAuditFCPOpt;
