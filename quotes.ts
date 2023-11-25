import quotes from "./quotes.json"
import {client} from "./index.ts"
import Discord from 'discord.js';
import {Bot, Commands} from './defBot.ts';
import fs from "fs"
import Hook from "./hooks.ts";
import Config from "./config.json";


export class quoteClass extends Bot{
    constructor(){
        super("quote")
        this.commands.addKey("q!", this.qFunction);
        this.commands.getKey("q!")!.addKey("me", this.qMeFunction);
        this.commands.getKey("q!")!.addKey("help", this.help)
    }
    help(admin: Boolean, message?: Discord.Message){
        var builder =  new Discord.EmbedBuilder()
        .setColor(Discord.Colors.Blurple)
        .setTitle("Quote Bot")
        .setTimestamp()
        if(admin){
            builder.setDescription("Gets a random quote from the database, X react (❌) to a message as admin to remove it from the global rooster. The following information applies to the **q!** command, acessible to all users.\n\nGets a random quote from the database, star react (⭐) to a message to add/save it to your personal rooster.\n\nStar react to any message on the server and if it gets 5 reactions it will be added to the quote channel")
            .addFields({
                    "name": "quote",
                    "value": "Get random quote, usable by any user:\n**q!**\n\n",
                    inline: true
                  },
                  {
                    "name": "Personal Quote",
                    "value": "Get random quote, from your own saved ones:\n**q! me**\n\n",
                    inline: true
                  },
                  {
                    "name": "Help",
                    "value": "This thing here:\n**q! help**\n\n",
                    inline: true
                  })
        }else{
            builder.setDescription("Gets a random quote from the database, star react (⭐) to a message on the quotes channel to add/save it to your personal rooster.\n\nStar react to any message on the server and if it gets 5 reactions it will be added to the quote channel")
            .addFields({
                "name": "quote",
                "value": "Get random quote, usable by any user:\n**q!**\n\n",
                inline: true
              },
              {
                "name": "Personal Quote",
                "value": "Get random quote, from your own saved ones:\n**q! me**\n\n",
                inline: true
              },
              {
                "name": "Help",
                "value": "This thing here:\n**q! help**\n\n",
                inline: true
              })
        }
        if(!(message == undefined)){
            if( !message.channel.isDMBased() && Hook.hooks.has(message.guild!.id)){
                Hook.hooks.get(message.guild!.id)!.sendMessage({
                    avatarURL: Config.quoteAvatar,
                    username:"Quote Kitten",
                    embeds:[builder],
                    
                },message.channel as Discord.TextChannel)
                message.delete();
            }else{
                if(!message.channel.isDMBased())
                message.delete();
                message.reply({embeds:[builder]})
            }
        }
        return builder;
        
        }
    static addQuote(quo : string, id : string, user : string | null  = null ){
        if(user == null){
            quotes.Quotes[id]=quo;
        }else{
            if(quotes[user] == undefined){
                quotes[user] = Object();
            }
            quotes[user][id] = (quo)
        }
        fs.writeFile("./quotes.json",JSON.stringify(quotes,null,"\t"), ()=>{})
    }
    static remove(id : string, user : string | null  = null ){
        if(user == null){
            if((quotes.Quotes as Object).hasOwnProperty(id))
            delete quotes.Quotes[id];
        }else{
            if(quotes[user] == undefined){
                quotes[user] = Object();
            }
            if((quotes[user] as Object).hasOwnProperty(id))
                delete quotes[user][id];
        }
        fs.writeFile("./quotes.json",JSON.stringify(quotes,null,"\t"), ()=>{})
    }
    static getQuote(n : null | number, user : string | null  = null ){
        var quote;
        if(user == null){
            if(n == null){
                quote =quotes.Quotes[Object.keys(quotes.Quotes)[Math.floor(Math.random() * (Object.keys(quotes.Quotes).length -1))]];
            }
            return quotes.Quotes[Object.keys(quotes.Quotes)[Number(n)]];
        }else{
            if(n == null){
                quote =quotes[user][Object.keys(quotes[user])[Math.floor(Math.random() * (Object.keys(quotes[user]).length -1))]];
            }
            quote =quotes[user][Object.keys(quotes[user])[Number(n)]];
        }
        if (quote == undefined){
            quote = "Why the fuck you are trying to get a personal quote whith a empty roaster? GO READ THE HELP q! help"
        }
        return quote;
    }
    protected qFunction(admin : Boolean, message : Discord.Message){
        if( !message.channel.isDMBased() && Hook.hooks.has(message.guild!.id)){
            Hook.hooks.get(message.guild!.id)!.sendMessage({
                avatarURL: Config.quoteAvatar,
                username:"Quote Kitten",
                embeds:[{
                    color: Discord.Colors.Green,
                    description: quoteClass.getQuote(null)
                }],
                
            },message.channel as Discord.TextChannel)
            message.delete();
        }else{
            if(!message.channel.isDMBased())
            message.delete();
            message.reply(quoteClass.getQuote(null));
        }
    }
    
