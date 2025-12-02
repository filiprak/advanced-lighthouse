import * as LH from 'lighthouse/types/lh.js';
import { LargestContentfulPaint as ComputedLcp } from 'lighthouse/core/computed/metrics/largest-contentful-paint.js';
import SimulationAudit from './base.js';

class SimulationAuditLCP extends SimulationAudit {
    static get meta(): LH.Audit.Meta {
        return {
            id: 'lcp-pessimistic',
            title: 'LCP Simulation details - Pessimistic Case',
            failureTitle: 'Simulation failed',
            description: 'Table shows LCP critical path simulation breakdown.',
            supportedModes: ['navigation'],
            requiredArtifacts: ['HostUserAgent', 'Trace', 'DevtoolsLog', 'GatherContext', 'URL', 'SourceMaps', 'HostDPR'],
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
        return (await ComputedLcp.request(metricComputationData, context)) as LH.Artifacts.LanternMetric;
    }
}

export default SimulationAuditLCP;
