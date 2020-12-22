FROM python:3.8

WORKDIR /app
RUN pip install poetry

COPY manage.py pyproject.toml poetry.lock /app/
RUN poetry config virtualenvs.create false && poetry install --no-root

EXPOSE 8000

CMD ["./docker-entrypoint.sh"]