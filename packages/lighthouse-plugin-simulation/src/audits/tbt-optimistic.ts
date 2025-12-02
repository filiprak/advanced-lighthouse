import * as LH from 'lighthouse/types/lh.js';
import SimulationAuditTBT from './tbt-pessimistic.js';

class SimulationAuditTBTOpt extends SimulationAuditTBT {
    static get meta(): LH.Audit.Meta {
        return {
            ...super.meta,
            id: 'tbt-optimistic',
            title: 'TBT Simulation details - Optimistic Case',
        };
    }

    static get optimistic(): boolean {
        return true;
    }
}

export default SimulationAuditTBTOpt;
