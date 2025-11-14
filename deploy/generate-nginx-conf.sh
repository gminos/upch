#!/bin/bash

set -e

BASE_DIR="$(cd "$(dirname "$0")/.." && pwd)"

DOMAIN="cambia_por_tu_dominio"

TEMPLATE_PATH="$BASE_DIR/nginx/default.conf.template"
OUTPUT_PATH="$BASE_DIR/nginx/default.conf"

echo "Generando archivo Nginx..."
echo "Template: $TEMPLATE_PATH"
echo "Output:   $OUTPUT_PATH"

DOMAIN=$DOMAIN \
  envsubst '${DOMAIN}' \
  <"$TEMPLATE_PATH" \
  >"$OUTPUT_PATH"

echo "Archivo generado en: $OUTPUT_PATH"
