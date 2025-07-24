const fetch = require("node-fetch").default;

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

module.exports = { fetchText };
