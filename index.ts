import Discord from 'discord.js';
import config from './config.json';
import dotenv from "dotenv";
dotenv.config();
import './banword.ts';

import './uwu.ts';
import {Bot as bots} from './defBot.ts';
import { Help } from "./help.js";
import './quotes.ts';
export const client=new Discord.Client({ intents: [
    131071,
  ],
  partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction],
  
});

const channelsNAP = [
    "1025178975460405248",
    "1085236832620523621",
    "1025179005294493736",
    "1056916834265333770",
    "1025324088941621258",
    "1025513148045860925",
    "1025195451466657822",
    "1071256825166581873",
    "1026327654430933112",
    "1025226770863104010",
    "1025199344850325629",
    "1025516880330506292"
]

const functions = new Map();

client.once("ready", () =>{
    console.log("BOT IS ONLINE"); //message when bot is online
    bots.functions.get("timeout")!.enabled = true;
    bots.functions.get("quote")!.enabled = true;
    bots.functions.forEach(element => {
        element.func.startUP();
    })
})

client.on('messageCreate', function onMessage(message){
    var isadm = false;
    try {
        if((message.author.username == "botinha") || (!(message.member == null) && message.member.permissions.has(Discord.PermissionFlagsBits.Administrator))) {
            var pross = message.content.toLocaleLowerCase().split(" ");
            if(pross[0].includes("b!")){
                    isadm = true;
                    if(pross[1].includes("enable")){
                        bots.functions.get(pross[2])!.enabled = true; 
                    }else if(pross[1].includes("disable")){
                        bots.functions.get(pross[2])!.enabled = false;
                    }else{
                        bots.functions.get(pross[1])!.func.processMessage(message, true);
                    }
            }
        }    
    } catch (error) {
        var bnots = new Array();
        bnots.push(Help.mainScreen(Array.from(bots.functions.keys()).join(", ")));
        bots.functions.forEach(element => {
            bnots.push(element.func.help())
        })
        message.channel.send({embeds: bnots});
        console.log(error)
    }
    if(!channelsNAP.includes(message.channel.id) && message.author.id != "1176286162390888499" && !isadm){
        bots.functions.forEach(element => {
            if(element.enabled){
                element.func.processMessage(message, false);
            }
        });
    }
    isadm=false;
})
client.login(process.env.TOKEN);