import { Audit } from 'lighthouse';

class SimulationAudit extends Audit {
    static get meta () {
        return {
            id: 'fcp-details',
            title: 'FCP Simulation details',
            description: 'Table shows FCP critical path simulation breakdown.',
            failureTitle: 'FCP Simulation details',
            requiredArtifacts: []
        };
    }

    static async audit (artifacts) {
        // Produce rows for the table. In a real plugin you'd compute values
        // using artifacts (network requests, DOM, etc.). Here we provide
        // a static example.
        const items = [
            { file: 'index.html', size: '12 KB', requests: 4 },
            { file: 'main.js', size: '86 KB', requests: 1 },
            { file: 'styles.css', size: '8 KB', requests: 1 },
        ];


        const headings = [
            { key: 'file', itemType: 'text', text: 'File' },
            { key: 'size', itemType: 'text', text: 'Size' },
            { key: 'requests', itemType: 'numeric', text: 'Requests' },
        ];


        return {
            // Score set to 1 so the audit is 'passing' (you can also return null for no score)
            score: null,
            // `details` controls how the audit is rendered in the report
            details: Audit.makeTableDetails(headings, items)
        };
    }
}

export default SimulationAudit;