    protected qMeFunction(admin : Boolean, message : Discord.Message){
        if(!message.channel.isDMBased() && Hook.hooks.has(message.guild!.id)){
            Hook.hooks.get(message.guild!.id)!.sendMessage({
                avatarURL: Config.quoteAvatar,
                username:"Quote Kitten",
                embeds:[{
                    color: Discord.Colors.Green,
                    description: quoteClass.getQuote(null, message.author.username)
                }],
                
            },message.channel as Discord.TextChannel)
            message.delete();
        }else{
            if(!message.channel.isDMBased())
            message.delete();
            message.reply(quoteClass.getQuote(null, message.author.username))
        }
    }
    protected processM(admin : Boolean, message : Discord.Message){
        if(message.channel.id == process.env.QUOTE_CHANNEL){
            if((message.content.includes("- ") || message.content.includes("> ")) && message.attachments.size == 0){
                quoteClass.addQuote(message.content,message.id);
                message.react("⭐");
            }
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
        if(Object.keys(quotes.Quotes).length<1){
            console.log("\tSetting up quotes");
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
                    quoteClass.addQuote(msg.content, msg.id);
                }
              });
      
              // Update our message pointer to be the last message on the page of messages
              message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
            });
        }
        console.log("done")
      }
    }
    startUP(){
        console.log("QUOTE BOT STARTED");
        quoteClass.fetchAllMessages();
        client.on('messageReactionAdd', (reaction_orig, user) => {
            if(reaction_orig.message.channel.id == process.env.QUOTE_CHANNEL)
                if (reaction_orig.partial) {
                    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
                    try {
                        reaction_orig.fetch().then(reacMessage =>{
                            console.log(reacMessage.emoji.name);
                            if (reacMessage.emoji.name === '❌') {
                                if((user.username == "botinha") ||  reacMessage.message.guild!.members.cache.get(user.id)!.permissions.has(Discord.PermissionFlagsBits.Administrator)){
                                    var content = reacMessage.message.content!;
                                    quoteClass.remove(reacMessage.message.id);
                                }
                            }
                            if (reacMessage.emoji.name === '⭐') {
                                if(reacMessage.count>9 && !reacMessage.message.channel.id.startsWith(process.env.QUOTE_CHANNEL!)){
                                    var username = reacMessage.message.guild!.members.cache.get(reacMessage!.message!.author!.id)!.nickname == undefined? reacMessage.message.author!.displayName : reacMessage.message.guild!.members.cache.get(reacMessage.message!.author!.id)!.nickname;
                                    Hook.hooks.get(reacMessage.message.guild!.id)!.sendMessage({
                                        avatarURL: Config.quoteAvatar,
                                        username:"Quote Creator",
                                        content:">>> "+ reacMessage.message.content+"\n\n- "+username
                                        
                                    },reacMessage.client.channels.cache.get(process.env.QUOTE_CHANNEL!) as Discord.TextChannel)
                                }
                                var content = reacMessage.message.content!;
                                quoteClass.addQuote(content, reacMessage.message.id, user.username);
                            }
                        });
                    } catch (error) {
                        console.error('Something went wrong when fetching the message:', error);
                        // Return as `reaction.message.author` may be undefined/null
                        return;
                    }
                }else{
                    if (reaction_orig.emoji.name === '❌') {
                        if((user.username == "botinha") ||  reaction_orig.message.guild!.members.cache.get(user.id)!.permissions.has(Discord.PermissionFlagsBits.Administrator)){
                            var content = reaction_orig.message.content!;
                            quoteClass.remove(reaction_orig.message.id);
                        }
                    }
                    if (reaction_orig.emoji.name === '⭐') {
                        var content = reaction_orig.message.content!;
                        quoteClass.addQuote(content,reaction_orig.message.id, user.username);
                        
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
                                var content = reaction_orig.message.id!;
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
                        var content = reaction_orig.message.id!;
                        quoteClass.remove(content, user.username);
                    }
                }
        });
        client.on('messageReactionAdd', (reaction_orig, user) => {
            if(reaction_orig.message.channel.id != process.env.QUOTE_CHANNEL)
                if (reaction_orig.partial) {
                    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
                    try {
                        reaction_orig.fetch().then(reacMessage =>{
                            if (reacMessage.emoji.name === '⭐') {
                                if(reacMessage.count>4){
                                    var username = reacMessage.message.guild!.members.cache.get(reacMessage!.message!.author!.id)!.nickname == undefined? reacMessage.message.author!.displayName : reacMessage.message.guild!.members.cache.get(reacMessage.message!.author!.id)!.nickname;
                                    Hook.hooks.get(reacMessage.message.guild!.id)!.sendMessage({
                                        avatarURL: Config.quoteAvatar,
                                        username:"Quote Creator",
                                        content:">>> "+ reacMessage.message.content+"\n\n- "+username
                                        
                                    },reacMessage.client.channels.cache.get(process.env.QUOTE_CHANNEL!) as Discord.TextChannel)
                                }
                            }
                        });
                    } catch (error) {
                        console.error('Something went wrong when fetching the message:', error);
                        // Return as `reaction.message.author` may be undefined/null
                        return;
                    }
                }else{
                    if (reaction_orig.emoji.name === '⭐') {
                        if(reaction_orig.count>4){
                            var username = reaction_orig.message.guild!.members.cache.get(reaction_orig!.message!.author!.id)!.nickname == undefined? reaction_orig.message.author!.displayName : reaction_orig.message.guild!.members.cache.get(reaction_orig.message!.author!.id)!.nickname;
                            Hook.hooks.get(reaction_orig.message.guild!.id)!.sendMessage({
                                avatarURL: Config.quoteAvatar,
                                username:"Quote Creator",
                                content:">>> "+ reaction_orig.message.content+"\n\n- "+username
                                
                            },reaction_orig.client.channels.cache.get(process.env.QUOTE_CHANNEL!) as Discord.TextChannel)
                        }
                    }
                }
        });
    }
}
new quoteClass();
