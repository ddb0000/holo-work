#!/usr/bin/env bash
set -euo pipefail
BASE_URL=${BASE_URL:-"http://127.0.0.1:8787"}
EVIDENCES_FILE=${EVIDENCES_FILE:-"./docs/evidencias.txt"}
EMAIL="e2e-$(date +%s)@holo.work"
PASSWORD="devpass"
ROOM="room-holo"
log() {
  echo "[$(date '+%H:%M:%S')] $*" | tee -a "$EVIDENCES_FILE"
}
rm -f "$EVIDENCES_FILE"
log "# BASE_URL=$BASE_URL"
log "# register"
curl -sS "$BASE_URL/api/auth/register" \
  -H 'content-type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" | tee -a "$EVIDENCES_FILE"
JWT=$(curl -sS "$BASE_URL/api/auth/login" \
  -H 'content-type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" | tee -a "$EVIDENCES_FILE" | jq -r .jwt)
log "# join room"
curl -sS "$BASE_URL/api/rooms/$ROOM/join" -H "authorization: Bearer $JWT" -X POST | tee -a "$EVIDENCES_FILE"
log "# post message"
curl -sS "$BASE_URL/api/rooms/$ROOM/messages" \
  -H "authorization: Bearer $JWT" \
  -H 'content-type: application/json' \
  -d '{"body":"hello from e2e"}' | tee -a "$EVIDENCES_FILE"
log "# ingest sample"
curl -sS "$BASE_URL/api/iot/ingest" \
  -H 'content-type: application/json' \
  -H 'X-Device-Secret: DEVSECRET123' \
  -d '{"device_id":"device-holo-01","t_c":25,"noise_db":55,"lux":300}' | tee -a "$EVIDENCES_FILE"
log "# fetch suggestions"
curl -sS "$BASE_URL/api/rooms/$ROOM/suggestions" -H "authorization: Bearer $JWT" | tee -a "$EVIDENCES_FILE"
