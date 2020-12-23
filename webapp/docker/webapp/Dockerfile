FROM tiangolo/uwsgi-nginx-flask:python3.7

COPY ./app /app

COPY ./requirements.txt ./

RUN pip wheel --wheel-dir=/root/wheels -r requirements.txt

RUN pip install --no-index --find-links=/root/wheels -r requirements.txt



