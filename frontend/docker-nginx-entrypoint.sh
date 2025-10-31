#!/bin/sh
set -e

# Ensure defaults without executing their values as commands
: "${PORT:=8080}"

# Default BACKEND_URL if not provided (keeps current working value)
# Updated to the currently active backend service URL
: "${BACKEND_URL:=https://schoolweb-1-homv.onrender.com}"

if [ -f /etc/nginx/templates/default.conf.template ]; then
  envsubst '\$PORT\$BACKEND_URL' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
fi

echo "Listing /usr/share/nginx/html before start:"
ls -la /usr/share/nginx/html || true

exec nginx -g 'daemon off;'


