#!/bin/sh
set -e

:# Ensure defaults without executing their values as commands
: "${PORT:=8080}"

# Default BACKEND_URL if not provided (keeps current working value)
: "${BACKEND_URL:=https://schoolweb-r87b.onrender.com}"

if [ -f /etc/nginx/templates/default.conf.template ]; then
  envsubst '\$PORT\$BACKEND_URL' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
fi

echo "Listing /usr/share/nginx/html before start:"
ls -la /usr/share/nginx/html || true

exec nginx -g 'daemon off;'


