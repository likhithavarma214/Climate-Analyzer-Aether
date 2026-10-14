# AETHER — Climate Hazard Observatory

A complete React + Python application rebuilt from the supplied AETHER design reference. Includes an automatically rotating textured 3D Earth, orbital rings, animated headings, pointer-reactive cards, responsive navigation, interactive charts, map selection, seasonality heatmaps, event logs, and data exports.

## Start on Windows
1. Install Python 3.11 or newer.
2. Extract this ZIP fully into a new folder. Do not merge it into the old Climate Signal folder.
3. Double-click `start-windows.bat`.
4. The launcher installs Python dependencies and opens http://127.0.0.1:8010 (or the next free port) once this AETHER process is ready.
5. Open Explorer, choose a city/date range/hazard, keep **Python API · real ERA5** selected, and click **Run analysis**.

The compiled React frontend and all fonts/textures are included. **Node.js and MongoDB are not required for this local launch.** Internet is needed for dependency installation and uncached historical weather. Keep the terminal open; Ctrl+C stops the app. The launcher reserves a free port starting at 8010 and verifies its unique process identity before opening the browser. Older apps running on port 8000 can stay open; use the NEW URL printed in the AETHER terminal. Set `PORT` to change the preferred starting port.

macOS/Linux: `bash start.sh` (Python 3.11+).

Manual Windows startup:
```
py -3 -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements.txt
.venv\Scripts\python.exe launch.py
```

## Features
- Observatory landing page with locally bundled Syne, Manrope and Space Grotesk fonts.
- Three.js Earth, atmospheric glow, orbit rings, automatic rotation, optional drag, scroll response and motion pause. Reduced-motion settings are respected. WebGL failures fall back to a static Earth.
- Country, state/region, and prominent-city selectors for India (all 28 states and 8 union territories) and the existing United Kingdom, United States, Australia, and Kenya presets. City coordinates and country/state/city metadata are sent with analysis requests; ERA5 retrieval uses the selected coordinates. Arbitrary latitude/longitude and clickable world-map point selection remain available.
- Heatwave (default), heavy precipitation and dry-spell detection.
- Three annual chart metrics: event starts, longest run touching a year, and hazard days. Five-year rolling mean, OLS slope and R². Keyboard-accessible year inspection.
- Monthly seasonality grid and filterable event log.
- Annual, daily and event CSV; analysis JSON; Python-generated PDF for real analyses. Demo/import reports use browser Print to PDF.
- User CSV import and up to eight browser snapshot listings. Imported records are labelled unverified. Offline demo is explicitly simulated and is never a fallback for API failure.
- Real records are retrieved, analyzed and persisted by Python. No fabricated results on startup.

## Architecture
`React + htm + Three.js → same-origin FastAPI → Open-Meteo historical ERA5 → Python detector → NoSQL documents → JSON readback`

Frontend sources are in `frontend/src/`; `htm` provides HTML-style tagged templates that create React elements, with ordinary React hooks. Vite bundles all dependencies. `app/static/` contains the prebuilt production HTML/CSS/JS and assets served by FastAPI. `app/analysis.py` is the server-side detector. `app/main.py` provides ingestion, caching, storage, validation, rate limiting and exports.

For real analyses the browser sends `POST /api/analyses`, then reads the persisted result with `GET /api/analyses/{id}`. It displays the Python summary directly. The browser detector is only used for explicitly selected demonstration mode or imported CSVs.

## Database choices
Default: TinyDB, an embedded JSON document database in `data/documents.json`. It stores raw daily weather and full analysis documents separately. Reads/writes are serialized within one process. Use **one Uvicorn worker** with TinyDB.

MongoDB: set the `MONGODB_URI` environment variable before startup. Connection failure is explicit; the app does not silently switch storage. MongoDB weather and analysis collections have unique key indexes. `DATA_DIR` changes the local data directory.

Run the full MongoDB stack with Docker:
```
docker compose up --build
```
Open http://127.0.0.1:8000. Compose keeps MongoDB on its internal network and persists both services' data using named volumes. `docker compose down` stops containers while retaining volumes. Docker/MongoDB deployment configuration is provided but was not executed in the development environment.

