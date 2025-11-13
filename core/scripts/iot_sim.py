#!/usr/bin/env python3
"""Simple IoT simulator for holo.work.

Reads INGEST_URL, DEVICE_ID, DEVICE_SECRET from env and pushes env readings every 5s.
"""

from __future__ import annotations

import json
import os
import random
import time
import urllib.error
import urllib.request

INGEST_URL = os.getenv("INGEST_URL")
DEVICE_ID = os.getenv("DEVICE_ID")
DEVICE_SECRET = os.getenv("DEVICE_SECRET")

if not INGEST_URL or not DEVICE_ID or not DEVICE_SECRET:
  raise SystemExit("Set INGEST_URL, DEVICE_ID and DEVICE_SECRET env vars")

HEADERS = {
  "Content-Type": "application/json",
  "X-Device-Secret": DEVICE_SECRET,
}

print(f"→ streaming telemetry to {INGEST_URL} for {DEVICE_ID}")

while True:
  payload = {
    "device_id": DEVICE_ID,
    "t_c": round(random.uniform(20.0, 32.0), 2),
    "noise_db": round(random.uniform(40.0, 75.0), 1),
    "lux": round(random.uniform(60.0, 600.0), 0),
    "ts": int(time.time() * 1000),
  }
  data = json.dumps(payload).encode("utf-8")
  req = urllib.request.Request(INGEST_URL, data=data, headers=HEADERS, method="POST")
  try:
    with urllib.request.urlopen(req, timeout=10) as resp:
      if resp.status != 200:
        print(f"! ingest failed status={resp.status}")
      else:
        print(f"✓ sent {payload}")
  except urllib.error.HTTPError as exc:
    print(f"HTTP {exc.code}: {exc.read().decode('utf-8', 'ignore')}")
  except urllib.error.URLError as exc:
    print(f"Request failed: {exc}")
  time.sleep(5)
