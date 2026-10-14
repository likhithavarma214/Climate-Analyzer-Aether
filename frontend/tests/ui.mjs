import assert from "node:assert/strict";
import { readFile, writeFile, unlink } from "node:fs/promises";
import { JSDOM, VirtualConsole } from "jsdom";
const dom = new JSDOM('<!doctype html><div id="root"></div>', {
  url: "http://localhost:8000",
  pretendToBeVisual: true,
  virtualConsole: new VirtualConsole(),
});
const { window } = dom;
for (const key of [
  "window",
  "document",
  "HTMLElement",
  "Element",
  "Image",
  "localStorage",
  "DOMException",
])
  globalThis[key] = key === "window" ? window : window[key];
Object.defineProperty(globalThis, "navigator", {
  value: window.navigator,
  configurable: true,
});
globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window);
globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
window.scrollTo = () => {};
window.matchMedia = () => ({
  matches: false,
  addEventListener() {},
  removeEventListener() {},
});
window.HTMLCanvasElement.prototype.getContext = function (type) {
  return type === "2d"
    ? new Proxy(
        {},
        {
          get: (o, k) => o[k] || (() => {}),
          set: (o, k, v) => ((o[k] = v), true),
        },
      )
    : null;
};
let postCount = 0,
  getCount = 0,
  lastRequest;
const errors = [];
const originalError = console.error;
console.error = (...args) => {
  if (!args.join(" ").includes("Error creating WebGL context"))
    errors.push(args.join(" "));
};
function data() {
  const config = lastRequest;
  return {
    id: "a".repeat(64),
    backendId: "a".repeat(64),
    config,
    source: "Open-Meteo / ERA5",
    threshold: 41.7,
    annual: Array.from({ length: 10 }, (_, i) => ({
      year: 1990 + i,
      events: 2,
      days: 7,
      maxDuration: 4,
      peak: 44,
      coverage: 1,
      valid: true,
      months: [0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0],
    })),
    events: [
      {
        start: "1990-05-01",
        end: "1990-05-04",
        duration: 4,
        peak: 44,
        truncated: false,
      },
    ],
    trend: { slope: 0, r2: 0, n: 10 },
    durationTrend: { slope: 0, r2: 0, n: 10 },
    change: 0,
    comparison: { window: 5, valid: true, first: 2, last: 2 },
    totalEvents: 777,
    totalDays: 70,
    maxDuration: 4,
    coverage: 1,
    baselineCoverage: 1,
    duplicates: 0,
    invalid: 0,
    excludedYears: [],
    rows: [],
    fetchedAt: "2026-10-13T00:00:00Z",
    timezone: "GMT",
    grid: { lat: 28.5, lon: 77.25 },
  };
}
globalThis.fetch = async (url, opts) => {
  if (url === "/api/health")
    return {
      ok: true,
      json: async () => ({ status: "ok", storage: "TinyDB", version: "2.0.0" }),
    };
  if (opts?.method === "POST") {
    postCount++;
    lastRequest = JSON.parse(opts.body);
    return { ok: true, json: async () => ({ id: "a".repeat(64) }) };
  }
  getCount++;
  return { ok: true, json: async () => data() };
};
const source = await readFile(
  new URL("../src/main.js", import.meta.url),
  "utf8",
);
const temp = new URL("../src/__ui_test__.mjs", import.meta.url);
await writeFile(temp, source.replace(/import\s*['"]\.\/style\.css['"];?/, ""));
const tick = () => new Promise((r) => setTimeout(r, 120));
function button(text) {
  const b = [...document.querySelectorAll("button")].find(
    (b) => b.textContent.trim() === text,
  );
  assert.ok(b, "Missing button: " + text);
  return b;
}
try {
  await import(temp.href);
  await tick();
  assert.match(document.body.textContent, /Our planet/);
  assert.ok(
    document.querySelector(".empty-start"),
    "Initial screen must not display synthetic findings",
  );
  button("Explorer").click();
  await tick();
  assert.ok(document.querySelector(".config"));
  const countrySelect = document.querySelector('[aria-label="Country"]');
  const stateSelect = document.querySelector(
    '[aria-label="State or union territory"]',
  );
  const citySelect = document.querySelector('[aria-label="Prominent city"]');
  assert.equal(countrySelect.value, "India");
  assert.equal(stateSelect.value, "Telangana");
  assert.equal(citySelect.value, "Hyderabad");
  assert.equal(stateSelect.options.length, 36, "All states and UTs are listed");
  countrySelect.value = "United Kingdom";
  countrySelect.dispatchEvent(new window.Event("change", { bubbles: true }));
  await tick();
  assert.equal(stateSelect.value, "England");
  assert.equal(citySelect.value, "London");
  countrySelect.value = "India";
  countrySelect.dispatchEvent(new window.Event("change", { bubbles: true }));
  await tick();
  assert.equal(stateSelect.value, "Andhra Pradesh");
  stateSelect.value = "Gujarat";
  stateSelect.dispatchEvent(new window.Event("change", { bubbles: true }));
  await tick();
  assert.equal(citySelect.value, "Ahmedabad", "City list follows its state");
  citySelect.value = "Surat";
  citySelect.dispatchEvent(new window.Event("change", { bubbles: true }));
  await tick();
  button("Run analysis ↗").click();
  await tick();
  await tick();
  assert.equal(postCount, 1);
  assert.deepEqual(
    {
      state: lastRequest.region.state,
      country: lastRequest.region.country,
      city: lastRequest.region.city,
      lat: lastRequest.region.lat,
      lon: lastRequest.region.lon,
    },
    {
      country: "India",
      state: "Gujarat",
      city: "Surat",
      lat: 21.1702,
      lon: 72.8311,
    },
    "Analysis API receives the selected city's metadata and coordinates",
  );
  assert.equal(getCount, 1);
  assert.match(
    document.querySelector(".metrics").textContent,
    /777/,
    "UI must use the Python summary directly",
  );
  button("Days").click();
  await tick();
  assert.match(
    document.querySelector(".chart").parentElement.textContent,
    /Annual days/,
  );
  const rain = [...document.querySelectorAll(".hazard-tabs button")].find((b) =>
    b.textContent.includes("Heavy rainfall"),
  );
  rain.click();
  await tick();
  assert.match(document.body.textContent, /Selection changed/);
  button("Methodology").click();
  await tick();
  assert.match(document.body.textContent, /Good insights start/);
  button("Data & exports").click();
  await tick();
  assert.match(document.body.textContent, /Connected analysis service/);
  assert.match(document.body.textContent, /TinyDB/);
  assert.ok(!document.body.textContent.includes("Download backend kit"));
  button("About").click();
  await tick();
  assert.match(document.body.textContent, /Curiosity, code/);
  assert.equal(errors.length, 0, errors.join("\n"));
  console.log(
    "7 UI smoke checks passed: startup, navigation, API create/read, authoritative results, metric controls, draft state, export/provenance page.",
  );
} finally {
  console.error = originalError;
  await unlink(temp);
  window.close();
}
