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

        type Item = {
            name: string,
            type: string,
            start: number,
            end: number,
            duration: number,
            resource: string,
            size?: number,
            url?: string,
        };

        let maxEnd = 0;

        const items: Item[] = [...estimate.nodeTimings].map(([node, res]) => {
            maxEnd = Math.max(maxEnd, res.endTime);

            if (node.type == 'network') {
                return {
                    name: node.request.url.split('/').slice(-1)[0] || '/',
                    url: node.request.url,
                    type: node.type,
                    resource: node.request.resourceType || 'unknown',
                    size: node.request.transferSize,
                    start: res.startTime,
                    end: res.endTime,
                    duration: res.duration,
                };
            } else {
                return {
                    name: node.event.name,
                    url: node.event.name,
                    resource: 'cpu',
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
                const label = document.createElement('div');

                label.style.position = 'absolute';
                label.style.top = '0';
                label.style.left = '0';
                label.style.bottom = '0';
                label.style.zIndex = '2';
                label.style.color = 'white';
                label.style.fontSize = '11px';
                label.style.lineHeight = 'normal';
                label.innerText = `${item.name}`;

                trace.style.marginLeft = ((item.start / data.max) * 100).toFixed(2) + '%';
                trace.style.width = ((item.duration / data.max) * 100).toFixed(2) + '%';
                trace.style.height = '15px';
                trace.style.backgroundColor = item.type == 'cpu' ? 'yellow' : 'lightseagreen';
                trace.style.border = '1px solid grey';

                row.style.position = 'relative';
                row.setAttribute('title', `[${item.duration.toFixed(0)} ms] ${item.resource}: ${item.url}`);
                row.addEventListener('mouseenter', () => { row.style.background = '#ffffff29' });
                row.addEventListener('mouseleave', () => { row.style.background = '' });
                row.appendChild(trace);
                row.appendChild(label);
                chart.appendChild(row);
            }
            
            const row = document.createElement('div');
            row.style.marginTop = '10px';
            row.style.color = 'white';
            row.style.textAlign = 'center';
            row.style.background = 'darkslateblue';
            row.innerText = `Total: ${data.max.toFixed(0)} ms`;
            chart.appendChild(row);

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
