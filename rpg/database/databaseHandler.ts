import db from 'sqlite3'
import fs from 'fs'
import config from './config.json'
const database = new db.Database("rpg.db", db.OPEN_CREATE,(err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('CONNECTED TO DATABASE');
  });

export default abstract class DatabaseHandler {
    protected abstract id : string
    protected start(data : object){
        if(config["SetUp"+data.constructor.name] == undefined){
            var create =""
            var first = true;
            Object.keys(data).forEach(key =>{
                if(first){
                    create +=key+" " + (((typeof data[key]) == "number")? "NUMERIC" : (((typeof data[key]) == "boolean")? "BOOLEAN" : "TEXT"))
                }else{
                    create +=", "+key+" " + (((typeof data[key]) == "number")? "NUMERIC" : (((typeof data[key]) == "boolean")? "BOOLEAN" : "TEXT"))
                }
            })
            database.run("CREATE TABLE IF NOT EXISTS ID INTEGER PRIMARY KEY, "+data.constructor.name+" ( "+create+" );")
            config["SetUp"+data.constructor.name] = true;
            fs.writeFile("./config.json",JSON.stringify(config,null,"\t"), ()=>{})
        }
        var create = Object.values(this).join(",")
        var value = ""
        var first = true
        Object.keys(this).forEach(key =>{
            if(first){
                value += ((typeof this[key]) == "string" ? '"'+this[key]+'"' : this[key])
            }else{
                value += ", "+ ((typeof this[key]) == "string" ? '"'+this[key]+'"' : this[key])
            }
        })
        database.run("INSERT INTO "+data.constructor.name+" ("+create+") VALUES ("+value+");"),(result , err) => {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            this.id = result.lastID;
        }
    }
    protected update(){
        var create = Object.values(this).join(",")
        var value = ""
        var first = true
        Object.keys(this).forEach(key =>{
            if(first){
                value += ((typeof this[key]) == "string" ? '"'+this[key]+'"' : this[key])
            }else{
                value += ", "+ ((typeof this[key]) == "string" ? '"'+this[key]+'"' : this[key])
            }
        })
        database.run("UPDATE "+this.constructor.name+" ("+create+") VALUES ("+value+") WHERE ID = "+this.id+";"),(result , err) => {
            if (err) {
              return console.log(err.message);
            }
        }
    }
    static all<T>():Array<T>{
        let sql = "SELECT * FROM "+this.constructor.name+" ;" ;
        var array = new Array<T>()
        database.all(sql, (err, rows) => {
            if (err) {
                return console.log(err.message);
            }
            Object.getPrototypeOf(this)
            rows.forEach((row) => {
                array.push(Object.assign(Object.create(this), row))
            });
        });
        return array;
    }
        
}