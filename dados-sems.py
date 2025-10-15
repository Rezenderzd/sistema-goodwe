from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Lê o Excel usando a terceira linha como cabeçalho (index 2)
df = pd.read_excel(".\\dadosSems.xls", header=2)

# Remove espaços extras dos nomes das colunas
df.columns = df.columns.str.strip()

# Define a coluna Time como índice
df = df.set_index("Time")

# Converte índice para datetime
df.index = pd.to_datetime(df.index, dayfirst=True)

# Resample por hora
df_hourly = df.resample("1h").mean()

# Extrair os dados em arrays
soc = df_hourly["SOC(%)"].round(2).tolist()


@app.route("/dados")
def dados():
    return jsonify({
        "informacaoSoc": soc,
    })

if __name__ == "__main__":
    app.run(port=5002)
