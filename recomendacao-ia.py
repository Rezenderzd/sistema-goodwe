import os #utilizado para acessar variaveis do sistema (nesse caso utilizado para pegar a chave da api)
from flask import Flask, request, jsonify # importa Flask para criar o servidor web e funções auxiliares
import google.generativeai as genai #biblioteca da API gemini
from dotenv import load_dotenv #carrega as variaveis de ambiente de um arquivo .env
from flask_cors import CORS #importa o cors para permitir requisicão de outros dominios

load_dotenv()

app = Flask(__name__) # cria uma instância da aplicação Flask
CORS(app)  # habilita CORS para o frontend (habilitando a requisição do front ao back)

# Configuração da API Gemini
CHAVE_API_KEY = os.getenv("API_GEMINI_KEY")
genai.configure(api_key=CHAVE_API_KEY)
MODELO_ESCOLHIDO = "gemini-1.5-flash"

prompt_sistema = "Você será uma analista de clima e determinará  para o usuário através dos dados recebidos se é recomendado a economia de energia e o por que. Seria necessário economizar energia se há situações que possam ocasionar quedas de energia na residência. Leve em consideração itens da api que possam influenciar nessa situação, como raios uv, fortes chuvas entre outros.Caso não haja o parâmetro cidade, diga que não é possível saber devido a falta da cidade a ser analisada. Não utilize os termos em inglês presentes na API na resposta, apenas escreva em português e não utilize palavras em negrito"

llm = genai.GenerativeModel(
    model_name=MODELO_ESCOLHIDO,
    system_instruction=prompt_sistema
)

@app.route('/iaRecomendacao', methods=['POST']) #define a rota /iaDuvidas que só aceita o método post


def ia_recomendacao():
    dados = request.get_json()
    nome_cidade = dados.get("cidade")

    url_weather = f"http://api.weatherapi.com/v1/forecast.json?key=c4c8e26e03c74508b2b141838251208&q={nome_cidade}&days=1"

    import requests
    dados_clima = requests.get(url_weather).json()

    prompt_usuario = f"Na minha cidade {nome_cidade}, diga se através desses dados {dados_clima} é necessário economizar energia para uma possível queda e por que. Caso não seja necessário, diga que não há necessidade de economizar."

    resposta = llm.generate_content(prompt_usuario)
    return jsonify({"resposta": resposta.text})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
