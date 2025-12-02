import * as LH from 'lighthouse/types/lh.js';
import { SpeedIndex as ComputedSi } from 'lighthouse/core/computed/metrics/speed-index.js';
import SimulationAudit from './base.js';

class SimulationAuditSI extends SimulationAudit {
    static get meta(): LH.Audit.Meta {
        return {
            id: 'si-pessimistic',
            title: 'SI Simulation details - Pessimistic Case',
            failureTitle: 'Simulation failed',
            description: 'Table shows SI critical path simulation breakdown.',
            supportedModes: ['navigation'],
            requiredArtifacts: ['Trace', 'DevtoolsLog', 'GatherContext', 'URL', 'SourceMaps', 'HostDPR'],
        };
    }

    static get label(): string {
        return 'SI';
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
        return (await ComputedSi.request(metricComputationData, context)) as LH.Artifacts.LanternMetric;
    }
}

export default SimulationAuditSI;
