#!/bin/sh

CHROME_PATH=$(find /opt -type f -name chrome | head -n 1)

echo "Using Chromium at: $CHROME_PATH"

exec $CHROME_PATH \
  --headless=new \
  --no-sandbox \
  --disable-gpu \
  --disable-dev-shm-usage \
  --remote-debugging-address=0.0.0.0 \
  --remote-debugging-host=0.0.0.0 \
  --remote-debugging-port=9222 \
  --remote-allow-origins=* \
  --user-data-dir=/tmp/chrome-profile \
  about:blank