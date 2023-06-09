const mysql = require('mysql');
const util = require('util');
const configDatabase = require('../config/database');
class Database {
    #connection
    #conn
    #transactionOn
    #connectionOn
    constructor(){
        this.#connection = mysql.createConnection(configDatabase);
        this.#conn = util.promisify(this.#connection.query).bind(this.#connection);
        this.insertId
        this.numRows = 0
        this.data = []
        this.#transactionOn = false
        this.#connectionOn = true
    }
    async transaction(){
        if(!this.#connectionOn) this.#startConnection();
        await this.#conn('START TRANSACTION');
        this.#transactionOn = true
        return this
    }
    async commit(){
        if(!this.#transactionOn) throw new Error('transaction not started')
        await this.#conn('COMMIT');
        this.#transactionOn = false
        this.#connectionOn = false
        this.#connection.end();
        return this

    }
    async roolback(){
        if(!this.#transactionOn) throw new Error('transaction not started')
        await this.#conn('ROLLBACK');
        this.#transactionOn = false
        this.#connectionOn = false
        this.#connection.end();
        return this

    }
    async query(sql, params = []){
        try {
            if(!this.#connectionOn) this.#startConnection();
            const rows = await this.#conn(sql, params);
            this.numRows = rows.length
            this.insertId = rows.insertId
            this.data = rows
            return this
        } catch (err) {
            throw new Error(err.message);
        } finally {
            this.#connectionOn = false
           if(!this.#transactionOn) this.#connection.end();
        }
    }
    #startConnection(){
        this.#connection = mysql.createConnection(configDatabase);
        this.#conn = util.promisify(this.#connection.query).bind(this.#connection);
        this.#connectionOn = true
    }
}
let database = new Database()
module.exports = database