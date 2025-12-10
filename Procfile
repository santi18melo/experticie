web: gunicorn --chdir src/backend wsgi:application --workers 2 --worker-class sync --bind 0.0.0.0:$PORT --log-file - --access-logfile - --error-logfile -
release: python src/backend/manage.py migrate --noinput
worker: celery -A src.backend worker --loglevel=info
