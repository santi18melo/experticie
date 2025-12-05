web: cd backend && python manage.py migrate --noinput && cd .. && gunicorn --chdir backend wsgi:application --log-file -
release: python backend/manage.py migrate --noinput