## Frontend development
Install Node 22+ and run, in one terminal:
```
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
In another:
```
cd frontend
npm ci
npm run dev
```
Vite proxies `/api` to port 8000. Build changes with `npm run build`; this regenerates `app/static/`. Open the served site through HTTP, not by double-clicking `index.html`. API documentation is at http://127.0.0.1:8000/docs.

## Data and methodology
Data source: https://open-meteo.com/en/docs/historical-weather-api

Daily maximum temperature and precipitation from the **ERA5** model, Celsius/mm, using GMT calendar days. ERA5 is gridded reanalysis rather than station observations. The provider-returned grid coordinate and retrieval time are retained. No API key is required for the public endpoint; provider quotas and terms still apply.

- **Heatwaves:** at least three consecutive days strictly above the 95th percentile of valid daily maximum temperature in the fixed 1961–1990 baseline. The annual pooled threshold is summer-biased and is not an official IMD definition.
- **Heavy precipitation:** consecutive days strictly above the 95th percentile of baseline wet days (≥1 mm/day). At least 30 wet days are needed. Includes snow water equivalent; not a flood model.
- **Dry spells:** at least 14 consecutive days below 1 mm/day precipitation. A screening proxy, not a drought diagnosis.
- Detection proceeds continuously from the earlier of 1961 or the selected start year through the selected last year. The full 1961–1990 baseline is always retrieved, including for earlier analysis periods.
- Event starts count in the starting calendar year. Hazard days are split into their own calendar year/month. The full length of a cross-year run contributes to the longest-run metric for each year it touches. Events at the final data boundary are flagged as truncated.
- The percentage comparison uses the first and last five-year means, requires ten years, and omits percentages with zero initial mean. OLS slope and R² are descriptive; no significance, confidence interval or attribution is claimed.

### Data quality
A complete daily calendar is constructed. Invalid dates are rejected; duplicate dates use the last supplied record. Nonnumeric values, temperatures outside −90 to 65°C and precipitation outside 0 to 3,000 mm/day become missing. Missing days break runs; they are never zero-filled. Baseline and annual coverage must reach 90%. Low-coverage years remain visible in event records but are excluded from headline totals, fits and rolling means. The PDF compact bar chart shows those excluded annual values as zero with an explicit note; its table includes the coverage/inclusion flags.

## API
| Method | Route | Purpose |
|---|---|---|
| GET | `/api/health` | Version, storage and health |
| POST | `/api/analyses` | Retrieve/cache weather; compute/persist analysis |
| GET | `/api/analyses/{id}` | Read persisted full analysis |
| GET | `/api/analyses` | List up to 30 recent analyses |
| GET | `/api/analyses/{id}/export/csv` | Annual CSV |
| GET | `/api/analyses/{id}/export/json` | Complete analysis JSON |
| GET | `/api/analyses/{id}/export/pdf` | Python PDF report |

Example POST body:
```json
{"region":{"name":"Hyderabad, Telangana, India","country":"India","state":"Telangana","city":"Hyderabad","lat":17.3616667,"lon":78.4747222},"start":1990,"end":2025,"hazard":"heat","mode":"backend"}
```

## Security and performance
Requests validate finite bounded coordinates, hazard enums, year order and full calendar years. Only a fixed HTTPS weather endpoint is used; user-controlled upstream hosts and redirects are disallowed. Provider units and parallel-array lengths are checked. Weather retrieval has a 115-second overall deadline and bounded retries for transient HTTP failures. Three concurrent analyses are allowed per process. Weather and analysis caches expire after 30 days; old documents remain available for explicit readback. Rate limits: 8 writes and 120 reads/minute/client IP, with bounded client bookkeeping. Browser requests time out after 135 seconds.

This is an unauthenticated research app: shared-host users can read analyses by ID or recent list. Local launch binds only to loopback. Before public multi-user deployment, add user ownership/authentication if analyses need privacy, shared rate limiting, per-key request coalescing and proxy-aware edge controls. TinyDB serialization/rate limits are process-local. MongoDB is the supported alternative for larger deployments. Cache cleanup and job queues are future work.

Assets/fonts are local. GPU pixel ratio is capped; rendering pauses when the tab or globe is not visible. Three.js is separated into its own bundle. Live weather failure is visible and retains prior results, with no automatic synthetic substitution.

## Tests and delivery verification
```
python -m pytest -q
cd frontend
npm test
npm run build
```
- 16 backend/launcher tests passed: heat/rain/dry detection, missing days, cross-year events, strict thresholds, duplicates, bad baseline, pre-1961 ranges, validation, units, provider failure, persistent cache reuse, readback, rate limits and all server exports. Tests use isolated temporary databases.
- 7 DOM smoke checks passed: initial empty state, navigation, POST/GET integration, authoritative Python result rendering, chart controls, changed-selection notice and provenance/export page.
- Production build passed.
- Real Open-Meteo calls for New Delhi, 1990–2025, returned HTTP 200 for all three hazards: heat threshold 41.7°C / 77 events / 477 days; precipitation threshold 23.8 mm / 124 events / 161 days; dry threshold 1 mm / 203 events / 6,821 days. These are recorded delivery checks, not injected UI values.
- HTML, Earth image and local font routes returned HTTP 200.
- DOM tests are not graphical browser tests. WebGL visuals, frame rate, Windows launcher execution, Docker/MongoDB runtime and public hosting were not verified in this environment. No public deployment or GitHub repository is included.

## Submission and improvement notes
The confidential assignment PDF is excluded. This package contains source, a compiled frontend, tests and deployment configuration. For submission, create your code repository and deploy to a Python/container host; static-only hosts cannot run this backend. Set the host's port through `PORT`, attach persistent data storage or MongoDB, and health-check `/api/health`.

Future work: seasonally varying thresholds, area-weighted polygons, uncertainty estimates, Mann–Kendall with autocorrelation handling, background jobs/progress, cache retention policy and graphical end-to-end checks on mobile and desktop GPUs.

## AI disclosure and attribution
OpenAI ChatGPT/Codex was used to inspect the user-supplied AETHER HTML reference, refactor its React/Three.js interface, integrate and improve the Python API, implement tests, and prepare documentation. The reference design, locally embedded fonts and Earth texture were reused. Read and understand the code before an interview or submission. Full third-party notices are in `THIRD_PARTY_NOTICES.txt`; font licenses are retained. Weather source: Open-Meteo / Copernicus ERA5, with attribution and terms linked in the interface.

### Launcher fix
The previous launcher could open an unrelated existing service on port 8000. This version reserves its socket before starting, uses port 8010 or the next available port, verifies an AETHER instance ID, and prevents caching of the root HTML and health response.
