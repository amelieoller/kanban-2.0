const env = process.env.NODE_ENV;
if (env === 'production') {
	console.log(`API_URL=${process.env.API_URL}`);
} else {
	console.log(`API_URL=http://localhost:8000`);
}
