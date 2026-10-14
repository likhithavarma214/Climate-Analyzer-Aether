const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || ""
).replace(/\/$/, "");

const apiUrl = (path) => `${API_BASE_URL}${path}`;
import React from "react";
import * as ReactDOM from "react-dom/client";
import htm from "htm";
import * as THREE from "three";
import "./style.css";
const EARTH_TEXTURE = "/assets/earth.jpg";
/* TERRA analysis engine. Baseline is fixed; synthetic data is never presented as observed. */
const DAY = 86400000;
const HAZARDS = {
  heat: {
    name: "Heatwaves",
    singular: "heatwave",
    color: "#ff895d",
    rgb: "255,137,93",
    icon: "☀",
    unit: "°C",
    definition:
      "3+ consecutive days above the baseline 95th percentile of daily maximum temperature.",
  },
  rain: {
    name: "Heavy rainfall",
    singular: "heavy-rain event",
    color: "#74c7ff",
    rgb: "116,199,255",
    icon: "☂",
    unit: "mm",
    definition:
      "Consecutive days above the baseline wet-day 95th percentile of daily precipitation.",
  },
  dry: {
    name: "Dry spells",
    singular: "dry spell",
    color: "#ddc986",
    rgb: "221,201,134",
    icon: "◌",
    unit: "days",
    definition:
      "14+ consecutive days with daily precipitation below 1 mm. A drought proxy, not a drought diagnosis.",
  },
};
const INDIA_STATES = [
  {
    name: "Andhra Pradesh",
    cities: [
      ["Visakhapatnam", 17.6868, 83.2185],
      ["Vijayawada", 16.5062, 80.648],
      ["Tirupati", 13.6288, 79.4192],
      ["Kurnool", 15.8281, 78.0373],
    ],
  },
  {
    name: "Arunachal Pradesh",
    cities: [
      ["Itanagar", 27.0844, 93.6053],
      ["Tawang", 27.5861, 91.8594],
      ["Pasighat", 28.0662, 95.3267],
    ],
  },
  {
    name: "Assam",
    cities: [
      ["Guwahati", 26.1445, 91.7362],
      ["Dibrugarh", 27.4728, 94.912],
      ["Silchar", 24.8333, 92.7789],
      ["Jorhat", 26.75, 94.2167],
    ],
  },
  {
    name: "Bihar",
    cities: [
      ["Patna", 25.5941, 85.1376],
      ["Gaya", 24.7955, 84.9994],
      ["Muzaffarpur", 26.1209, 85.3647],
      ["Bhagalpur", 25.2425, 86.9842],
    ],
  },
  {
    name: "Chhattisgarh",
    cities: [
      ["Raipur", 21.2514, 81.6296],
      ["Bilaspur", 22.0797, 82.1409],
      ["Jagdalpur", 19.0748, 82.008],
    ],
  },
  {
    name: "Goa",
    cities: [
      ["Panaji", 15.4909, 73.8278],
      ["Margao", 15.2832, 73.9862],
      ["Vasco da Gama", 15.386, 73.844],
    ],
  },
  {
    name: "Gujarat",
    cities: [
      ["Ahmedabad", 23.0225, 72.5714],
      ["Surat", 21.1702, 72.8311],
      ["Vadodara", 22.3072, 73.1812],
      ["Rajkot", 22.3039, 70.8022],
    ],
  },
  {
    name: "Haryana",
    cities: [
      ["Gurugram", 28.4595, 77.0266],
      ["Faridabad", 28.4089, 77.3178],
      ["Hisar", 29.1492, 75.7217],
      ["Ambala", 30.3782, 76.7767],
    ],
  },
  {
    name: "Himachal Pradesh",
    cities: [
      ["Shimla", 31.1048, 77.1734],
      ["Dharamshala", 32.219, 76.3234],
      ["Manali", 32.2396, 77.1887],
      ["Mandi", 31.708, 76.932],
    ],
  },
  {
    name: "Jharkhand",
    cities: [
      ["Ranchi", 23.3441, 85.3096],
      ["Jamshedpur", 22.8046, 86.2029],
      ["Dhanbad", 23.7957, 86.4304],
      ["Deoghar", 24.485, 86.6947],
    ],
  },
  {
    name: "Karnataka",
    cities: [
      ["Bengaluru", 12.9716, 77.5946],
      ["Mysuru", 12.2958, 76.6394],
      ["Mangaluru", 12.9141, 74.856],
      ["Hubballi", 15.3647, 75.124],
    ],
  },
  {
    name: "Kerala",
    cities: [
      ["Thiruvananthapuram", 8.5241, 76.9366],
      ["Kochi", 9.9312, 76.2673],
      ["Kozhikode", 11.2588, 75.7804],
      ["Thrissur", 10.5276, 76.2144],
    ],
  },
  {
    name: "Madhya Pradesh",
    cities: [
      ["Bhopal", 23.2599, 77.4126],
      ["Indore", 22.7196, 75.8577],
      ["Gwalior", 26.2183, 78.1828],
      ["Jabalpur", 23.1815, 79.9864],
    ],
  },
  {
    name: "Maharashtra",
    cities: [
      ["Mumbai", 19.076, 72.8777],
      ["Pune", 18.5204, 73.8567],
      ["Nagpur", 21.1458, 79.0882],
      ["Nashik", 19.9975, 73.7898],
    ],
  },
  {
    name: "Manipur",
    cities: [
      ["Imphal", 24.817, 93.9368],
      ["Churachandpur", 24.3333, 93.6833],
      ["Thoubal", 24.638, 94.0106],
    ],
  },
  {
    name: "Meghalaya",
    cities: [
      ["Shillong", 25.5788, 91.8933],
      ["Tura", 25.5142, 90.2022],
      ["Jowai", 25.45, 92.2],
    ],
  },
  {
    name: "Mizoram",
    cities: [
      ["Aizawl", 23.7271, 92.7176],
      ["Lunglei", 22.887, 92.733],
      ["Champhai", 23.474, 93.325],
    ],
  },
  {
    name: "Nagaland",
    cities: [
      ["Kohima", 25.6751, 94.1086],
      ["Dimapur", 25.8629, 93.7537],
      ["Mokokchung", 26.322, 94.517],
    ],
  },
  {
    name: "Odisha",
    cities: [
      ["Bhubaneswar", 20.2961, 85.8245],
      ["Cuttack", 20.4625, 85.883],
      ["Rourkela", 22.2604, 84.8536],
      ["Sambalpur", 21.4669, 83.9812],
    ],
  },
  {
    name: "Punjab",
    cities: [
      ["Ludhiana", 30.901, 75.8573],
      ["Amritsar", 31.634, 74.8723],
      ["Jalandhar", 31.326, 75.576],
      ["Patiala", 30.3398, 76.3869],
    ],
  },
  {
    name: "Rajasthan",
    cities: [
      ["Jaipur", 26.9124, 75.7873],
      ["Jodhpur", 26.2389, 73.0243],
      ["Udaipur", 24.5854, 73.7125],
      ["Kota", 25.2138, 75.8648],
    ],
  },
  {
    name: "Sikkim",
    cities: [
      ["Gangtok", 27.3389, 88.6065],
      ["Namchi", 27.1667, 88.3667],
      ["Gyalshing", 27.289, 88.265],
    ],
  },
  {
    name: "Tamil Nadu",
    cities: [
      ["Chennai", 13.0827, 80.2707],
      ["Coimbatore", 11.0168, 76.9558],
      ["Madurai", 9.9252, 78.1198],
      ["Tiruchirappalli", 10.7905, 78.7047],
    ],
  },
  {
    name: "Telangana",
    cities: [
      ["Hyderabad", 17.3616667, 78.4747222],
      ["Warangal", 17.9689, 79.5941],
      ["Nizamabad", 18.6725, 78.0941],
      ["Khammam", 17.2473, 80.1514],
    ],
  },
  {
    name: "Tripura",
    cities: [
      ["Agartala", 23.8315, 91.2868],
      ["Udaipur", 23.533, 91.483],
      ["Dharmanagar", 24.3667, 92.1667],
    ],
  },
  {
    name: "Uttar Pradesh",
    cities: [
      ["Lucknow", 26.8467, 80.9462],
      ["Kanpur", 26.4499, 80.3319],
      ["Varanasi", 25.3176, 82.9739],
      ["Agra", 27.1767, 78.0081],
      ["Prayagraj", 25.4358, 81.8463],
    ],
  },
  {
    name: "Uttarakhand",
    cities: [
      ["Dehradun", 30.3165, 78.0322],
      ["Haridwar", 29.9457, 78.1642],
      ["Haldwani", 29.2183, 79.513],
      ["Nainital", 29.3919, 79.4542],
    ],
  },
  {
    name: "West Bengal",
    cities: [
      ["Kolkata", 22.5726, 88.3639],
      ["Siliguri", 26.7271, 88.3953],
      ["Asansol", 23.6739, 86.9524],
      ["Darjeeling", 27.036, 88.2627],
    ],
  },
  {
    name: "Andaman and Nicobar Islands",
    cities: [
      ["Port Blair (Sri Vijaya Puram)", 11.6234, 92.7265],
      ["Diglipur", 13.25, 92.97],
    ],
  },
  {
    name: "Chandigarh",
    cities: [["Chandigarh", 30.7333, 76.7794]],
  },
  {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    cities: [
      ["Silvassa", 20.2763, 73.0083],
      ["Daman", 20.3974, 72.8328],
      ["Diu", 20.7144, 70.9874],
    ],
  },
  {
    name: "Delhi",
    cities: [
      ["New Delhi", 28.6139, 77.209],
      ["Delhi", 28.6667, 77.2167],
    ],
  },
  {
    name: "Jammu and Kashmir",
    cities: [
      ["Srinagar", 34.0837, 74.7973],
      ["Jammu", 32.7266, 74.857],
      ["Anantnag", 33.7311, 75.1487],
    ],
  },
  {
    name: "Ladakh",
    cities: [
      ["Leh", 34.1526, 77.5771],
      ["Kargil", 34.5539, 76.1349],
    ],
  },
  {
    name: "Lakshadweep",
    cities: [
      ["Kavaratti", 10.5667, 72.6417],
      ["Agatti", 10.85, 72.1833],
    ],
  },
  {
    name: "Puducherry",
    cities: [
      ["Puducherry", 11.9416, 79.8083],
      ["Karaikal", 10.9254, 79.838],
      ["Mahe", 11.7, 75.533],
      ["Yanam", 16.7333, 82.2167],
    ],
  },
];
const REGIONS = INDIA_STATES.flatMap(({ name: state, cities }) =>
  cities.map(([city, lat, lon]) => ({
    country: "India",
    state,
    city,
    name: `${city}, ${state}, India`,
    lat,
    lon,
  })),
);
const INTERNATIONAL_AREAS = [
  {
    country: "United Kingdom",
    state: "England",
    cities: [["London", 51.5072, -0.1276]],
  },
  {
    country: "United States",
    state: "Arizona",
    cities: [["Phoenix", 33.4484, -112.074]],
  },
  {
    country: "Australia",
    state: "New South Wales",
    cities: [["Sydney", -33.8688, 151.2093]],
  },
  {
    country: "Kenya",
    state: "Nairobi County",
    cities: [["Nairobi", -1.2921, 36.8219]],
  },
];
for (const { country, state, cities } of INTERNATIONAL_AREAS) {
  for (const [city, lat, lon] of cities) {
    REGIONS.push({
      country,
      state,
      city,
      name: `${city}, ${state}, ${country}`,
      lat,
      lon,
    });
  }
}
const COUNTRIES = [...new Set(REGIONS.map((region) => region.country))];
const DEFAULT_REGION = REGIONS.find(
  (region) => region.state === "Telangana" && region.city === "Hyderabad",
);
function regionForLocation(region) {
  return (
    REGIONS.find(
      (candidate) =>
        candidate.country === region.country &&
        candidate.state === region.state &&
        candidate.city === region.city,
    ) ||
    REGIONS.find(
      (candidate) =>
        candidate.lat === region.lat && candidate.lon === region.lon,
    ) ||
    REGIONS.find((candidate) => candidate.name === region.name) ||
    REGIONS.find((candidate) => `${candidate.city}, India` === region.name)
  );
}
function regionsInState(state, country) {
return REGIONS.filter(
  (region) => region.state === state && region.country === country,
);
}
function regionsInCountry(country) {
  return REGIONS.filter((region) => region.country === country);
}
function statesInCountry(country) {
  return [
    ...new Set(
      regionsInCountry(country).map((region) => region.state),
    ),
  ];
}
function quantile(values, p) {
  const a = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!a.length) return null;
  const i = (a.length - 1) * p,
    lo = Math.floor(i);
  return a[lo] + (a[Math.ceil(i)] - a[lo]) * (i - lo);
}
function regression(rows, key = "events") {
  const a = rows.filter((r) => r.valid && Number.isFinite(r[key]));
  if (a.length < 3) return { slope: null, r2: null, n: a.length };
  const mx = a.reduce((s, r) => s + r.year, 0) / a.length,
    my = a.reduce((s, r) => s + r[key], 0) / a.length;
  let xy = 0,
    xx = 0,
    yy = 0;
  a.forEach((r) => {
    xy += (r.year - mx) * (r[key] - my);
    xx += (r.year - mx) ** 2;
    yy += (r[key] - my) ** 2;
  });
  const slope = xy / xx;
  return {
    slope,
    intercept: my - slope * mx,
    r2: yy ? (xy * xy) / (xx * yy) : 0,
    n: a.length,
  };
}
function synthetic(region, end, start = 1961) {
  let seed =
    (Math.round((region.lat + 90) * 1000) ^
      Math.round((region.lon + 180) * 10000)) >>>
    0;
  const rnd = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const rows = [];
  let anomaly = 0,
    wet = false;
  const abs = Math.abs(region.lat),
    base = 32 - abs * 0.33,
    amp = 3 + abs * 0.17;
  for (
    let t = Date.UTC(Math.min(1961, start), 0, 1);
    t <= Date.UTC(Math.max(1990, end), 11, 31);
    t += DAY
  ) {
    const d = new Date(t),
      year = d.getUTCFullYear(),
      season =
        Math.cos(
          (2 * Math.PI * ((t - Date.UTC(year, 0, 1)) / DAY - 172)) / 365.25,
        ) * (region.lat >= 0 ? 1 : -1);
    anomaly = anomaly * 0.85 + (rnd() - 0.46) * 3.4;
    wet = rnd() < (wet ? 0.53 : 0.17);
    let temp = base + amp * season + (year - 1961) * 0.034 + anomaly;
    let rain = wet
      ? Math.pow(rnd(), 2) * 55 * (1 + 0.25 * season)
      : rnd() * 0.6;
    const missing = rnd() < 0.002;
    rows.push({
      date: d.toISOString().slice(0, 10),
      t: missing ? null : +temp.toFixed(2),
      p: missing ? null : +rain.toFixed(2),
    });
  }
  return rows;
}
function cleanDaily(input, end, start = 1961) {
  const map = new Map();
  let duplicates = 0,
    invalid = 0;
  for (const r of input) {
    if (
      !r ||
      typeof r.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(r.date) ||
      !Number.isFinite(Date.parse(r.date)) ||
      new Date(r.date).toISOString().slice(0, 10) !== r.date
    ) {
      invalid++;
      continue;
    }
    if (map.has(r.date)) duplicates++;
    const t =
        typeof r.t === "number" &&
        Number.isFinite(r.t) &&
        r.t >= -90 &&
        r.t <= 65
          ? r.t
          : null,
      p =
        typeof r.p === "number" &&
        Number.isFinite(r.p) &&
        r.p >= 0 &&
        r.p <= 3000
          ? r.p
          : null;
    map.set(r.date, { date: r.date, t, p });
  }
  const rows = [];
  for (
    let ts = Date.UTC(Math.min(1961, start), 0, 1);
    ts <= Date.UTC(Math.max(1990, end), 11, 31);
    ts += DAY
  ) {
    let date = new Date(ts).toISOString().slice(0, 10);
    rows.push(map.get(date) || { date, t: null, p: null });
  }
  return { rows, duplicates, invalid };
}
function analyze(input, config) {
  const { rows, duplicates, invalid } = cleanDaily(
      input,
      config.end,
      config.start,
    ),
    key = config.hazard === "heat" ? "t" : "p";
  const baseline = rows.filter(
      (r) => r.date >= "1961-01-01" && r.date < "1991-01-01",
    ),
    base = baseline.map((r) => r[key]).filter(Number.isFinite);
  if (base.length / baseline.length < 0.9)
    throw Error(
      "Baseline coverage is below 90%. Supply daily data for 1961–1990.",
    );
  const wet = base.filter((x) => x >= 1);
  if (config.hazard === "rain" && wet.length < 30)
    throw Error(
      "Too few wet days in the baseline to estimate a rainfall percentile.",
    );
  const threshold =
      config.hazard === "dry"
        ? 1
        : quantile(config.hazard === "rain" ? wet : base, 0.95),
    min = config.hazard === "heat" ? 3 : config.hazard === "dry" ? 14 : 1;
  const annual = [];
  for (let year = config.start; year <= config.end; year++)
    annual.push({
      year,
      events: 0,
      days: 0,
      maxDuration: 0,
      peak: null,
      observed: 0,
      total: (Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)) / DAY,
      months: Array(12).fill(0),
    });
  const byYear = new Map(annual.map((r) => [r.year, r])),
    events = [];
  let run = [];
  function flush() {
    if (run.length >= min) {
      const startYear = +run[0].date.slice(0, 4);
      const selected = run.filter((r) => byYear.has(+r.date.slice(0, 4)));
      if (selected.length) {
        const ev = {
          start: run[0].date,
          end: run[run.length - 1].date,
          duration: run.length,
          peak:
            config.hazard === "dry"
              ? run.length
              : Math.max(...run.map((r) => r[key])),
          truncated: run[run.length - 1].date === config.end + "-12-31",
        };
        events.push(ev);
        if (byYear.has(startYear)) byYear.get(startYear).events++;
        for (const r of selected) {
          const a = byYear.get(+r.date.slice(0, 4));
          a.days++;
          a.months[+r.date.slice(5, 7) - 1]++;
          a.maxDuration = Math.max(a.maxDuration, run.length);
          a.peak = Math.max(a.peak ?? -Infinity, ev.peak);
        }
      }
    }
    run = [];
  }
  for (const r of rows) {
    if (r.date > config.end + "-12-31") break;
    const a = byYear.get(+r.date.slice(0, 4)),
      val = r[key];
    if (a && Number.isFinite(val)) a.observed++;
    const hit =
      Number.isFinite(val) &&
      (config.hazard === "dry" ? val < threshold : val > threshold);
    if (hit) run.push(r);
    else flush();
  }
  flush();
  annual.forEach((a) => {
    a.coverage = a.observed / a.total;
    a.valid = a.coverage >= 0.9;
  });
  const trend = regression(annual),
    durationTrend = regression(annual, "maxDuration");
  const good = annual.filter((a) => a.valid);
  const window = 5,
    first = annual.slice(0, window),
    last = annual.slice(-window);
  const mean = (a) => a.reduce((s, r) => s + r.events, 0) / a.length;
  const comparisonValid =
    annual.length >= 10 &&
    first.every((a) => a.valid) &&
    last.every((a) => a.valid);
  const f = comparisonValid ? mean(first) : null,
    l = comparisonValid ? mean(last) : null,
    change = f > 0 ? ((l - f) / f) * 100 : null;
  return {
    config,
    threshold,
    annual,
    events: events.reverse(),
    trend,
    durationTrend,
    change,
    comparison: { window, first: f, last: l, valid: comparisonValid },
    totalEvents: good.reduce((s, a) => s + a.events, 0),
    totalDays: good.reduce((s, a) => s + a.days, 0),
    maxDuration: Math.max(0, ...good.map((a) => a.maxDuration)),
    coverage:
      annual.reduce((s, a) => s + a.observed, 0) /
      annual.reduce((s, a) => s + a.total, 0),
    baselineCoverage: base.length / baseline.length,
    duplicates,
    invalid,
    excludedYears: annual.filter((a) => !a.valid).map((a) => a.year),
    rows,
  };
}
async function cacheDb() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(Error("Storage unavailable"));
      return;
    }
    const req = indexedDB.open("aether-climate-v2", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("records");
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function cacheGet(key) {
  try {
    const db = await cacheDb();
    return await new Promise((resolve) => {
      const q = db.transaction("records").objectStore("records").get(key);
      q.onsuccess = () => {
        db.close();
        resolve(q.result);
      };
      q.onerror = () => {
        db.close();
        resolve(null);
      };
    });
  } catch {
    return null;
  }
}
async function cachePut(key, value) {
  try {
    const db = await cacheDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction("records", "readwrite");
      tx.objectStore("records").put(value, key);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
    db.close();
    return true;
  } catch {
    return false;
  }
}

const { useState, useEffect, useRef, useMemo } = React;
const html = htm.bind(React.createElement);
const LAST_YEAR = new Date().getUTCFullYear() - 1;
const INITIAL = {
  region: DEFAULT_REGION,
  hazard: "heat",
  start: 1990,
  end: LAST_YEAR,
  mode: "backend",
};
const fmt = (v, d = 1) =>
  v == null || !Number.isFinite(v)
    ? "—"
    : Number(v).toLocaleString("en-US", {
        maximumFractionDigits: d,
        minimumFractionDigits: d,
      });
const pct = (v) => fmt(v * 100, 1) + "%";
function download(name, content, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([content], { type })),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
function csvCell(x) {
  return '"' + String(x ?? "").replaceAll('"', '""') + '"';
}
function toCSV(rows) {
  return "\ufeff" + rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
}
function resultSummary(r) {
  const { rows, ...rest } = r;
  return rest;
}
function Globe({ motion }) {
  const el = useRef(),
    settings = useRef({ motion });
  useEffect(() => {
    settings.current = { motion };
  }, [motion]);
  useEffect(() => {
    const host = el.current;
    let renderer, frame, resize;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setClearColor(0, 0);
      host.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");
      const scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0.1, 4.25);
      const globe = new THREE.Group();
      scene.add(globe);
      const tex = new THREE.TextureLoader().load(EARTH_TEXTURE);
      tex.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshPhongMaterial({
        map: tex,
        color: 0xa4b8b4,
        shininess: 8,
        specular: 0x4a666a,
      });
      const earth = new THREE.Mesh(
        new THREE.SphereGeometry(1, 72, 48),
        material,
      );
      globe.add(earth);
      scene.add(new THREE.AmbientLight(0x9aaebb, 0.36));
      const sun = new THREE.DirectionalLight(0xe6efd7, 2.5);
      sun.position.set(-3, 2.5, 3);
      scene.add(sun);
      const fill = new THREE.DirectionalLight(0x43747a, 0.5);
      fill.position.set(3, -2, 1);
      scene.add(fill);
      const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.025, 64, 48),
        new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          uniforms: { glow: { value: new THREE.Color("#6b9ca0") } },
          vertexShader:
            "varying vec3 n; varying vec3 v; void main(){ vec4 p=modelViewMatrix*vec4(position,1.0); n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}",
          fragmentShader:
            "uniform vec3 glow;varying vec3 n;varying vec3 v;void main(){float i=pow(1.0-abs(dot(n,v)),3.0);gl_FragColor=vec4(glow,i*.52);}",
        }),
      );
      globe.add(atmosphere);
      for (let i = 0; i < 3; i++) {
        const pts = [];
        for (let n = 0; n <= 160; n++) {
          let a = (n / 160) * Math.PI * 2;
          pts.push(
            new THREE.Vector3(
              Math.cos(a) * (1.22 + i * 0.12),
              Math.sin(a) * (1.22 + i * 0.12),
              0,
            ),
          );
        }
        const line = new THREE.LineLoop(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({
            color: i === 0 ? 0x667e6f : 0x38505a,
            transparent: true,
            opacity: i === 0 ? 0.38 : 0.2,
          }),
        );
        line.rotation.x = 1 + i * 0.3;
        line.rotation.y = 0.25 + i * 0.4;
        scene.add(line);
      }
      let visible = true;
      const visibility = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
      });
      visibility.observe(host);
      let drag = false,
        px = 0,
        py = 0,
        rot = 0.08,
        tilt = 0.08,
        last = 0,
        scroll = window.scrollY;
      const down = (e) => {
          drag = true;
          px = e.clientX;
          py = e.clientY;
          host.setPointerCapture(e.pointerId);
        },
        move = (e) => {
          if (drag) {
            rot += (e.clientX - px) * 0.005;
            tilt = Math.max(
              -0.7,
              Math.min(0.7, tilt + (e.clientY - py) * 0.003),
            );
            px = e.clientX;
            py = e.clientY;
          }
        },
        up = () => (drag = false),
        onScroll = () => (scroll = window.scrollY);
      host.addEventListener("pointerdown", down);
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerup", up);
      host.addEventListener("pointercancel", up);
      window.addEventListener("scroll", onScroll, { passive: true });
      resize = new ResizeObserver(() => {
        const w = host.clientWidth,
          h = host.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      resize.observe(host);
      function tick(t) {
        frame = requestAnimationFrame(tick);
        if (document.hidden || !visible) return;
        const s = settings.current,
          dt = Math.min((t - last) / 1000, 0.04);
        last = t;
        if (s.motion && !drag) rot += dt * 0.105;
        const target = rot + (s.motion ? scroll * 0.0006 : 0);
        globe.rotation.y += (target - globe.rotation.y) * 0.065;
        globe.rotation.x +=
          (tilt +
            (s.motion ? Math.sin(t * 0.00018) * 0.025 : 0) -
            globe.rotation.x) *
          0.065;
        renderer.render(scene, camera);
      }
      frame = requestAnimationFrame(tick);
      return () => {
        cancelAnimationFrame(frame);
        resize.disconnect();
        visibility.disconnect();
        window.removeEventListener("scroll", onScroll);
        host.removeEventListener("pointerdown", down);
        host.removeEventListener("pointermove", move);
        host.removeEventListener("pointerup", up);
        host.removeEventListener("pointercancel", up);
        scene.traverse((o) => {
          o.geometry?.dispose();
          if (o.material) o.material.dispose();
        });
        tex.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    } catch {
      host.style.backgroundImage = `url(${EARTH_TEXTURE})`;
      host.classList.add("globe-fallback");
      return () => {
        if (frame) cancelAnimationFrame(frame);
        renderer?.dispose();
      };
    }
  }, []);
  return html`<div
    className="globe-wrap"
    ref=${el}
    role="img"
    aria-label="Automatically rotating three-dimensional Earth. No interaction is needed. Dragging is optional. Geographic selection is available in the map below."
  />`;
}
function RegionMap({ region, onSelect, hazard }) {
  const canvas = useRef(),
    imageRef = useRef();
  const [lat, setLat] = useState(region.lat),
    [lon, setLon] = useState(region.lon),
    [error, setError] = useState("");
  useEffect(() => {
    setLat(region.lat);
    setLon(region.lon);
  }, [region]);
  useEffect(() => {
    let active = true;
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      if (active) draw();
    };
    img.src = EARTH_TEXTURE;
    const c = canvas.current;
    function draw() {
      const w = 800,
        h = 400;
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#0a1219";
      ctx.fillRect(0, 0, w, h);
      if (imageRef.current) {
        ctx.globalAlpha = 0.48;
        ctx.drawImage(imageRef.current, 0, 0, w, h);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#07131e66";
        ctx.fillRect(0, 0, w, h);
      }
      ctx.strokeStyle = "#738e9728";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += w / 12) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += h / 6) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      let x = ((region.lon + 180) / 360) * w,
        y = ((90 - region.lat) / 180) * h;
      ctx.strokeStyle = HAZARDS[hazard].color;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = HAZARDS[hazard].color;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = "#e3ecd75a";
      ctx.beginPath();
      ctx.moveTo(x - 25, y);
      ctx.lineTo(x + 25, y);
      ctx.moveTo(x, y - 25);
      ctx.lineTo(x, y + 25);
      ctx.stroke();
    }
    draw();
    return () => (active = false);
  }, [region, hazard]);
  function apply() {
    const a = Number(lat),
      b = Number(lon);
    if (
      String(lat).trim() === "" ||
      String(lon).trim() === "" ||
      !Number.isFinite(a) ||
      !Number.isFinite(b) ||
      Math.abs(a) > 90 ||
      Math.abs(b) > 180
    ) {
      setError("Use latitude −90 to 90 and longitude −180 to 180.");
      return;
    }
    setError("");
    onSelect({
      name: "Custom location",
      lat: +a.toFixed(4),
      lon: +b.toFixed(4),
    });
  }
  function click(e) {
    const box = canvas.current.getBoundingClientRect();
    onSelect({
      name: "Custom location",
      lat: Math.max(
        -90,
        Math.min(
          90,
          +(90 - ((e.clientY - box.top) / box.height) * 180).toFixed(4),
        ),
      ),
      lon: Math.max(
        -180,
        Math.min(
          180,
          +(((e.clientX - box.left) / box.width) * 360 - 180).toFixed(4),
        ),
      ),
    });
  }
  return html`<div>
    <canvas
      ref=${canvas}
      className="mapcanvas"
      onClick=${click}
      aria-label="World map. Click to choose coordinates, or use the latitude and longitude fields below."
      role="img"
    />
    <div className="map-caption">
      <span>POINT SELECTION · EQUIRECTANGULAR</span
      ><span>Click anywhere ↗</span>
    </div>
    <div className="coords">
      <label
        >Latitude<input
          aria-label="Latitude"
          type="number"
          min="-90"
          max="90"
          step="0.0001"
          value=${lat}
          onChange=${(e) => setLat(e.target.value)} /></label
      ><label
        >Longitude<input
          aria-label="Longitude"
          type="number"
          min="-180"
          max="180"
          step="0.0001"
          value=${lon}
          onChange=${(e) => setLon(e.target.value)} /></label
      ><button className="secondary" onClick=${apply}>Set ↗</button>
    </div>
    ${error && html`<p className="help" role="alert">${error}</p>`}
    <p className="help">
      Selects one reanalysis grid cell near this coordinate. Not a regional area
      average. Globe colour and rings are illustrative, not a hazard map.
    </p>
  </div>`;
}
function TrendChart({ result, metric, setMetric, onYear }) {
  const [hover, setHover] = useState(null);
  useEffect(() => setHover(null), [result, metric]);
  const rows = result.annual,
    key =
      metric === "frequency"
        ? "events"
        : metric === "duration"
          ? "maxDuration"
          : "days",
    unit = metric === "frequency" ? "events" : "days",
    reg = regression(rows, key),
    w = 680,
    h = 250,
    left = 42,
    top = 18,
    bottom = 30,
    iw = w - left - 12,
    ih = h - top - bottom,
    max = Math.max(2, ...rows.filter((a) => a.valid).map((a) => a[key])) * 1.2;
  const x = (i) => left + ((i + 0.5) / rows.length) * iw,
    y = (v) => top + ih - (v / max) * ih;
  const rolling = rows.map((r, i) => {
    const a = rows.slice(Math.max(0, i - 4), i + 1);
    return a.length === 5 && a.every((x) => x.valid)
      ? a.reduce((s, z) => s + z[key], 0) / 5
      : null;
  });
  let path = "",
    open = false;
  rolling.forEach((v, i) => {
    if (v == null) {
      open = false;
      return;
    }
    path += `${open ? "L" : "M"}${x(i)},${y(v)} `;
    open = true;
  });
  return html`<div className="panel panel-pad">
    <div className="panelhead">
      <div>
        <h3>Signals over time</h3>
        <p>Annual ${metric} · ${unit} · click a year to inspect</p>
      </div>
      <div className="seg" aria-label="Chart metric">
        ${[
          ["frequency", "Events"],
          ["duration", "Duration"],
          ["days", "Days"],
        ].map(
          ([v, n]) =>
            html`<button
              key=${v}
              className=${metric === v ? "on" : ""}
              onClick=${() => setMetric(v)}
              aria-pressed=${metric === v}
            >
              ${n}
            </button>`,
        )}
      </div>
    </div>
    <div className="chart">
      <svg
        viewBox=${`0 0 ${w} ${h}`}
        role="img"
        aria-label=${`Annual ${metric} from ${result.config.start} through ${result.config.end}. Full values available in annual CSV export.`}
      >
        ${[0, 1, 2, 3, 4].map(
          (i) =>
            html`<g key=${i}
              ><line
                x1=${left}
                x2=${w}
                y1=${y((max * i) / 4)}
                y2=${y((max * i) / 4)}
                stroke="#26323b"
                strokeDasharray="2 5"
              /><text x="1" y=${y((max * i) / 4) + 4}
                >${fmt((max * i) / 4, 0)}</text
              ></g
            >`,
        )}${rows.map(
          (r, i) =>
            html`<g
              key=${r.year}
              onMouseEnter=${() => setHover(i)}
              onMouseLeave=${() => setHover(null)}
              onFocus=${() => setHover(i)}
              onBlur=${() => setHover(null)}
              onClick=${() => onYear(r.year)}
              onKeyDown=${(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onYear(r.year);
                }
              }}
              role="button"
              tabIndex="0"
              aria-label=${`${r.year}: ${r.valid ? r[key] + " " + unit : "insufficient coverage"}. Inspect events.`}
              ><rect
                x=${left + (i / rows.length) * iw}
                y=${top}
                width=${iw / rows.length}
                height=${ih}
                fill="transparent"
              /><rect
                x=${x(i) - (iw / rows.length) * 0.28}
                y=${r.valid ? y(r[key]) : y(0) - 4}
                width=${Math.max(2, (iw / rows.length) * 0.56)}
                height=${r.valid ? Math.max(1, (ih * r[key]) / max) : 4}
                fill=${r.valid ? "var(--accent)" : "#65727a"}
                opacity=${hover === i ? 1 : 0.5}
                rx="2"
              />${(i === 0 || i === rows.length - 1 || r.year % 5 === 0) &&
              html`<text x=${x(i)} y=${h - 7} textAnchor="middle"
                >${r.year}</text
              >`}</g
            >`,
        )}
        <path d=${path} fill="none" stroke="var(--lime)" strokeWidth="2.5" />
        ${reg.slope != null &&
        html`<line
          x1=${x(0)}
          y1=${y(reg.intercept + reg.slope * rows[0].year)}
          x2=${x(rows.length - 1)}
          y2=${y(reg.intercept + reg.slope * rows[rows.length - 1].year)}
          stroke="#89959d"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />`}
      </svg>
      <div className="charttip" aria-live="polite">
        ${hover != null
          ? `${rows[hover].year} · ${rows[hover].valid ? rows[hover][key] + " " + unit : "excluded: coverage below 90%"} · coverage ${pct(rows[hover].coverage)}`
          : `${reg.slope == null ? "Insufficient valid years" : (reg.slope >= 0 ? "+" : "") + fmt(reg.slope * 10, 2) + " " + unit + "/decade"} · OLS R² ${fmt(reg.r2, 2)}`}
      </div>
    </div>
    <div className="legend">
      <span>Annual ${metric}</span><span>5-year trailing mean</span
      ><span>Linear fit</span>
    </div>
  </div>`;
}
function Seasonality({ result }) {
  const rows = result.annual.slice(-12),
    max = Math.max(1, ...rows.flatMap((r) => r.months)),
    [tip, setTip] = useState("Hover or focus a cell to inspect hazard days.");
  return html`<div className="panel panel-pad">
    <div className="panelhead">
      <div>
        <h3>The seasonal fingerprint</h3>
        <p>Hazard days per month · most recent ${rows.length} years</p>
      </div>
      <span className="unit">0 → ${max} days</span>
    </div>
    <div className="calendar">
      <div className="calendar-row">
        <span></span>${"JFMAMJJASOND"
          .split("")
          .map((s, i) => html`<span key=${i}>${s}</span>`)}
      </div>
      ${rows.map(
        (r) =>
          html`<div className="calendar-row" key=${r.year}>
            <span>${r.year}</span>${r.months.map((v, i) => {
              const desc = `${r.year}-${String(i + 1).padStart(2, "0")}: ${v} hazard days${r.valid ? "" : " · annual coverage below 90%"}`;
              return html`<div
                key=${i}
                className="calendar-cell"
                tabIndex="0"
                role="img"
                aria-label=${desc}
                onMouseEnter=${() => setTip(desc)}
                onFocus=${() => setTip(desc)}
                title=${desc}
                style=${{
                  background: r.valid
                    ? `rgba(${HAZARDS[result.config.hazard].rgb},${0.06 + (0.85 * v) / max})`
                    : "#34404a",
                }}
              />`;
            })}
          </div>`,
      )}
    </div>
    <p className="help" aria-live="polite">${tip}</p>
  </div>`;
}
function Events({ result, year, setYear }) {
  const [all, setAll] = useState(false);
  useEffect(() => setAll(false), [result, year]);
  const rows = result.events.filter(
    (e) =>
      !year || (+e.start.slice(0, 4) <= year && +e.end.slice(0, 4) >= year),
  );
  return html`<div className="panel panel-pad">
    <div className="panelhead">
      <div>
        <h3>Event log ${year ? "· " + year : ""}</h3>
        <p>
          Detected runs · latest first · ${rows.length} events overlap the
          period
        </p>
      </div>
      ${year &&
      html`<button className="textbtn" onClick=${() => setYear(null)}>
        Clear ×
      </button>`}
    </div>
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>Length</th>
            <th>Peak</th>
          </tr>
        </thead>
        <tbody>
          ${rows.slice(0, all ? rows.length : 15).map(
            (e) =>
              html`<tr key=${e.start}>
                <td>${e.start}</td>
                <td>${e.end}${e.truncated ? "*" : ""}</td>
                <td>${e.duration} d</td>
                <td>
                  ${fmt(e.peak, result.config.hazard === "dry" ? 0 : 1)}
                  ${HAZARDS[result.config.hazard].unit}
                </td>
              </tr>`,
          )}
        </tbody>
      </table>
      ${rows.length === 0 &&
      html`<div className="empty">
        No qualifying events in this selection.
      </div>`}
    </div>
    ${rows.length > 15 &&
    html`<button className="textbtn" onClick=${() => setAll(!all)}>
      ${all ? "Show latest 15" : `Show all ${rows.length} events`} ↓
    </button>`}
    <p className="help">
      * Run reaches the data boundary; its full duration is unknown. Missing
      days break a run. Low-coverage years remain visible here but are excluded
      from headline totals and trends.
    </p>
  </div>`;
}
function App() {
  const [page, setPage] = useState("Observatory"),
    [draft, setDraft] = useState(INITIAL),
    [result, setResult] = useState({
      ready: false,
      config: INITIAL,
      source: "Awaiting analysis",
      annual: [],
      events: [],
      rows: [],
      trend: { slope: null, r2: null, n: 0 },
      durationTrend: { slope: null, r2: null, n: 0 },
      threshold: null,
      change: null,
      comparison: { valid: false, window: 5, first: null, last: null },
      totalEvents: 0,
      totalDays: 0,
      maxDuration: 0,
      coverage: 0,
      baselineCoverage: 0,
      duplicates: 0,
      invalid: 0,
      excludedYears: [],
    }),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [toast, setToast] = useState(""),
    [metric, setMetric] = useState("frequency"),
    [year, setYear] = useState(null),
    [motion, setMotion] = useState(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
    [server, setServer] = useState(null),
    [creator, setCreator] = useState(() => {
      try {
        return localStorage.getItem("aether-creator-v2") || "Likhitha Varma Chinta";
      } catch {
        return "Likhitha Varma Chinta";
      }
    }),
    [snapshots, setSnapshots] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("aether-snapshots-v2") || "[]");
      } catch {
        return [];
      }
    });
  const abort = useRef(),
    fileInput = useRef();
  useEffect(() => {
    let active = true;
    fetch(apiUrl("/api/health"))
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((d) => {
        if (active) setServer(d);
      })
      .catch(() => {
        if (active)
          setNotice(
            "The Python service is unavailable. Start the application with the included launcher.",
          );
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (
      !motion ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    let current = null,
      raf = 0,
      latest = null;
    const selector =
      ".metric,.method-card,.download-item,.primary,.secondary,.hazard-tabs button,.navtabs button";
    const reset = () => {
      if (current) {
        current.style.setProperty("--rx", "0deg");
        current.style.setProperty("--ry", "0deg");
        current.style.setProperty("--mag-x", "0px");
        current.style.setProperty("--mag-y", "0px");
        current.removeAttribute("data-lit");
      }
      current = null;
    };
    function move(e) {
      latest = { target: e.target, x: e.clientX, y: e.clientY };
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el =
          latest.target instanceof Element
            ? latest.target.closest(selector)
            : null;
        if (el !== current) {
          reset();
          current = el;
        }
        if (!el || el.disabled) return;
        const r = el.getBoundingClientRect(),
          x = latest.x - r.left,
          y = latest.y - r.top;
        el.style.setProperty("--pointer-x", x + "px");
        el.style.setProperty("--pointer-y", y + "px");
        el.style.setProperty("--rx", (0.5 - y / r.height) * 5 + "deg");
        el.style.setProperty("--ry", (x / r.width - 0.5) * 5 + "deg");
        el.style.setProperty("--mag-x", (x / r.width - 0.5) * 7 + "px");
        el.style.setProperty("--mag-y", (y / r.height - 0.5) * 5 - 2 + "px");
        el.setAttribute("data-lit", "true");
      });
    }
    function leave() {
      cancelAnimationFrame(raf);
      raf = 0;
      reset();
    }
    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      reset();
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [page, motion]);
  useEffect(() => {
    if (!motion || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.animate?.(
              [
                { opacity: 0.45, transform: "translateY(16px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" },
            );
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.07 },
    );
    document
      .querySelectorAll(".metric,.panel,.insight,.method-card")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [page, result, motion]);
  const hazard = HAZARDS[result.config.hazard];
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", hazard.color);
    document.documentElement.style.setProperty("--rgb", hazard.rgb);
  }, [hazard]);
  useEffect(() => {
    document.body.classList.toggle("motion-off", !motion);
  }, [motion]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4500);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    function change() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        setMotion(false);
    }
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    q.addEventListener("change", change);
    return () => {
      q.removeEventListener("change", change);
      abort.current?.abort();
    };
  }, []);
  function navigate(p) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: motion ? "smooth" : "auto" });
  }
  function explore() {
    setPage("Explorer");
    window.scrollTo({ top: 0, behavior: motion ? "smooth" : "auto" });
  }
  function changeDraft(values) {
    setDraft((d) => ({ ...d, ...values }));
    setError("");
  }
  function validate(c) {
    if (
      !Number.isInteger(c.start) ||
      !Number.isInteger(c.end) ||
      c.start < 1940 ||
      c.end > LAST_YEAR ||
      c.end - c.start < 2 ||
      c.start > c.end
    )
      throw Error(
        `Choose at least 3 complete years between 1940 and ${LAST_YEAR}.`,
      );
    if (
      !Number.isFinite(c.region.lat) ||
      !Number.isFinite(c.region.lon) ||
      Math.abs(c.region.lat) > 90 ||
      Math.abs(c.region.lon) > 180
    )
      throw Error("Enter valid coordinates.");
  }
  async function run(override) {
    if (busy) return;
    const c = { ...draft, ...override };
    setDraft(c);
    setError("");
    setNotice("");
    try {
      validate(c);
      if (c.mode === "import")
        throw Error(
          "Choose Python analysis or Offline demonstration to run a new analysis.",
        );
    } catch (e) {
      setError(e.message);
      return;
    }
    setBusy(true);
    const controller = new AbortController();
    abort.current = controller;
    const timer = setTimeout(() => controller.abort(), 135000);
    try {
      let next;
      if (c.mode === "demo") {
        await new Promise((r) => setTimeout(r, 40));
        next = {
          ...analyze(synthetic(c.region, c.end, c.start), c),
          source: "Synthetic demonstration",
          fetchedAt: new Date().toISOString(),
        };
      } else {
        const response = await fetch(apiUrl("/api/analyses"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...c, mode: "backend" }),
          signal: controller.signal,
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok)
          throw Error(
            typeof payload.detail === "string"
              ? payload.detail
              : `Analysis failed (HTTP ${response.status}).`,
          );
        const read = await fetch(
        apiUrl("/api/analyses/" + encodeURIComponent(payload.id)),
        { signal: controller.signal },
        );
        if (!read.ok) throw Error("Database readback failed. Please retry.");
        next = await read.json();
        if (payload.cached)
          setNotice("Loaded from the persistent analysis cache.");
        else if (payload.weatherCached)
          setNotice(
            "New analysis computed in Python from cached ERA5 weather.",
          );
      }
      if (controller.signal.aborted)
        throw new DOMException("Cancelled", "AbortError");
      setResult({ ...next, ready: true });
      setYear(null);
      setToast(
        c.mode === "demo"
          ? "Demonstration ready · simulated data"
          : "Analysis complete · real ERA5 reanalysis",
      );
    } catch (e) {
      setError(
        e.name === "AbortError"
          ? "Request cancelled or timed out. Previous results are unchanged."
          : e.message + " Previous results are unchanged.",
      );
    } finally {
      clearTimeout(timer);
      setBusy(false);
      abort.current = null;
    }
  }

  function exportFile(kind) {
    if (!result.ready) {
      setToast("Run an analysis first.");
      return;
    }
    const c = result.config,
      name = `aether-${c.hazard}-${c.start}-${c.end}-${c.mode}`;
    if (kind === "json") {
      download(
        name + ".json",
        JSON.stringify(resultSummary(result), null, 2),
        "application/json",
      );
    } else if (kind === "events") {
      download(
        name + "-events.csv",
        toCSV([
          [
            "source",
            "location",
            "hazard",
            "start",
            "end",
            "duration_days",
            "peak",
            "peak_unit",
            "boundary_truncated",
          ],
          ...result.events.map((e) => [
            result.source,
            c.region.name,
            c.hazard,
            e.start,
            e.end,
            e.duration,
            e.peak,
            hazard.unit,
            e.truncated,
          ]),
        ]),
        "text/csv",
      );
    } else if (kind === "daily") {
      download(
        name + "-daily.csv",
        toCSV([
          ["source", "date", "temperature_2m_max_C", "precipitation_sum_mm"],
          ...result.rows.map((r) => [result.source, r.date, r.t, r.p]),
        ]),
        "text/csv",
      );
    } else
      download(
        name + "-annual.csv",
        toCSV([
          [
            "source",
            "location",
            "latitude",
            "longitude",
            "hazard",
            "year",
            "event_starts",
            "hazard_days",
            "longest_run_days",
            "coverage",
            "included_in_trend",
            "threshold",
            "baseline",
          ],
          ...result.annual.map((a) => [
            result.source,
            c.region.name,
            c.region.lat,
            c.region.lon,
            c.hazard,
            a.year,
            a.events,
            a.days,
            a.maxDuration,
            a.coverage,
            a.valid,
            result.threshold,
            "1961-1990",
          ]),
        ]),
        "text/csv",
      );
    setToast("Export downloaded");
  }
  async function printReport() {
    if (!result.ready) {
      setToast("Run an analysis first.");
      return;
    }
    if (result.backendId) {
      try {
        const r = await fetch(
  apiUrl(
    "/api/analyses/" +
    encodeURIComponent(result.backendId) +
    "/export/pdf"
  ),
);
        if (!r.ok) throw Error("PDF export failed.");
        download(
          "aether-climate-report.pdf",
          await r.arrayBuffer(),
          "application/pdf",
        );
        setToast("PDF report downloaded");
      } catch (e) {
        setToast(e.message);
      }
    } else {
      setPage("Explorer");
      setTimeout(() => window.print(), 300);
    }
  }
  async function saveSnapshot() {
    if (!result.ready) {
      setToast("Run an analysis first.");
      return;
    }
    const id = "report:" + Date.now();
    const ok = await cachePut(id, result);
    if (!ok) {
      setToast("Browser storage unavailable. Use JSON export instead.");
      return;
    }
    const next = [
      {
        id,
        name: result.config.region.name,
        hazard: result.config.hazard,
        start: result.config.start,
        end: result.config.end,
        source: result.source,
      },
      ...snapshots,
    ].slice(0, 8);
    setSnapshots(next);
    try {
      localStorage.setItem("aether-snapshots-v2", JSON.stringify(next));
      setToast("Snapshot saved on this device");
    } catch {
      setToast("Snapshot saved for this session only");
    }
  }
  async function loadSnapshot(id) {
    const r = await cacheGet(id);
    if (!r) {
      setToast("Snapshot no longer available.");
      return;
    }
    setResult({ ...r, ready: true });
    setDraft(r.config);
    setYear(null);
    navigate("Explorer");
  }
  async function importCSV(e) {
    const f = e.target.files[0];
    e.target.value = "";
    if (!f) return;
    try {
      if (f.size > 12 * 1024 * 1024)
        throw Error("Choose a CSV smaller than 12 MB.");
      const text = await f.text(),
        lines = text
          .replace(/^\uFEFF/, "")
          .trim()
          .split(/\r?\n/);
      const split = (s) =>
        (s.match(/(?:"(?:[^"]|"")*"|[^,]*)(?:,|$)/g) || [])
          .filter((v, i, a) => !(i === a.length - 1 && v === ""))
          .map((v) =>
            v.replace(/,$/, "").replace(/^"|"$/g, "").replaceAll('""', '"'),
          );
      const headers = split(lines[0]),
        di = headers.indexOf("date"),
        ti = headers.indexOf("temperature_2m_max_C"),
        pi = headers.indexOf("precipitation_sum_mm");
      if ([di, ti, pi].some((i) => i < 0))
        throw Error(
          "Required columns: date, temperature_2m_max_C, precipitation_sum_mm.",
        );
      const rows = lines.slice(1).map((line) => {
          const v = split(line);
          return {
            date: v[di],
            t: v[ti]?.trim() ? Number(v[ti]) : null,
            p: v[pi]?.trim() ? Number(v[pi]) : null,
          };
        }),
        c = { ...draft, mode: "import" };
      validate(c);
      const r = {
        ...analyze(rows, c),
        source: "User-imported CSV (unverified)",
        fetchedAt: new Date().toISOString(),
      };
      setResult({ ...r, ready: true });
      setDraft(c);
      setYear(null);
      setToast("CSV imported and analyzed");
      navigate("Explorer");
    } catch (e) {
      setToast(e.message);
    }
  }
  const dirty = JSON.stringify(draft) !== JSON.stringify(result.config);
  const summary =
    result.change == null
      ? result.comparison.valid && result.comparison.first === 0
        ? "The early comparison window has zero events, so a percentage change is undefined."
        : "This selection is too short or incomplete for a reliable first-versus-last window comparison."
      : `Average annual event counts ${result.change >= 0 ? "increased" : "decreased"} by ${fmt(Math.abs(result.change), 0)}% between ${result.config.start}–${result.config.start + result.comparison.window - 1} and ${result.config.end - result.comparison.window + 1}–${result.config.end}.`;
  const modeBadge = html`<span
    className=${"badge " + (result.config.mode === "demo" ? "demo" : "")}
    >${result.config.mode === "demo"
      ? "◌ SIMULATED DEMO"
      : !result.ready
        ? "○ READY TO EXPLORE"
        : result.config.mode === "import"
          ? "↑ IMPORTED · UNVERIFIED"
          : "● ERA5 REANALYSIS"}</span
  >`;
  const selectedRegion = regionForLocation(draft.region),
    selectedCountry = selectedRegion?.country || "",
    selectedState = selectedRegion?.state || "",
    selectedCity = selectedRegion?.city || "",
    selectedCountryStates = statesInCountry(selectedCountry),
    selectedStateCities = regionsInState(selectedState, selectedCountry);
  const explorer = html`<section className="workspace" id="explorer">
    <div className="print-only">
      <h1>AETHER · Climate hazard report</h1>
      <p>
        ${result.source} · Generated ${new Date().toLocaleDateString()} ·
        ${result.config.region.name} (${result.config.region.lat},
        ${result.config.region.lon}). Baseline 1961–1990.
        ${result.config.mode === "demo"
          ? "SIMULATED DATA — not observed climate evidence."
          : ""}
      </p>
    </div>
    <div className="sectionhead">
      <div>
        <div className="eyebrow">01 / The climate explorer</div>
        <h2>Find the signal in the change.</h2>
        <p>
          Choose a place. Look back through time. See what the data reveals.
        </p>
      </div>
      ${modeBadge}
    </div>
    <div className="config">
      <label
        >01 · Country<select
          aria-label="Country"
          value=${selectedCountry}
          onChange=${(e) => {
            const r = regionsInCountry(e.target.value)[0];
            if (r) changeDraft({ region: r });
          }}
        >
          ${COUNTRIES.map(
            (country) =>
              html`<option key=${country} value=${country}>
                ${country}
              </option>`,
          )}
        </select></label
      ><label
        >02 · State / region<select
          aria-label="State or union territory"
          value=${selectedState}
          onChange=${(e) => {
            const r = regionsInState(e.target.value, selectedCountry)[0];
            if (r) changeDraft({ region: r });
          }}
        >
          ${selectedCountryStates.map(
            (state) =>
              html`<option key=${state} value=${state}>
                ${state}
              </option>`,
          )}
        </select></label
      ><label
        >03 · Prominent city<select
          aria-label="Prominent city"
          value=${selectedCity}
          disabled=${!selectedState}
          onChange=${(e) => {
            const r = selectedStateCities.find(
              (region) => region.city === e.target.value,
            );
            if (r) changeDraft({ region: r });
          }}
        >
          ${selectedState
            ? selectedStateCities.map(
                (r) =>
                  html`<option key=${r.city} value=${r.city}>
                    ${r.city}
                  </option>`,
              )
            : html`<option value="">Choose a state first</option>`}
        </select></label
      >
      <div className="dates">
        <label
          >04 · From<input
            type="number"
            min="1940"
            max=${LAST_YEAR - 2}
            value=${draft.start}
            onChange=${(e) =>
              changeDraft({ start: Number(e.target.value) })} /></label
        ><label
          >To<input
            type="number"
            min="1942"
            max=${LAST_YEAR}
            value=${draft.end}
            onChange=${(e) => changeDraft({ end: Number(e.target.value) })}
        /></label>
      </div>
      <label
        >05 · Data source<select
          value=${draft.mode}
          onChange=${(e) => changeDraft({ mode: e.target.value })}
        >
          ${draft.mode === "import" &&
          html`<option value="import">Imported CSV</option>`}
          <option value="demo">Offline demonstration</option>
          <option value="backend">Python API · real ERA5</option>
        </select></label
      ><button
        className="primary accent"
        disabled=${busy}
        onClick=${() => run()}
      >
        ${busy ? "Analyzing…" : "Run analysis"} <span>↗</span>
      </button>
      <div className="config-extra">
        <span className="unit"
          >Baseline <span style=${{ color: "var(--ink)" }}>1961–1990</span> ·
          Fixed reference period</span
        ><span className="spacer"></span
        ><button className="textbtn" onClick=${() => navigate("Methodology")}>
          How we measure ↗</button
        >${busy &&
        html`<button
          className="textbtn"
          onClick=${() => abort.current?.abort()}
        >
          Cancel request ×
        </button>`}
      </div>
    </div>
    ${busy &&
    html`<div
      className="progress"
      role="status"
      aria-label="Loading and processing daily weather data"
    />`}
    <div className="hazard-tabs" aria-label="Select hazard">
      ${Object.entries(HAZARDS).map(
        ([k, v]) =>
          html`<button
            key=${k}
            disabled=${busy}
            aria-pressed=${draft.hazard === k}
            className=${draft.hazard === k ? "selected" : ""}
            onClick=${() => {
              changeDraft({ hazard: k });
            }}
          >
            <span>${v.icon}</span>${v.name}
          </button>`,
      )}
    </div>
    ${error &&
    html`<div className="banner error" role="alert">${error}</div>`}${notice &&
    html`<div className="banner info" role="status">${notice}</div>`}${dirty &&
    html`<div className="banner info">
      Selection changed. Run analysis to update the results below.
    </div>`}${result.config.mode === "demo" &&
    html`<div className="banner">
      Demonstration mode · These weather records are simulated. Switch to Python
      API · real ERA5 and run analysis for historical reanalysis data.
    </div>`}${result.ready
      ? html`<div className="analysis-results">
          <div className="result-state">
            <strong
              >${hazard.name} / ${result.config.region.name} /
              ${result.config.start}–${result.config.end}</strong
            ><span
              >${result.config.region.lat.toFixed(2)}°,
              ${result.config.region.lon.toFixed(2)}° · ${result.source}</span
            >
          </div>
          <div className="metrics">
            <div className="metric">
              <div className="metric-label">
                Frequency change <span>↗</span>
              </div>
              <div className="metric-value">
                ${result.change == null
                  ? "—"
                  : (result.change > 0 ? "+" : "") +
                    fmt(result.change, 0)}${result.change != null &&
                html`<em>%</em>`}
              </div>
              <small
                >First vs last ${result.comparison.window}-year average</small
              >
            </div>
            <div className="metric">
              <div className="metric-label">
                Detected event starts <span>≋</span>
              </div>
              <div className="metric-value">
                ${fmt(result.totalEvents, 0)}<em>events</em>
              </div>
              <small>Across years with ≥90% coverage</small>
            </div>
            <div className="metric">
              <div className="metric-label">
                Longest qualifying run <span>↔</span>
              </div>
              <div className="metric-value">
                ${result.maxDuration}<em>days</em>
              </div>
              <small>Runs can cross calendar boundaries</small>
            </div>
            <div className="metric">
              <div className="metric-label">
                Daily data coverage <span>◉</span>
              </div>
              <div className="metric-value">
                ${fmt(result.coverage * 100, 1)}<em>%</em>
              </div>
              <small
                >${result.excludedYears.length} years excluded ·
                ${result.duplicates} duplicates</small
              >
            </div>
          </div>
          <div className="grid-main">
            <${TrendChart}
              result=${result}
              metric=${metric}
              setMetric=${setMetric}
              onYear=${setYear}
            />
            <div className="panel panel-pad">
              <div className="panelhead" style=${{ marginBottom: 20 }}>
                <div>
                  <h3>A place in the bigger picture</h3>
                  <p>${draft.region.name} · select the next analysis point</p>
                </div>
                <span style=${{ color: "var(--accent)", fontSize: 20 }}>⊕</span>
              </div>
              <${RegionMap}
                region=${draft.region}
                onSelect=${(r) => changeDraft({ region: r })}
                hazard=${result.config.hazard}
              />
            </div>
          </div>
          <div className="insight">
            <div className="symbol">✳</div>
            <div>
              <div
                className="eyebrow"
                style=${{ color: "var(--accent)", fontSize: 9 }}
              >
                Computed insight ·
                ${result.config.mode === "demo"
                  ? "simulated"
                  : "descriptive analysis"}
              </div>
              <h3>${summary}</h3>
              <p>
                <b>${hazard.name}</b>: ${hazard.definition} Threshold:
                <b
                  >${fmt(result.threshold, 2)}
                  ${result.config.hazard === "heat" ? "°C" : "mm/day"}</b
                >.
                ${result.config.mode === "demo"
                  ? "This illustrates the method and is not a finding about the selected location."
                  : "This is a descriptive association, not a forecast or proof of climate-change attribution."}
                ${result.config.hazard === "dry"
                  ? "Seasonal aridity can also produce long dry spells."
                  : ""}
              </p>
            </div>
          </div>
          <div className="grid-bottom">
            <${Seasonality} result=${result} /><${Events}
              result=${result}
              year=${year}
              setYear=${setYear}
            />
          </div>
          <div className="result-state">
            <span
              >${result.totalDays.toLocaleString()} qualifying days · Fixed
              baseline coverage ${pct(result.baselineCoverage)} ·
              ${result.excludedYears.length
                ? "Excluded years: " + result.excludedYears.join(", ")
                : "All analysis years meet coverage threshold"}</span
            >
            <div style=${{ display: "flex", gap: 15 }}>
              <button className="textbtn" onClick=${() => exportFile("annual")}>
                ↓ Export CSV</button
              ><button className="textbtn" onClick=${printReport}>
                ↓ Print / PDF</button
              ><button className="textbtn" onClick=${saveSnapshot}>
                ＋ Save snapshot
              </button>
            </div>
          </div>
        </div>`
      : html`<div className="empty-start panel">
          <span className="empty-orbit">◎</span>
          <div className="eyebrow">YOUR NEXT DISCOVERY STARTS HERE</div>
          <h3>Choose a place. Find its signal.</h3>
          <p>
            Run an analysis to explore real historical weather, interactive
            trends and the events behind them.
          </p>
        </div>`}
  </section>`;
  return html`<${React.Fragment}><a className="skip" href="#main">Skip to content</a><header className="topbar"><div className="shell navrow"><button className="logo" onClick=${() => navigate("Observatory")} aria-label="Aether home"><span className="logomark" aria-hidden="true">✳</span><span>AETHER<small>CLIMATE INTELLIGENCE</small></span></button><nav className="navtabs" aria-label="Main navigation">${["Observatory", "Explorer", "Methodology", "Data & exports", "About"].map((p) => html`<button key=${p} className=${page === p ? "active" : ""} aria-current=${page === p ? "page" : undefined} onClick=${() => navigate(p)}>${p}</button>`)}</nav><div className="tools"><span className="live" style=${{ fontSize: 10, color: "var(--muted)" }}><i className="statusdot"></i>EARTH, IN FOCUS</span><button className="motion-button" aria-label=${motion ? "Pause animation" : "Resume animation"} title=${motion ? "Pause motion" : "Resume motion"} onClick=${() => setMotion(!motion)}>${motion ? "Ⅱ" : "▷"}</button></div></div></header><main id="main" className="shell">${page === "Observatory" && html`<${React.Fragment}><section className="hero"><div className="hero-copy"><div className="eyebrow">One planet. A million signals.</div><h1 className="kinetic-title"><span className="hero-line"><span>Our planet.</span></span><span className="hero-line"><span>Always</span></span><span className="hero-line"><em>in motion.</em></span></h1><p>Explore the fingerprints of a changing climate. Turn decades of weather into patterns you can see, question, and understand.</p><div className="hero-actions"><button className="primary" onClick=${explore}>Explore the data <span>↗</span></button><button className="textbtn" onClick=${() => navigate("Methodology")}>Behind the science ↗</button></div></div><${Globe} motion=${motion}/><div className="orbit-label">AETHER OBSERVATORY / 01<br/><br/>${motion ? "AUTO-ORBIT ACTIVE" : "MOTION PAUSED"} · SCROLL TO EXPLORE</div><div className="globe-label"><b>⊙ ${draft.region.name.toUpperCase()}</b>${Math.abs(draft.region.lat).toFixed(4)}° ${draft.region.lat >= 0 ? "N" : "S"} / ${Math.abs(draft.region.lon).toFixed(4)}° ${draft.region.lon >= 0 ? "E" : "W"}<br/><span style=${{ color: "#81948b", fontSize: 9 }}>ILLUSTRATIVE EARTH · SELECTED COORDINATE</span></div><div className="hero-foot"><span className="scrollhint"><i></i>SCROLL INTO THE SIGNAL</span><span>HISTORICAL PATTERNS.<br/>BETTER QUESTIONS.</span><span>01 — 05</span></div></section><div className="ticker"><span>BUILT TO MAKE CLIMATE VISIBLE</span><b>ERA5 REANALYSIS</b><b>DAILY RESOLUTION</b><b>TRANSPARENT METHODS</b><span>1940 → ${LAST_YEAR}</span></div>${explorer}</React.Fragment>`}${page === "Explorer" && explorer}${
    page === "Methodology" &&
    html`<section className="page">
      <div className="page-intro">
        <div className="eyebrow">02 / Behind the signal</div>
        <h1>Good insights start<br />with honest methods.</h1>
        <p>
          Every threshold, missing day, and comparison matters. AETHER uses
          explicit rules you can inspect, reproduce, and challenge. No black-box
          climate claims.
        </p>
      </div>
      <div className="cards3">
        <article className="method-card">
          <div className="step">01 / HEATWAVES</div>
          <h3>When heat persists.</h3>
          <p>
            Compute the 95th percentile of all valid daily maximum temperatures
            in 1961–1990 at the selected point. Count runs of at least three
            days strictly above that fixed threshold.
          </p>
          <div className="formula">Tmax &gt; P95 · run ≥ 3 days</div>
          <p>
            This annual pooled threshold highlights the hottest part of the
            year. It is not a calendar-day percentile or an official heat-health
            alert.
          </p>
        </article>
        <article className="method-card">
          <div className="step">02 / HEAVY RAINFALL</div>
          <h3>When rain intensifies.</h3>
          <p>
            Calculate the 95th percentile of baseline wet days, where daily
            precipitation is at least 1 mm. Consecutive days strictly above that
            threshold form one event.
          </p>
          <div className="formula">P &gt; P95(wet days)</div>
          <p>
            At least 30 baseline wet days are required. Precipitation includes
            rain and snow water equivalent; this is not a river-flood model.
          </p>
        </article>
        <article className="method-card">
          <div className="step">03 / DRY SPELLS</div>
          <h3>When rain stays away.</h3>
          <p>
            Find at least 14 consecutive days with precipitation below 1 mm/day.
            Report run lengths and counts without labelling every dry period a
            drought.
          </p>
          <div className="formula">P &lt; 1 mm · run ≥ 14 days</div>
          <p>
            This screening proxy does not include soil moisture, water demand,
            SPI, or SPEI. Local seasonality is essential context.
          </p>
        </article>
      </div>
      <div className="method-detail">
        <details open>
          <summary>Data quality is part of the result</summary>
          <p>
            Rows are sorted onto a complete daily calendar. Duplicate dates use
            the last supplied record. Invalid dates are discarded; non-numeric
            values, temperatures outside −90 to 65 °C, and precipitation outside
            0 to 3,000 mm/day become missing. These broad plausibility checks
            are not an exhaustive quality-control system. Missing days break
            event runs and are never filled with zero. Both the baseline and
            individual analysis years must have at least 90% coverage for the
            variable in use. Below-threshold years are excluded from totals,
            fits, and rolling means; event logs retain visible partial evidence.
            Even above 90%, missingness can bias counts.
          </p>
        </details>
        <details>
          <summary>What the trend and percentage actually mean</summary>
          <p>
            Ordinary least squares fits annual event starts, annual hazard days,
            or the longest run touching each year. The slope is displayed per
            decade alongside R². The five-year mean uses five consecutive valid
            calendar years. The headline percentage compares mean event starts
            in the first and last five years (at least ten years required). A
            zero initial mean produces no percentage. These are descriptive
            fits, with no significance test, confidence interval, or attribution
            claim. Counts can be noisy and serially correlated.
          </p>
        </details>
        <details>
          <summary>Events across years and incomplete boundaries</summary>
          <p>
            Detection runs continuously from the earlier of 1961 or the selected
            start year through the selected final year. Event starts count only
            in their starting year. Hazard days count in the calendar year in
            which they occur. A run crossing January can contribute its full
            length to both years' longest-run metric; the event log includes any
            run overlapping the analysis window. Runs reaching December 31 of
            the final year are marked as truncated. Seasons and extreme events
            crossing a missing day can be underestimated.
          </p>
        </details>
        <details>
          <summary>A coordinate is not an entire region</summary>
          <p>
            Each selection requests one ERA5 grid cell, approximately 0.25°
            resolution, via Open-Meteo. The provider may return a nearby grid
            coordinate; metadata is retained in JSON. It is reanalysis,
            combining modelling and observations, rather than a weather-station
            record. Whole-state or city-boundary averages would require a
            defined polygon and area-weighted sampling. The globe and map
            identify a location; their colours do not display measured global
            hazards.
            <a
              href="https://open-meteo.com/en/docs/historical-weather-api"
              target="_blank"
              rel="noreferrer"
              >Read the Open-Meteo source documentation ↗</a
            >
          </p>
        </details>
        <details>
          <summary>How the full application works</summary>
          <p>
            The React interface, Three.js globe, charts and animations run in
            your browser. Real historical weather is retrieved by the
            same-origin Python API, analyzed on the server and persisted in a
            NoSQL document store. Local installs use TinyDB; Docker Compose
            includes MongoDB. Offline demonstration and user-imported CSVs use
            the browser detector and remain explicitly labelled. Real API
            results are read from the database, not recomputed in the browser.
          </p>
        </details>
      </div>
      <div className="insight">
        <span className="symbol">↗</span>
        <div>
          <h3>Built for exploration, not emergency decisions.</h3>
          <p>
            Historical hazard patterns are not weather forecasts. Reanalysis
            resolution and these simple definitions cannot replace local
            observations, impact studies, or official warnings.
          </p>
        </div>
      </div>
    </section>`
  }${
    page === "Data & exports" &&
    !result.ready &&
    html`<section className="page">
      <div className="page-intro">
        <div className="eyebrow">DATA & EXPORTS</div>
        <h1>Your next insight<br />is waiting.</h1>
        <p>
          Run an analysis in Explorer to unlock annual data, event records,
          daily weather and PDF reports.
        </p>
        <button
          className="primary"
          style=${{ marginTop: 24 }}
          onClick=${explore}
        >
          Open Explorer ↗
        </button>
      </div>
    </section>`
  }${
    page === "Data & exports" &&
    result.ready &&
    html`<section className="page">
      <div className="page-intro">
        <div className="eyebrow">03 / Take the signal with you</div>
        <h1>Your data.<br />Beyond the dashboard.</h1>
        <p>
          Export the current analysis and inspect its provenance. Every export
          retains its source label.
        </p>
      </div>
      <div className="data-grid">
        <div>
          <div className="download-list" style=${{ marginTop: 0 }}>
            ${[
              [
                "Annual summary",
                "Counts, hazard days, duration and coverage.",
                "annual",
              ],
              [
                "Event catalogue",
                "Start and end dates for every detected run.",
                "events",
              ],
              [
                "Daily weather",
                "Includes the 1961–1990 reference baseline.",
                "daily",
              ],
              [
                "Analysis JSON",
                "Parameters, metadata, statistics and events.",
                "json",
              ],
            ].map(
              ([n, d, k]) =>
                html`<div key=${k} className="download-item">
                  <div>
                    <h3>${n}</h3>
                    <p>${d}</p>
                  </div>
                  <button className="secondary" onClick=${() => exportFile(k)}>
                    ↓ ${k === "json" ? "JSON" : "CSV"}
                  </button>
                </div>`,
            )}
            <div className="download-item">
              <div>
                <h3>Printable report</h3>
                <p>
                  Download a report generated by Python. Demonstration and
                  imported reports use browser print.
                </p>
              </div>
              <button className="secondary" onClick=${printReport}>
                ↗ PDF
              </button>
            </div>
          </div>
          <div className="panel panel-pad" style=${{ marginTop: 20 }}>
            <h3>Bring your own daily data</h3>
            <p className="help">
              CSV columns: date (YYYY-MM-DD), temperature_2m_max_C,
              precipitation_sum_mm. Include 1961–1990 plus your analysis period.
              Empty values are missing. Set the location and years in Explorer
              before importing. Imported results are labelled unverified.
            </p>
            <input
              type="file"
              accept=".csv,text/csv"
              ref=${fileInput}
              onChange=${importCSV}
              className="hidden"
            /><button
              className="secondary"
              style=${{ marginTop: 16 }}
              onClick=${() => fileInput.current.click()}
            >
              ↑ Import daily CSV
            </button>
          </div>
        </div>
        <div>
          <div className="panel panel-pad">
            <h3>Analysis provenance</h3>
            <dl className="metadata">
              <dt>Source</dt>
              <dd>${result.source}</dd>
              <dt>Location</dt>
              <dd>${result.config.region.name}</dd>
              <dt>Requested point</dt>
              <dd>
                ${result.config.region.lat}°, ${result.config.region.lon}°
              </dd>
              <dt>Returned grid</dt>
              <dd>
                ${result.grid
                  ? result.grid.lat + "°, " + result.grid.lon + "°"
                  : "Not applicable / unavailable"}
              </dd>
              <dt>Analysis window</dt>
              <dd>${result.config.start}–${result.config.end}</dd>
              <dt>Baseline</dt>
              <dd>1961–1990 · fixed</dd>
              <dt>Threshold</dt>
              <dd>
                ${fmt(result.threshold, 3)}
                ${result.config.hazard === "heat" ? "°C" : "mm/day"}
              </dd>
              <dt>Timezone</dt>
              <dd>${result.timezone || "Date-only synthetic / imported"}</dd>
              <dt>Data retrieved</dt>
              <dd>
                ${result.fetchedAt
                  ? new Date(result.fetchedAt).toLocaleString()
                  : "Unknown"}
              </dd>
              <dt>Coverage</dt>
              <dd>${pct(result.coverage)}</dd>
              <dt>Duplicate dates</dt>
              <dd>${result.duplicates}</dd>
              <dt>Invalid date rows</dt>
              <dd>${result.invalid}</dd>
              <dt>Backend record</dt>
              <dd>${result.backendId || "Browser analysis"}</dd>
            </dl>
            <p className="help">
              Weather data:
              <a href="https://open-meteo.com/" target="_blank" rel="noreferrer"
                >Open-Meteo</a
              >
              / Copernicus ERA5,
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noreferrer"
                >CC BY 4.0</a
              >. Review provider terms before commercial deployment. Earth
              texture: Three.js example asset.
            </p>
          </div>
          <div className="panel panel-pad" style=${{ marginTop: 20 }}>
            <h3>Connected analysis service</h3>
            <p className="help">
              This application sends real weather requests to its Python
              backend. Results and daily weather are stored in the document
              database and read back through the API.
            </p>
            <dl className="metadata">
              <dt>Service</dt>
              <dd>
                ${server
                  ? "Online · v" + server.version
                  : "Checking connection"}
              </dd>
              <dt>Database</dt>
              <dd>${server?.storage || "Unavailable"}</dd>
              <dt>Cache</dt>
              <dd>30 days · persistent</dd>
            </dl>
            <a className="textbtn" href="/docs" target="_blank" rel="noreferrer"
              >Explore API documentation ↗</a
            >
          </div>
        </div>
      </div>
      <div className="sectionhead" style=${{ marginTop: 35 }}>
        <div>
          <h3>Saved on this device</h3>
          <p>
            Up to eight snapshots. Browser storage can be cleared; export
            important work.
          </p>
        </div>
        <button className="secondary" onClick=${saveSnapshot}>
          ＋ Save current analysis
        </button>
      </div>
      ${snapshots.length
        ? html`<div className="cards3">
            ${snapshots.map(
              (s) =>
                html`<div className="method-card" key=${s.id}>
                  <div className="step">${s.start}–${s.end}</div>
                  <h3>${s.name}</h3>
                  <p>${HAZARDS[s.hazard]?.name} · ${s.source}</p>
                  <button
                    className="textbtn"
                    style=${{ marginTop: 20 }}
                    onClick=${() => loadSnapshot(s.id)}
                  >
                    Open snapshot ↗
                  </button>
                </div>`,
            )}
          </div>`
        : html`<div className="panel empty">
            Your saved analyses will appear here.
          </div>`}
    </section>`
  }${
    page === "About" &&
    html`<section className="page">
      <div className="about-layout">
        <div className="page-intro">
          <div className="eyebrow">04 / The person behind the project</div>
          <h1>
            Curiosity, code,<br />and a little<br /><span
              style=${{ color: "var(--lime)" }}
              >planetary perspective.</span
            >
          </h1>
          <p>
            Hi, I’m ${creator} — a junior software developer interested in AI,
            thoughtful interfaces, and turning complex data into something
            people can understand.
          </p>
          <p style=${{ marginTop: 20 }}>
            I created AETHER to explore a question: how can we make climate
            patterns feel less abstract? This project brings together
            interactive 3D, historical data, and transparent analysis in one
            small observatory.
          </p>
          <div className="tags">
            ${[
              "REACT",
              "PYTHON",
              "MONGODB",
              "THREE.JS",
              "CLIMATE DATA",
              "AI CURIOSITY",
            ].map((t) => html`<span className="tag" key=${t}>${t}</span>`)}
          </div>
          <button className="primary" onClick=${explore}>
            Step into the observatory ↗
          </button>
        </div>
        <div className="creator-art" aria-hidden="true">
          <div className="creator-ring"></div>
          <div className="creator-ring"></div>
          <div className="creator-monogram">
            ${creator.charAt(0).toUpperCase()}.
          </div>
        </div>
      </div>
      <div className="cards3">
        <div className="method-card">
          <div className="step">THE PURPOSE</div>
          <h3>Make the invisible visible.</h3>
          <p>
            A daily temperature record is one point. Across decades, patterns
            emerge. AETHER is a space to examine those patterns without losing
            sight of what the data can and cannot say.
          </p>
        </div>
        <div className="method-card">
          <div className="step">THE APPROACH</div>
          <h3>Delight with depth.</h3>
          <p>
            Real 3D geometry, scroll-responsive orbiting, accessible motion
            controls, and an analytical workflow. The visual atmosphere sets the
            scene; the measured data tells the story.
          </p>
        </div>
        <div className="method-card">
          <div className="step">MAKE IT YOURS</div>
          <h3>A personal signature.</h3>
          <label style=${{ marginTop: 15 }}>
            <span>Creator name</span>
            <div className="static-creator-name">${creator}</div>
          </label>
          <p className="help">
            Updates the author credit on this device. AI is an area of interest;
            the current insights are deterministic statistical summaries, not
            LLM output.
          </p>
        </div>
      </div>
    </section>`
  }</main><footer className="footer shell"><div><div className="foot-brand">✳ AETHER</div><p>A small observatory for a changing world.</p></div><div><p>Created by <strong>${creator}</strong> · Junior Software Developer</p><p>Exploring AI, data, and meaningful digital experiences.</p></div><button onClick=${() => navigate("Methodology")}>Built with curiosity. Grounded in data. ↗</button></footer>${toast && html`<div className="toast" role="status">${toast}</div>`}</React.Fragment>`;
}
ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
