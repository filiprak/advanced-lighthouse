import * as LH from 'lighthouse/types/lh.js';
import SimulationAuditLCP from './lcp-pessimistic.js';

class SimulationAuditLCPOpt extends SimulationAuditLCP {
    static get meta(): LH.Audit.Meta {
        return {
            ...super.meta,
            id: 'lcp-optimistic',
            title: 'LCP Simulation details - Optimistic Case',
        };
    }

    static get optimistic(): boolean {
        return true;
    }
}

export default SimulationAuditLCPOpt;
