#!/bin/sh
set -e

echo "Generando archivo Nginx en /etc/nginx/conf.d/default.conf con DOMAIN=${DOMAIN}..."
envsubst '${DOMAIN}' </etc/nginx/conf.d/default.conf.template >/etc/nginx/conf.d/default.conf
echo "Archivo generado correctamente. Contenido final:"
cat /etc/nginx/conf.d/default.conf

exec "$@"
