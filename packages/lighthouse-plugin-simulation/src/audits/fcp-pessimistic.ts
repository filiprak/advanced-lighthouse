import * as LH from 'lighthouse/types/lh.js';
import { FirstContentfulPaint as ComputedFcp } from 'lighthouse/core/computed/metrics/first-contentful-paint.js';
import SimulationAudit from './base.js';

class SimulationAuditFCP extends SimulationAudit {
    static get meta(): LH.Audit.Meta {
        return {
            id: 'fcp-pessimistic',
            title: 'FCP Simulation details - Pessimistic Case',
            failureTitle: 'Simulation failed',
            description: 'Table shows FCP critical path simulation breakdown.',
            supportedModes: ['navigation'],
            requiredArtifacts: ['Trace', 'DevtoolsLog', 'GatherContext', 'URL', 'SourceMaps', 'HostDPR'],
        };
    }

    static get label(): string {
        return 'FCP';
    }

    static async getMetricResult(artifacts: LH.Artifacts, context: LH.Audit.Context): Promise<LH.Artifacts.LanternMetric> {
        const trace = artifacts.Trace;
        const devtoolsLog = artifacts.DevtoolsLog;
        const gatherContext = artifacts.GatherContext;
        const metricComputationData = {
            trace, devtoolsLog, gatherContext,
            settings: context.settings, URL: artifacts.URL,
            SourceMaps: artifacts.SourceMaps, simulator: null,
            HostDPR: artifacts.HostDPR,
        };
        return (await ComputedFcp.request(metricComputationData, context)) as LH.Artifacts.LanternMetric;
    }
}

export default SimulationAuditFCP;
