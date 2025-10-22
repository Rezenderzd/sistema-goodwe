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
        return jsonify({'error': 'Email ou senha inválidos'})
    senhaCerta = row [1]
    if senhaCerta == senha:
        return jsonify({'message': 'Bem vindo aos serviços Goodwe!', 'error': ''})
    else:
        return jsonify({'error': 'Email ou senha inválidos'})



def criar_tabela_consumo(): #consumo_total INT,
    cursor.execute("""
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='consumo' AND xtype='U')
    CREATE TABLE consumo (
        id INT IDENTITY(1,1) PRIMARY KEY,
        user_id INT,
        email NVARCHAR(100) NOT NULL,
        comando VARCHAR(100) NOT NULL,
        horario_comando DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (email) REFERENCES users(email)
    )
    """)
    conn.commit()
    print("✅ Tabela 'consumo' pronta.")

@app.route('/consumo', methods =['POST'])
def atualizando_consumo():
    data = request.get_json()
    acao = data.get('acao')
    email = data.get('email')
    try:
        cursor.execute('SELECT id FROM users WHERE email=?',(email,))
        row = cursor.fetchone()
        if not row:
            return jsonify({'error':'Usuário não encontrado'}), 404

        id = row[0]
        cursor.execute('INSERT INTO consumo (user_id, email, comando) VALUES (?, ?, ?)',(id,email,acao))
        conn.commit()
        return jsonify({'message': f'Modo de energia {acao} com sucesso', 'error':''})
    except Exception as e:
        print("Erro no /consumo:", e)
        return jsonify({'error':f'Houve um erro ao {acao} o modo'})
    
def criar_tabela_prioridade():
    cursor.execute("""
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='prioridade' AND xtype='U')
        CREATE TABLE prioridade (
            id INT IDENTITY(1,1) PRIMARY KEY,
            user_id INT,
            email NVARCHAR(100) NOT NULL,
            nome_item VARCHAR(100) NOT NULL,
            prioridade_item INT NOT NULL,
            horario_comando DATETIME DEFAULT GETDATE(),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (email) REFERENCES users(email)
        )
        """)
    conn.commit()
    print("✅ Tabela 'prioridade' pronta.")

@app.route('/listaItens', methods = ['POST'])   
def pegandoitens():
    data = request.get_json()
    email = data.get('email')
    cursor.execute('SELECT nome_item, prioridade_item FROM prioridade WHERE email=?',(email,))
    linhaItens = cursor.fetchall()
    nomeItem = [linha[0] for linha in linhaItens]
    prioridadeItem = [linha[1] for linha in linhaItens]
    return jsonify({'nomes': nomeItem, 'prioridades': prioridadeItem})

@app.route('/prioridade', methods  = ['POST'])
def verificarPrioridade():
    data = request.get_json()
    email = data.get('email')
    nomeItem = data.get('item')
    prioridade = data.get('prioridade')
    try:
        cursor.execute('SELECT prioridade_item FROM prioridade WHERE nome_item=? AND email=?', (nomeItem, email))
        row = cursor.fetchone()
        if row:
            cursor.execute('UPDATE prioridade SET prioridade_item=? WHERE email=? AND nome_item=?',(prioridade, email, nomeItem))
            conn.commit()
            cursor.execute('SELECT nome_item, prioridade_item FROM prioridade WHERE email=?',(email,))
            linhaItens = cursor.fetchall()
            nomeItem = [linha[0] for linha in linhaItens]
            prioridadeItem = [linha[1] for linha in linhaItens]
            return jsonify({'message':'Prioridade atualizada com sucesso!', 'error':'', 'nomes': nomeItem, 'prioridades': prioridadeItem})
        else:
            cursor.execute('SELECT id FROM users WHERE email=?',(email,))
            id = cursor.fetchone()
            idUsuario = id[0]
            cursor.execute('INSERT INTO prioridade (user_id, email, nome_item, prioridade_item) VALUES (?, ?, ?, ?)',(idUsuario, email, nomeItem, prioridade))
            conn.commit()
            cursor.execute('SELECT nome_item, prioridade_item FROM prioridade WHERE email=?',(email,))
            linhaItens = cursor.fetchall()
            nomeItem = [linha[0] for linha in linhaItens]
            prioridadeItem = [linha[1] for linha in linhaItens]
            return jsonify({'message':'Item adicionado com sucesso!', 'error':'','nomes': nomeItem, 'prioridades': prioridadeItem})
    except Exception as e:
        print(f"Erro:{e}")    
        return jsonify({'message': '', 'error': f'Erro ao executar a ação: {e}'})
    
@app.route('/excluir', methods=['POST'])
def excluir_itens():
    try:
        data = request.get_json()
        email = data.get('usuario')
        item = data.get('itemDiminuitivo')
        cursor.execute('DELETE FROM prioridade WHERE email=? AND nome_item=?',(email,item))
        conn.commit()
        cursor.execute('SELECT nome_item, prioridade_item FROM prioridade WHERE email=?',(email,))
        linhaItens = cursor.fetchall()
        nomeItem = [linha[0] for linha in linhaItens]
        prioridadeItem = [linha[1] for linha in linhaItens]
        return jsonify({'message':'Item excluido com sucesso!', 'error': '', 'nomes': nomeItem, 'prioridades': prioridadeItem})
    except Exception as e:
        print(f'Erro: {e}')
        return jsonify({'message':'', 'error': 'Erro ao excluir item'})




if __name__ == '__main__':
    criar_tabela()
    criar_tabela_consumo()
    criar_tabela_prioridade()
    app.run(debug=True, port=5003)
