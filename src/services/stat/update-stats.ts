import statsData from '../../data/stats.json';

// TODO: Add query params to the request
async function fetchStatsWithQuery(data: Record<string, unknown>) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	return statsData;
}

export default fetchStatsWithQuery;
