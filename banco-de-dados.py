import pyodbc
from flask import Flask, request, jsonify
import psycopg2
from psycopg2 import pool

app = Flask(__name__)

conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=26.38.146.86,1433;'  # IP + porta
    'DATABASE=Goodwe;'
    'UID=Raphael;'
    'PWD=Flamengo123!;'
    'TrustServerCertificate=yes;'
)

cursor = conn.cursor()
cursor.execute("SELECT DB_NAME() AS NomeDoBanco")
print("✅ Conectado ao banco:", cursor.fetchone()[0])

def criar_tabela():
    cursor.execute("""
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        cidade VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT GETDATE()
    )
    """)
    conn.commit()
    print("✅ Tabela 'users' pronta.")


@app.route('/api/users', methods=['POST'])
def register():
    data = request.get_json()
    cidade = data.get('nomeCidade')

    cursor.execute("SELECT id FROM users WHERE cidade = ?", (cidade,))
    if cursor.fetchone():
        return jsonify({'error': 'Cidade já cadastrada'}), 409

    cursor.execute(
        "INSERT INTO users (cidade) VALUES (?)",
        (cidade,)
    )
    conn.commit()

    return jsonify({'message': 'Cidade cadastrada com sucesso!'}), 201


if __name__ == '__main__':
    criar_tabela()
    app.run(debug=True, port=3000)


