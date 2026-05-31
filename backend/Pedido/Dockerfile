FROM python:3.10

WORKDIR /app

# Solo copiar requirements primero
COPY requirements.txt .

RUN pip install --default-timeout=100 --no-cache-dir -r requirements.txt

# Luego copiar el resto
COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8003"]