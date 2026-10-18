const base = process.argv[2] || process.env.BASE_URL || "http://localhost:3010";
const queue = ["/", "/shop", "/comfort-finder", "/our-story", "/our-approach", "/faq", "/contact", "/privacy", "/terms", "/cart"];
const checked = new Map();

while (queue.length && checked.size < 100) {
  const path = queue.shift();
  if (!path || checked.has(path)) continue;
  const response = await fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(10_000) });
  checked.set(path, response.status);
  if (response.status >= 400) continue;
  if (!(response.headers.get("content-type") || "").includes("text/html")) continue;
  const html = await response.text();
  for (const match of html.matchAll(/href=["']([^"']+)["']/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/admin") || href.startsWith("/_next") || href === "/favicon.ico" || href.includes("#")) continue;
    const normalized = new URL(href, base).pathname;
    if (!checked.has(normalized) && !queue.includes(normalized)) queue.push(normalized);
  }
}

const failures = [...checked].filter(([, status]) => status >= 400);
for (const [path, status] of checked) console.log(`${status} ${path}`);
if (failures.length) {
  console.error(`Broken internal routes: ${failures.map(([path, status]) => `${path} (${status})`).join(", ")}`);
  process.exit(1);
}
console.log(`Checked ${checked.size} internal routes with no broken responses.`);
