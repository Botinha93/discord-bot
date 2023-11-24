import { Message, EmbedBuilder } from "discord.js";
import {Bot} from "./defBot";
import config from './config.json'
import fs from "fs"
export default class botController extends Bot {

    constructor() {
        super("botcontroller")
        Bot.functions.get("botcontroller")!.enabled = true;
        this.commands.addKey("b!", this.help).addKey("enable" ,this.enable)
        this.commands.getKey("b!")!.addKey("disable", this.enable)
        this.commands.getKey("b!")!.addKey("help", this.helpAll)
    }
    help(admin: Boolean, message?: Message<boolean> | undefined): EmbedBuilder {
        var builder = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("The Bot")
        .setDescription(" Welcome to **The Bot (no name)**! 🎉every bot we create will be added under the same command \"b!\"\n\nThis help screen will give you the basic functionalities. The commands shown should have whatever is inside **<Value_inside>** exchanged for said value, example: \n\n **b! <enable_or_disabled> <bot_name>** will be **b! enable wordban**\n\n")
        .addFields(
          {"name": "Current bots", "value": Array.from(Bot.functions.keys()).join(", ")},
          {"name": "Enable or disable a bot", "value": "b! <enable_or_disable> <bot_name>"},
          {"name": "Help", "value": "Show the help text for all bots\n\nb! help "}, )
        .setTimestamp()
        
        if(!(message == undefined)){
            message.reply({embeds:[builder]})
        }
        return builder;
    }
    helpAll(admin: Boolean, message?: Message<boolean> | undefined){
        var bnots = new Array();
        Bot.functions.forEach(element => {
            if(element.func.name() != "botcontroller")
            bnots.push(element.func.help(admin))
        })
        message!.reply({embeds:bnots})
    }
    protected processM(admin: Boolean, message: Message<boolean>) {
        
    }
    protected enable(admin: Boolean, message: Message<boolean>){
        if(admin && Bot.functions.has(message.content)){
            Bot.functions.get(message.content)!.enabled = !Bot.functions.get(message.content)!.enabled; 
            config[message.content] = Bot.functions.get(message.content)!.enabled;
            fs.writeFile("./config.json",JSON.stringify(config,null,"\t"), ()=>{})
        }
        
    }
    startUP() {
        console.log("AVAILIABLE BOTS\n\t"+Array.from(Bot.functions.keys()).join(", "))
        console.log("ENABLING BOTS")
        Bot.functions.forEach(element => {
            if(config[element.func.name()] == undefined){
                config[element.func.name()] = true;
                fs.writeFile("./config.json",JSON.stringify(config,null,"\t"), ()=>{})
            }
            console.log("\t"+element.func.name()+" : "+ (config[element.func.name()]? "enabled":"disabled"))
            element.enabled = config[element.func.name()];
        })
    }
}
new botController();