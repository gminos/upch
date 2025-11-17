#!/bin/bash

set -e

echo "tranqui... se esta esperando la base datos"
while ! nc -z db 5432; do
  sleep 1
done

echo "se empieza a aplicar migraciones"
uv run python manage.py migrate --verbosity 0

if [ "$DJANGO_ENV" == "production" ]; then
  echo "generando los staticfiles... calmado"
  uv run python manage.py collectstatic --noinput --verbosity 0
else
  echo "modo desarrollo no se generan los staticfiles"
fi

echo "se va a iniciar el servidor Django"
exec "$@"
