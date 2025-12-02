import * as LH from 'lighthouse/types/lh.js';
import { Audit } from 'lighthouse';

class SimulationAudit extends Audit {
    static get optimistic(): boolean {
        return false;
    }

    static get label(): string {
        throw new Error('label must be overridden.');
    }

    static async getMetricResult(artifacts: LH.Artifacts, context: LH.Audit.Context): Promise<LH.Artifacts.LanternMetric> {
        throw new Error('getMetricResult() must be overridden.');
    }

    static async audit(artifacts: LH.Artifacts, context: LH.Audit.Context): Promise<LH.Audit.NonNumericProduct> {
        const metricResult = await this.getMetricResult(artifacts, context);
        const estimate = this.optimistic ? metricResult.optimisticEstimate : metricResult.pessimisticEstimate;
        let items: LH.Audit.Details.Table["items"] = [];

        let maxEnd = 0;

        items = items.concat([...estimate.nodeTimings].map(([node, res]) => {
            maxEnd = Math.max(maxEnd, res.endTime);

            if (node.type == 'network') {
                return {
                    name: node.request.url,
                    type: node.type,
                    start: res.startTime.toFixed(0),
                    end: res.endTime.toFixed(0),
                    duration: res.duration.toFixed(0) + ' ms',
                };
            } else {
                return {
                    name: node.event.name,
                    type: node.type,
                    start: res.startTime.toFixed(0),
                    end: res.endTime.toFixed(0),
                    duration: res.duration.toFixed(0) + ' ms',
                };
            }
        }));

        items.push({
            name: `Summary (${this.optimistic ? 'Optimistic' : 'Pessimistic'} ${this.label} = ${estimate.timeInMs.toFixed(0)} ms)`,
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
            score: null,
            scoreDisplayMode: 'informative',
            details: {
                type: 'debugdata',
                _eval: `console.log(document.getElementById('${this.meta.id}'))`,
            },
        };
    }
}

export default SimulationAudit;
