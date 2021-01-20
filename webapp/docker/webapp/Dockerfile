FROM dan0n/flask-alpine:python3.6

RUN apk add --no-cache linux-headers g++ gcc python3-dev musl-dev

COPY ./requirements.txt .

RUN pip install --upgrade pip
RUN pip3 install -r requirements.txt

COPY ./app /app