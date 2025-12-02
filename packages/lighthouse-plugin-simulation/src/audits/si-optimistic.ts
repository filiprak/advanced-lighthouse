import * as LH from 'lighthouse/types/lh.js';
import SimulationAuditSI from './si-pessimistic.js';

class SimulationAuditSIOpt extends SimulationAuditSI {
    static get meta(): LH.Audit.Meta {
        return {
            ...super.meta,
            id: 'si-optimistic',
            title: 'SI Simulation details - Optimistic Case',
        };
    }

    static get optimistic(): boolean {
        return true;
    }
}

export default SimulationAuditSIOpt;
