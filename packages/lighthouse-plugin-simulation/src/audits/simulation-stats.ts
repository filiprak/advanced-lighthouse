import * as LH from 'lighthouse/types/lh.js';
import { Audit } from 'lighthouse';

class SimulationAudit extends Audit {
    static get meta() {
        return {
            id: 'fcp-details',
            title: 'FCP Simulation details',
            description: 'Table shows FCP critical path simulation breakdown.',
            failureTitle: 'FCP Simulation details',
            requiredArtifacts: []
        };
    }

    static async audit(artifacts: LH.Artifacts): Promise<LH.Audit.NonNumericProduct> {
        // Produce rows for the table. In a real plugin you'd compute values
        // using artifacts (network requests, DOM, etc.). Here we provide
        // a static example.
        const items: LH.Audit.Details.Table["items"] = [
            { file: 'index.html', size: '12 KB', requests: 4 },
            { file: 'main.js', size: '86 KB', requests: 1 },
            { file: 'styles.css', size: '8 KB', requests: 1 },
        ];


        const headings: LH.Audit.Details.Table["headings"] = [
            { key: 'file', valueType: 'text', label: 'File' },
            { key: 'size', valueType: 'text', label: 'Size' },
            { key: 'requests', valueType: 'numeric', label: 'Requests' },
        ];


        return {
            // Score set to 1 so the audit is 'passing' (you can also return null for no score)
            score: null,
            scoreDisplayMode: 'informative',
            // `details` controls how the audit is rendered in the report
            details: Audit.makeTableDetails(headings, items)
        };
    }
}

export default SimulationAudit;
