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
MODELO_ESCOLHIDO = "gemini-2.5-flash"


prompt_sistema = "Você é uma assistente que responde dúvidas referentes a condições climáticas. Caso a pergunta não se enquadre, responda 'Não tenho conhecimento sobre esse assunto'"

llm = genai.GenerativeModel(
    model_name=MODELO_ESCOLHIDO,
    system_instruction=prompt_sistema
)

@app.route('/iaDuvidas', methods=['POST']) #define a rota /iaDuvidas que só aceita o método post
def ia_duvidas():
    data = request.get_json()
    pergunta = data.get("pergunta", "")
    
    resposta = llm.generate_content(pergunta)
    texto_resposta = getattr(resposta, "text", "Não foi possível gerar resposta")  #pega o texto da resposta e gera uma mensagem de erro caso não exista resposta
    
    return jsonify({"resposta": texto_resposta}) #retorna a resposta em formato json

if __name__ == "__main__":
    app.run(debug=True,port=5001) #inicia o servidor flask em modo debug na porta 5001
