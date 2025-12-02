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

        type Item = { name: string, type: string, start: number, end: number, duration: number };

        let maxEnd = 0;

        const items: Item[] = [...estimate.nodeTimings].map(([node, res]) => {
            maxEnd = Math.max(maxEnd, res.endTime);

            if (node.type == 'network') {
                return {
                    name: node.request.url,
                    type: node.type,
                    start: res.startTime,
                    end: res.endTime,
                    duration: res.duration,
                };
            } else {
                return {
                    name: node.event.name,
                    type: node.type,
                    start: res.startTime,
                    end: res.endTime,
                    duration: res.duration,
                };
            }
        });

        const render = (el: HTMLElement, data: { items: Item[], max: number }) => {
            const chart = document.createElement('div');

            chart.style.margin = '24px';
            chart.style.border = '1px dashed grey';

            for (let item of data.items) {
                const row = document.createElement('div');
                const trace = document.createElement('div');

                trace.style.marginLeft = ((item.start / data.max) * 100).toFixed(2) + '%';
                trace.style.width = ((item.duration / data.max) * 100).toFixed(2) + '%';
                trace.style.height = '15px';
                trace.style.backgroundColor = 'blueviolet';
                trace.style.border = '1px solid grey';

                row.setAttribute('title', `[${item.duration.toFixed(0)} ms] ${item.type}: ${item.name}`);
                row.addEventListener('mouseenter', () => { row.style.background = '#ffffff29' });
                row.addEventListener('mouseleave', () => { row.style.background = '' });
                row.appendChild(trace);
                chart.appendChild(row);
            }

            el.getElementsByClassName('lh-expandable-details')?.[0]?.appendChild(chart);
        }

        return {
            score: null,
            scoreDisplayMode: 'informative',
            details: {
                type: 'debugdata',
                _data: {
                    items,
                    max: maxEnd,
                },
                _render: render.toString(),
            },
        };
    }
}

export default SimulationAudit;
