web: cd src/backend && python manage.py migrate --noinput && cd ../.. && gunicorn --chdir src/backend wsgi:application --log-file -
release: python src/backend/manage.py migrate --noinput
