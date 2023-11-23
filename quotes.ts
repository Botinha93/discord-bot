import quotes from "./quotes.json"
import {client} from "./index.ts"
import Discord from 'discord.js';
import {Bot} from './defBot.ts';
import fs from "fs"


export class quoteClass{
    static addQuote(quo : string, user : string | null  = null ){
        if(user == null){
            quotes.Quotes.push(quo);
        }else{
            if(quotes[user] == undefined){
                quotes[user] = Array();
            }
            quotes[user].push(quo)
        }
        fs.writeFile("./quotes.json",JSON.stringify(quotes,null,"\t"), ()=>{})
    }
    static remove(quo : string, user : string | null  = null ){
        if(user == null){
            if(quotes.Quotes.lastIndexOf(quo) == -1)
                quotes.Quotes.splice(quotes.Quotes.lastIndexOf(quo),1);
        }else{
            if(quotes[user] == undefined){
                quotes[user] = Array();
            }
            if(quotes[user].lastIndexOf(quo) == -1)
                quotes[user].splice(quotes[user].lastIndexOf(quo),1);
        }
        fs.writeFile("./quotes.json",JSON.stringify(quotes,null,"\t"), ()=>{})
    }
    static getQuote(n : null | number, user : string | null  = null ){
        if(user == null){
            if(n == null){
                return quotes.Quotes[Math.floor(Math.random() * (quotes.Quotes.length -1))];
            }
            return quotes.Quotes[Number(n)];
        }else{
            if(n == null){
                return quotes[user][Math.floor(Math.random() * (quotes.Quotes.length -1))];
            }
            return quotes[user][Number(n)];
        }
    }
    static processMessage(message : Discord.Message, admin : Boolean){
        if(message.channel.id == process.env.QUOTE_CHANNEL){
            if((message.content.includes("- ") || message.content.includes("> ")) && message.attachments.size == 0){
                quoteClass.addQuote(message.content);
                message.react("⭐");
            }
        }
        if(message.content.toLocaleLowerCase().startsWith("q! me") || message.content.toLocaleLowerCase().startsWith("q!me")){
            message.reply(quoteClass.getQuote(null, message.author.username))
        }else if(message.content.toLocaleLowerCase().startsWith("q! help")||message.content.toLocaleLowerCase().startsWith("q!help")){
            message.reply({embeds: [{
                "title": "Quote",
                "description": "Gets a random quote from the database, star react (⭐) to a message to add it to your personal the rooster.",
                "fields": [
                  {
                    "name": "quote",
                    "value": "Get random quote, usable by any user:\n\nq!\n\n"
                  },
                  {
                    "name": "Personal Quote",
                    "value": "Get random quote, from your own saved ones:\n\nq! me\n\n"
                  },
                  {
                    "name": "Help",
                    "value": "This thing here:\n\nq! help\n\n"
                  }
                ]
              }]})
        }else if(message.content.toLocaleLowerCase().startsWith("q!")){
            message.reply(quoteClass.getQuote(null))
        }
    }
    static async fetchAllMessages() {
        var remove = [
            "gock",
            "cock",
            "pussy",
            "bussy",
            "boypussy",
            "embussy",
            "vagina",
            "dick"
        ]
        if(quotes.Quotes.length<1){
        const channel = client.channels.cache.get(process.env.QUOTE_CHANNEL!) as Discord.TextChannel;
        let messages = [];
      
        // Create message pointer
        let message = await channel!.messages
          .fetch({ limit: 1 })
          .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));
      
        while (message) {
          await channel.messages
            .fetch({ limit: 100, before: message.id })
            .then(messagePage => {
              messagePage.forEach(msg => {
                if((msg.content.includes("- ") || msg.content.includes("> ")) && remove.some(v => !msg.content.toLocaleLowerCase().includes(v)) && msg.attachments.size == 0){
                    quoteClass.addQuote(msg.content);
                }
              });
      
              // Update our message pointer to be the last message on the page of messages
              message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
            });
        }
        console.log("done")
      }
    }
    static startup(){
        quoteClass.fetchAllMessages();
        console.log("Quote started");
        client.on('messageReactionAdd', (reaction_orig, user) => {
            if(reaction_orig.message.channel.id == process.env.QUOTE_CHANNEL)
                if (reaction_orig.partial) {
                    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
                    try {
                        reaction_orig.fetch().then(reacMessage =>{
                            console.log(reacMessage.emoji.name);
                            if (reacMessage.emoji.name === ':x:') {
                                if((user.username == "botinha") ||  reacMessage.message.guild!.members.cache.get(user.id)!.permissions.has(Discord.PermissionFlagsBits.Administrator)){
                                    var content = reacMessage.message.content!;
                                    quoteClass.remove(content);
                                }
                            }
                            if (reacMessage.emoji.name === '⭐') {
                                var content = reacMessage.message.content!;
                                quoteClass.addQuote(content, user.username);
                            }
                        });
                    } catch (error) {
                        console.error('Something went wrong when fetching the message:', error);
                        // Return as `reaction.message.author` may be undefined/null
                        return;
                    }
                }else{
                    if (reaction_orig.emoji.name === ':x:') {
                        if((user.username == "botinha") ||  reaction_orig.message.guild!.members.cache.get(user.id)!.permissions.has(Discord.PermissionFlagsBits.Administrator)){
                            var content = reaction_orig.message.content!;
                            quoteClass.remove(content);
                        }
                    }
                    if (reaction_orig.emoji.name === '⭐') {
                        var content = reaction_orig.message.content!;
                        quoteClass.addQuote(content, user.username);
                        
                    }
                }
        });
        client.on('messageReactionRemove', (reaction_orig, user) => {
            if(reaction_orig.message.channel.id == process.env.QUOTE_CHANNEL)
                if (reaction_orig.partial) {
                    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
                    try {
                        reaction_orig.fetch().then(reacMessage =>{
                            console.log(reacMessage.emoji.name);
                            if (reacMessage.emoji.name === '⭐') {
                                var content = reacMessage.message.content!;
                                quoteClass.remove(content, user.username);
                            }
                        });
                    } catch (error) {
                        console.error('Something went wrong when fetching the message:', error);
                        // Return as `reaction.message.author` may be undefined/null
                        return;
                    }
                }else{
                    console.log(reaction_orig.emoji.name);
                    if (reaction_orig.emoji.name === '⭐') {
                        var content = reaction_orig.message.content!;
                        quoteClass.remove(content, user.username);
                    }
                }
        });
    }
}


new Bot(quoteClass.processMessage, () =>{
    return {
        "name": "Quote",
        "title": "Quote",
        "username":"Quote Bot",
        "description": "Gets a random quote from the database, X react (:x:) to a message as admin to remove it from the global rooster.",
      }
}, "quote",quoteClass.startup);