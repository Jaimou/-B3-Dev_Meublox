FROM python:3.10

WORKDIR /server

COPY ./requirements.txt /server/
COPY ./.env /server/

RUN pip install --no-cache-dir --upgrade -r /server/requirements.txt

COPY ./app /server/app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
