import os
import pyodbc
from flask import Flask, request, jsonify 
import google.generativeai as genai 
from dotenv import load_dotenv 
from flask_cors import CORS 

load_dotenv()

app = Flask(__name__)
CORS(app)
conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=26.110.27.94\\SQLEXPRESS,1433;'  # IP + porta
    'DATABASE=Goodwe;'
    'UID=Rezende;'
    'PWD=Guigui2007;'
    'TrustServerCertificate=yes;'
)
cursor = conn.cursor()
cursor.execute("SELECT DB_NAME() AS NomeDoBanco")
print("✅ Conectado ao banco:", cursor.fetchone()[0])

CHAVE_API_KEY = os.getenv("API_GEMINI_KEY")
genai.configure(api_key=CHAVE_API_KEY)
MODELO_ESCOLHIDO = "gemini-2.5-flash"

prompt_sistema = "Você analisará os dados do cliente e tentará identificar padrões.Seja simples, objetivo e não fale sobre  os arrays, fale como ocorrências.Lemrbre-se que os padrões precisam ser algo claro e nitido na análise, não ocorrencias aleatórias.Além disso, os comandos sempre serão os mesmos (ligado e desligado), correlacione tanto os horários quanto os comandos para tentar  encontrar algo. Exemplo: 'O cliente sempre liga o modo às 18:00' ou 'O cliente sempre desliga entre 21:00 e 22:30'. Caso não haja padrões notórios, responda somente 'Não é possível automatizar.'"

llm = genai.GenerativeModel(
    model_name=MODELO_ESCOLHIDO,
    system_instruction=prompt_sistema
)

@app.route('/machineLearning', methods = ['POST'])
def identificando_padroes():
    dados = request.get_json()
    email = dados.get('usuario')
    cursor.execute('SELECT comando, horario_comando FROM consumo WHERE email=?',(email,))
    rows = cursor.fetchall()
    horario = [row[1] for row in rows]
    comando = [row[0] for row in rows]
    prompt_usuario = f'Faça uma análise dos arrays que serão passados e veja se há algum insight de padrão: {horario}, {comando} (o horario na posição 1 representa o comando na posição 1 e assim por diante)'
    resposta = llm.generate_content(prompt_usuario)
    return jsonify({"resposta": resposta.text})


if __name__ == "__main__":
    app.run(debug=True, port=5005)
