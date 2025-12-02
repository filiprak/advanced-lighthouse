import * as LH from 'lighthouse/types/lh.js';
import { Audit } from 'lighthouse';
import { FirstContentfulPaint as ComputedFcp } from 'lighthouse/core/computed/metrics/first-contentful-paint.js';

class SimulationAudit extends Audit {
    static get meta(): LH.Audit.Meta {
        return {
            id: 'fcp-details',
            title: 'FCP Simulation details',
            description: 'Table shows FCP critical path simulation breakdown.',
            failureTitle: 'FCP Simulation details',
            supportedModes: ['navigation'],
            requiredArtifacts: ['Trace', 'DevtoolsLog', 'GatherContext', 'URL', 'SourceMaps', 'HostDPR'],
        };
    }

    static async audit(artifacts: LH.Artifacts, context: LH.Audit.Context): Promise<LH.Audit.NonNumericProduct> {
        const trace = artifacts.Trace;
        const devtoolsLog = artifacts.DevtoolsLog;
        const gatherContext = artifacts.GatherContext;
        const metricComputationData = {
            trace, devtoolsLog, gatherContext,
            settings: context.settings, URL: artifacts.URL,
            SourceMaps: artifacts.SourceMaps, simulator: null,
            HostDPR: artifacts.HostDPR,
        };
        const metricResult = (await ComputedFcp.request(metricComputationData, context)) as LH.Artifacts.LanternMetric;
        const estimate = metricResult.optimisticEstimate;

        let maxEnd = 0;

        const items: LH.Audit.Details.Table["items"] = [...estimate.nodeTimings].map(([node, res]) => {
            maxEnd = Math.max(maxEnd, res.endTime);

            if (node.type == 'network') {
                return {
                    name: node.request.url,
                    type: node.type,
                    start: res.startTime.toFixed(0),
                    end: res.endTime.toFixed(0),
                    duration: res.duration.toFixed(0) + 'ms',
                };
            } else {
                return {
                    name: node.event.name,
                    type: node.type,
                    start: res.startTime.toFixed(0),
                    end: res.endTime.toFixed(0),
                    duration: res.duration.toFixed(0) + 'ms',
                };
            }
        });

        items.push({
            name: `Summary (Optimistic FCP = ${estimate.timeInMs.toFixed(0)} ms)`,
            type: '',
            start: '',
            end: maxEnd.toFixed(0) + ' ms',
            duration: '',
        });

        const headings: LH.Audit.Details.Table["headings"] = [
            { key: 'name', valueType: 'text', label: 'Resource' },
            { key: 'type', valueType: 'text', label: 'Type' },
            { key: 'start', valueType: 'text', label: 'Start' },
            { key: 'end', valueType: 'text', label: 'End' },
            { key: 'duration', valueType: 'text', label: 'Duration' },
        ];

        return {
            // Score set to 1 so the audit is 'passing' (you can also return null for no score)
            score: null,
            scoreDisplayMode: 'informative',
            // `details` controls how the audit is rendered in the report
            details: Audit.makeTableDetails(headings, items),
        };
    }
}

export default SimulationAudit;
