// All functions are now in the global scope, loaded via <script> tags.

const CHART_DEFAULTS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: 'var(--text-secondary)'
            }
        },
    },
    scales: {
        x: {
            grid: { color: 'var(--glass)' },
            ticks: { color: 'var(--text-secondary)' }
        },
        y: {
            grid: { color: 'var(--glass)' },
            ticks: { color: 'var(--text-secondary)' }
        }
    }
};

function renderKpiTiles(kpiData) {
    const container = document.getElementById('kpi-grid');
    if (!container) return;
    const kpisHtml = kpiData.kpis.map(kpi => `
        <div class="kpi-tile">
            <h4>${kpi.title}</h4>
            <p class="value">${kpi.value}</p>
            <p class="trend">${kpi.trend}</p>
        </div>
    `).join('');
    container.innerHTML = kpisHtml;
}

function renderTimeseriesChart(chartData) {
    const ctx = document.getElementById('timeseries-chart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.data.map(d => d.date),
            datasets: [{
                label: chartData.title,
                data: chartData.data.map(d => d.value),
                borderColor: 'var(--accent-cyan)',
                backgroundColor: 'rgba(0, 229, 255, 0.1)',
                fill: true,
                tension: 0.4,
            }]
        },
        options: { ...CHART_DEFAULTS, plugins: { legend: { display: false } } }
    });
}

function renderBarChart(chartData) {
    const ctx = document.getElementById('bar-chart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.labels,
            datasets: chartData.datasets.map(ds => ({
                ...ds,
                backgroundColor: ds.backgroundColor.replace('0.6', '0.8') // Make colors more vibrant
            }))
        },
        options: { ...CHART_DEFAULTS, scales: { x: { ...CHART_DEFAULTS.scales.x, stacked: true }, y: { ...CHART_DEFAULTS.scales.y, stacked: true } } }
    });
}

function renderFunnelChart(chartData) {
    const ctx = document.getElementById('funnel-chart');
    if (!ctx) return;

    // A simple funnel chart can be represented by a horizontal bar chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.data.map(d => d.stage),
            datasets: [{
                label: 'Value',
                data: chartData.data.map(d => d.value),
                backgroundColor: [
                    'rgba(0, 229, 255, 0.8)',
                    'rgba(0, 229, 255, 0.7)',
                    'rgba(0, 229, 255, 0.6)',
                    'rgba(0, 229, 255, 0.5)',
                    'rgba(0, 229, 255, 0.4)',
                ],
            }]
        },
        options: {
            ...CHART_DEFAULTS,
            indexAxis: 'y', // This makes the bar chart horizontal
            plugins: { legend: { display: false } }
        }
    });
}

async function initDataLabPage() {
    populateHeader();
    initBaseEventListeners();

    try {
        const [siteConfigRes, kpiRes, timeseriesRes, segmentsRes, funnelRes] = await Promise.all([
            fetch('/data/site-config.json').then(res => res.json()),
            fetch('/data/graphs/kpis.json').then(res => res.json()),
            fetch('/data/graphs/timeseries.json').then(res => res.json()),
            fetch('/data/graphs/segments.json').then(res => res.json()),
            fetch('/data/graphs/funnel.json').then(res => res.json())
        ]);

        populateFooter(siteConfigRes.site);
        renderKpiTiles(kpiRes);
        renderTimeseriesChart(timeseriesRes);
        renderBarChart(segmentsRes);
        renderFunnelChart(funnelRes);

    } catch (error) {
        console.error("Failed to load data for Data Lab:", error);
    }
}

document.addEventListener('DOMContentLoaded', initDataLabPage);
