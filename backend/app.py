from flask import Flask, render_template, request, redirect, url_for, session,jsonify,send_file
from flask_cors import CORS
import jwt
from flask_mysqldb import MySQL
from flask_bcrypt import check_password_hash, generate_password_hash
import MySQLdb.cursors
import re
from passlib.hash import sha256_crypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import extract
import datetime

app = Flask(__name__)

app.secret_key = 'workspace'

# Enter your database connection details below
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'db_prm'
CORS(app)

mysql = MySQL(app)



@app.route('/api/signin', methods=['POST'])
def login():
    print("hello")
    data = request.get_json()
    email = data['email']
    password = data['password']
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM users WHERE email = %s",[email])
    account = cursor.fetchone()
    print(account is None)
    if account is None:
        return jsonify({'data': 'Invalid username or password', 'status': False}),200
    else:
        if check_password_hash(account['password'], password):
            # token = jwt.encode({'email': account['email']}, app.config['SECRET_KEY'], algorithm='HS256')
            return jsonify({ 'status': True}),200
        else : 
            return jsonify({'data': 'Invalid username or password', 'status': False}),401
        

@app.route('/api/signup', methods=['POST'])
def register():
    msg=''
    email = request.json['email']
    username = request.json['user']
    password = generate_password_hash(request.json['password'])
    print("23423423423423",password)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
    account = cursor.fetchone()
    print('login',account)
    if account != None:
        msg = 'Account already exists!'
        return jsonify({'data':msg, 'status': False})
    else:
        cursor.execute('INSERT INTO users VALUES ( %s, %s, %s)', (username, email, password))
        mysql.connection.commit()
        msg = 'You have successfully registered!'
        return jsonify({'data':msg, 'status': True})

    


@app.route('/api/curvas/', methods=['GET'])
def getAllCurvas():
        print("get all curvas")
  
    # try: 
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM curva_fwd1')
        curvas =  cursor.fetchall()
        # print(curvas)
        return jsonify(curvas)
    # # except:
    #     console.error('Erro ao buscar curvas:', error);
    #     return res.status(500).json({ error: 'Erro ao buscar curvas' });
    
@app.route('/api/curvas/sudeste', methods=['GET'])
def getCurvaSudesteConv():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("""
        SELECT data, data_fwd, submercado, conv, i0, i50, i100, preco_conv, preco_i0, preco_i50, preco_i100
        FROM curva_fwd1
        WHERE submercado = 'S' AND (MONTH(data_fwd) = 01 OR MONTH(data_fwd) = 04 OR MONTH(data_fwd) = 08 OR MONTH(data_fwd) = 12)
        """)
        curvas =  cursor.fetchall()
        for curva in curvas:
            curva['data'] = curva['data'].strftime('%Y-%m-%d')
            curva['data_fwd'] = curva['data_fwd'].strftime('%Y-%m-%d')
        print("len(curvas)", len(curvas))
        if curvas and len(curvas)>0:
             return jsonify(curvas)
        else:
             return jsonify({'error':"Dados não encontrados"})

@app.route('/api/curvas/sudeste1', methods=['GET'])
def getCurvaSudeste1Conv():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("""
        SELECT data, data_fwd, submercado, conv, i0, i50, i100, preco_conv, preco_i0, preco_i50, preco_i100
        FROM curva_fwd1
        WHERE submercado = 'SE' AND (MONTH(data_fwd) = 01 OR MONTH(data_fwd) = 04 OR MONTH(data_fwd) = 08 OR MONTH(data_fwd) = 12)
        """)
        curvas =  cursor.fetchall()
        for curva in curvas:
            curva['data'] = curva['data'].strftime('%Y-%m-%d')
            curva['data_fwd'] = curva['data_fwd'].strftime('%Y-%m-%d')
        print("len(curvas)", len(curvas))
        if curvas and len(curvas)>0:
             return jsonify(curvas)
        else:
             return jsonify({'error':"Dados não encontrados"})     


@app.route('/api/curvas/nordeste', methods=['GET'])
def getCurvaNordesteConv():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("""
        SELECT data, data_fwd, submercado, conv, i0, i50, i100, preco_conv, preco_i0, preco_i50, preco_i100
        FROM curva_fwd1
        WHERE submercado = 'NE' AND (MONTH(data_fwd) = 01 OR MONTH(data_fwd) = 04 OR MONTH(data_fwd) = 08 OR MONTH(data_fwd) = 12)
        """)
        curvas =  cursor.fetchall()
        for curva in curvas:
            curva['data'] = curva['data'].strftime('%Y-%m-%d')
            curva['data_fwd'] = curva['data_fwd'].strftime('%Y-%m-%d')
        print("len(curvas)", len(curvas))
        if curvas and len(curvas)>0:
             return jsonify(curvas)
        else:
             return jsonify({'error':"Dados não encontrados"})


@app.route('/api/curvas/norte', methods=['GET'])
def getCurvaNorteConv():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("""
        SELECT data, data_fwd, submercado, conv, i0, i50, i100, preco_conv, preco_i0, preco_i50, preco_i100
        FROM curva_fwd1
        WHERE submercado = 'N' AND (MONTH(data_fwd) = 01 OR MONTH(data_fwd) = 04 OR MONTH(data_fwd) = 08 OR MONTH(data_fwd) = 12)
        """)
        curvas =  cursor.fetchall()
        for curva in curvas:
            curva['data'] = curva['data'].strftime('%Y-%m-%d')
            curva['data_fwd'] = curva['data_fwd'].strftime('%Y-%m-%d')
        print("len(curvas)", len(curvas))
        if curvas and len(curvas)>0:
             return jsonify(curvas)
        else:
             return jsonify({'error':"Dados não encontrados"})



@app.route('/api/curvas/data_fwd', methods=['GET'])
def getDatafwdCurva():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("""
        SELECT data, data_fwd
        FROM curva_fwd1
        WHERE submercado = 'S'
        """)
        curvas =  cursor.fetchall()
        for curva in curvas:
            curva['data'] = curva['data'].strftime('%Y-%m-%d')
            curva['data_fwd'] = curva['data_fwd'].strftime('%Y-%m-%d')
        print("len(curvas)", len(curvas))
        if curvas and len(curvas)>0:
             return jsonify(curvas)
        else:
             return jsonify({'error':"Dados não encontrados"})


@app.route('/api/curvas/getfetch', methods=['GET'])
def getDatafetch():
        param1 = request.args.get('param1')
        param2 = request.args.get('param2')
        print("parmas", param1, param2)
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = """
        SELECT data, data_fwd, submercado, conv, i0, i50, i100, preco_conv, preco_i0, preco_i50, preco_i100
        FROM curva_fwd1
        WHERE submercado IN (%s, %s) AND MONTH(data_fwd) IN (1, 4, 8, 12)
        """
        cursor.execute(query, (param1, param2))
        curvas =  cursor.fetchall()
        for curva in curvas:
            curva['data'] = curva['data'].strftime('%Y-%m-%d')
            curva['data_fwd'] = curva['data_fwd'].strftime('%Y-%m-%d')
        print("len(curvas)", len(curvas))
        if curvas and len(curvas)>0:
             return jsonify(curvas)
        else:
             return jsonify({'error':"Dados não encontrados"})

    

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=3001)
    app.run(debug=True)

