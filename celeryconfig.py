import os
broker_url = os.environ.get('CELERY_BROKER_URL', 'amqp://')
imports = ('tasks',)
result_backend = os.environ.get('CELERY_BROKER_URL', 'amqp://')
