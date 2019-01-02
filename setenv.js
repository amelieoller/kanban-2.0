const env = process.env.NODE_ENV;
if (env === "production") {
  console.log(`API_URL=${process.env.API_URL}`);
} else {
  console.log(`API_URL=http://127.0.0.1:1337`);
}
