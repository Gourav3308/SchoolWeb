#!/bin/sh
set -e

: "${PORT:=8080}"

if [ -f /etc/nginx/templates/default.conf.template ]; then
  envsubst '\$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
fi

exec nginx -g 'daemon off;'


