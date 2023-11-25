import { Bot } from "./defBot";
import fs from 'fs'
class DatabaseHandler {
    static database = {}
    constructor(parameters) {
        Bot.functions.forEach(bot=>{
            if(DatabaseHandler.database[bot.func.name()] == undefined){
                var js = JSON.parse(fs.readFileSync("./naughty.json",{ encoding: 'utf8', flag: 'r' }))
                DatabaseHandler.database[bot.func.name()] = new Map(Object.entries(js.naughty));
                DatabaseHandler.database[bot.func.name()] = {}
            }
        })
    }
}