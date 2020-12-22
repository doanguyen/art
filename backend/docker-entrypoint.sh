#!/bin/sh
poetry install --no-root && python manage.py migrate
gunicorn --reload -w 2 -b 0.0.0.0:8000 core.wsgi