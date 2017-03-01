from celery import Celery
import subprocess
app = Celery('phantomjs')
app.config_from_object('celeryconfig')
@app.task
def add(x, y):
    return x+y

@app.task
def get_cookie(email, password):
    args = ['/usr/local/bin/phantomjs','get_cookie/main.js',email,password]
    result = subprocess.check_output(args)
    result = result.decode('utf-8').strip()
    return result

