FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine

RUN apk add --no-cache linux-headers g++ gcc python3-dev musl-dev

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY ./app /app