import Discord from 'discord.js';
import config from './config.json';
import dotenv from "dotenv";
dotenv.config();
import Hook from './hooks.ts';
import {Bot as bots} from './defBot.ts';
import './botController.ts'
import './banword.ts';
import './uwu.ts';
import { Help } from "./help.js";
import './quotes.ts';
import './horny.ts';
import './naughty.ts';
export const client=new Discord.Client({ intents: [
    131071,
  ],
  partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction],
  
});

client.once("ready", () =>{
    Hook.setUP();
    console.log("SETTING UP FUNCTIONS")
    bots.functions.forEach(element => {
        element.func.startUP();
    })
    console.log("BOT IS ONLINE"); //message when bot is online
})
client.on('messageCreate', function onMessage(message){
    var isadm = false;
    if((message.author.username == "botinha") || (!(message.member == null) && message.member.permissions.has(Discord.PermissionFlagsBits.Administrator))){
        isadm = true;
    }
    var botRunning;
    try {
        if(!config.channelsNAP.includes(message.channel.id) && message.author.id != "1176286162390888499" ){
            bots.functions.forEach(element => {
                if(element.enabled){
                    botRunning = element.func.name();
                    element.func.processMessage(isadm,message);
                }
            });
        }
    } catch (error) {
        console.log(error);
        bots.functions.get(botRunning)?.func.help(isadm,message)
    }
    isadm=false;
})
client.login(process.env.TOKEN);

process.on('uncaughtException', UncaughtExceptionHandler);

function UncaughtExceptionHandler(err)
{
    console.log("Uncaught Exception Encountered!!");
    console.log("err: ", err);
    console.log("Stack trace: ", err.stack);
}