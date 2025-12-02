import * as LH from 'lighthouse/types/lh.js';
import { TotalBlockingTime as ComputedTbt } from 'lighthouse/core/computed/metrics/total-blocking-time.js';
import SimulationAudit from './base.js';

class SimulationAuditTBT extends SimulationAudit {
    static get meta(): LH.Audit.Meta {
        return {
            id: 'tbt-pessimistic',
            title: 'TBT Simulation details - Pessimistic Case',
            failureTitle: 'Simulation failed',
            description: 'Table shows TBT critical path simulation breakdown.',
            supportedModes: ['navigation'],
            requiredArtifacts: ['Trace', 'DevtoolsLog', 'GatherContext', 'URL', 'SourceMaps', 'HostDPR'],
        };
    }

    static get label(): string {
        return 'TBT';
    }

    static async getMetricResult(artifacts: LH.Artifacts, context: LH.Audit.Context): Promise<LH.Artifacts.LanternMetric> {
        const trace = artifacts.Trace;
        const devtoolsLog = artifacts.DevtoolsLog;
        const gatherContext = artifacts.GatherContext;
        const metricComputationData = {
            trace, devtoolsLog, gatherContext,
            settings: context.settings, URL: artifacts.URL,
            SourceMaps: artifacts.SourceMaps,
            HostDPR: artifacts.HostDPR,
            simulator: null,
        };
        return (await ComputedTbt.request(metricComputationData, context)) as LH.Artifacts.LanternMetric;
    }
}

export default SimulationAuditTBT;
