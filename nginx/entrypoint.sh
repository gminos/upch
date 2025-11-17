#!/bin/sh

set -e

envsubst '${DOMAIN}' </etc/nginx/conf.d/default.conf.template >/etc/nginx/conf.d/default.conf

exec "$@"
