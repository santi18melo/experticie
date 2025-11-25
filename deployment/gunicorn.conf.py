# Gunicorn Configuration File for PREXCOL Backend
# Place this file in the project root or specify path with --config flag

import multiprocessing

# Server Socket
bind = "127.0.0.1:8000"  # Bind to localhost (Nginx will proxy)
# bind = "unix:/opt/prexcol-backend/gunicorn.sock"  # Alternative: Unix socket

# Worker Processes
workers = multiprocessing.cpu_count() * 2 + 1  # Recommended: (2 x $num_cores) + 1
worker_class = "sync"  # Use 'gevent' or 'eventlet' for async
worker_connections = 1000
max_requests = 1000  # Restart workers after this many requests (prevents memory leaks)
max_requests_jitter = 50  # Randomize restart to avoid all workers restarting at once
timeout = 30  # Workers silent for more than this are killed and restarted

# Logging
accesslog = "/var/log/prexcol/gunicorn_access.log"
errorlog = "/var/log/prexcol/gunicorn_error.log"
loglevel = "info"  # debug, info, warning, error, critical
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# Process Naming
proc_name = "prexcol_backend"

# Server Mechanics
daemon = False  # Don't daemonize (systemd will manage the process)
pidfile = "/var/run/prexcol/gunicorn.pid"
user = "prexcol"  # Run as this user
group = "prexcol"  # Run as this group
umask = 0o007

# Security
limit_request_line = 4094
limit_request_fields = 100
limit_request_field_size = 8190

# Development Settings (comment out in production)
# reload = True  # Auto-reload on code changes
# reload_extra_files = []
