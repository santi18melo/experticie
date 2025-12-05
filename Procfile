web: gunicorn --chdir backend wsgi:application --log-file -
release: python backend/manage.py migrate
