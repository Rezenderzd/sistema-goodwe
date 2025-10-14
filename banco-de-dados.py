import pyodbc
from flask import Flask, request, jsonify
from flask_cors import CORS #importa o cors para permitir requisicão de outros dominios

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

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
print("✅ Conectado ao banco:", cursor.fetchone()[0]) #confirma se o banco de dados está funcionando

def criar_tabela():
    cursor.execute("""
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        email NVARCHAR(100) UNIQUE NOT NULL,
        senha VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT GETDATE()
    )
    """)
    conn.commit()
    print("✅ Tabela 'users' pronta.")


@app.route('/users', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
    if cursor.fetchone():
        return jsonify({'error': 'Email já cadastrado'}), 409

    cursor.execute(
        "INSERT INTO users (email, senha) VALUES (?, ?)",
        (email, senha)
    )
    conn.commit()
    cursor.execute("SELECT @@IDENTITY AS id")
    user_id = cursor.fetchone()[0]

    return jsonify({'id': user_id, 'message': 'Email cadastrada com sucesso!'}), 201

@app.route('/buscarLogin', methods = ['POST'])
def bucarEmail():
    data = request.get_json()
    email = data.get('emailLogin')
    senha = data.get('senhaLogin')

    cursor.execute("SELECT id, senha FROM users WHERE email=?",(email,))
    row = cursor.fetchone()

    if not row:
        return jsonify({'error': 'Email não cadastrado'})
    senhaCerta = row [1]
    if senhaCerta == senha:
        return jsonify({'message': 'Bem vindo aos serviços Goodwe!', 'error': ''})
    else:
        return jsonify({'error': 'Email ou senha inválidos'})



if __name__ == '__main__':
    criar_tabela()
    app.run(debug=True, port=5003)
