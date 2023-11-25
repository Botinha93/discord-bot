import Discord from 'discord.js'
import {Bot} from './defBot'
import fs from 'fs'
import Hook from "./hooks.ts";
import Config from "./config.json";

const naughtyWords = [
    "Damn",
    "arse",
    "arsehead",
    "arsehole",
    "ass",
    "asshole",
    "bastard",
    "bitch",
    "bloody",
    "bollocks",
    "brotherfucker",
    "bugger",
    "bullshit",
    "child-fucker",
    "Christ on a bike",
    "Christ on a cracker",
    "cocksucker",
    "crap",
    "cunt",
    "damn",
    "damn it",
    "dick",
    "dickhead",
    "dyke",
    "fatherfucker",
    "frigger",
    "fuck",
    "goddamn",
    "godsdamn",
    "hell",
    "holy shit",
    "horseshit",
    "in shit",
    "Jesus Christ",
    "Jesus fuck",
    "Jesus H. Christ",
    "Jesus Harold Christ",
    "Jesus, Mary and Joseph",
    "Jesus wept",
    "kike",
    "motherfucker",
    "nigga",
    "nigra",
    "pigfucker",
    "piss",
    "prick",
    "shit",
    "shit ass",
    "shite",
    "sisterfucker",
    "slut",
    "son of a whore",
    "son of a bitch",
    "spastic",
    "sweet Jesus",
    "turd",
    "twat",
    "wanker",
    "pisser",
    "jesus fucking christ", 
]
const channels=[
]

class naughty extends Bot{

    static naughtyDB = {naughty:new Map<string,number>(), count:0};
    constructor(){
        super("naughty")
        this.commands.addKey("n!", this.getnaughty)
    }
    protected processM(admin: Boolean, message: Discord.Message<boolean>) {
        var autor;
        if(message.webhookId != null)
            autor = message.author.username
        else
            autor = message.author.id
        if(message.content != undefined && naughtyWords.some(v => message.content.toLocaleLowerCase().includes(v))){
            if(!naughty.naughtyDB.naughty.has(autor))
                naughty.naughtyDB.naughty.set(autor, 1);
            else
                naughty.naughtyDB.naughty.set(autor, naughty.naughtyDB.naughty.get(autor)! + 1);
            fs.writeFile("./naughty.json",JSON.stringify({naughty:Object.fromEntries(naughty.naughtyDB.naughty),count:naughty.naughtyDB.count},null,"\t"), ()=>{})
        }
    }
    async getnaughty(admin: Boolean, message?: Discord.Message<boolean> | undefined){
        naughty.naughtyDB.naughty = new Map([...naughty.naughtyDB.naughty.entries()].sort((a, b) => b[1] - a[1]));
        var keys = [...naughty.naughtyDB.naughty.keys()];
        var build = "";
        for(var i=0; i<keys.length;i++){
            var username = message!.guild!.members.cache.get(keys[i])?.nickname;
            if(username === undefined || username === null){
                username = message!.guild!.members.cache.get(keys[i])?.displayName;
            } if(username === undefined|| username === null){
                username = message!.guild!.members.cache.get(keys[i])?.user.displayName;
            } if(username === undefined|| username === null){
                username = message!.client.users.cache.get(keys[i])?.displayName;
            if(username == undefined)
                try{
                    username = await (await message!.guild!.members.fetch(keys[i])).displayName;
                }catch{
                    try{
                        username = await (await message!.client.users!.fetch(keys[i])).displayName;
                    }catch{
                        username = undefined;
                    }
                }
            } if (username === undefined|| username === null){
                username = "<@"+keys[i]+">"
            }
            if(i<2)
                build += "\t- _**"+ (i+1) +". " + username+"**_\n"
            else if(i<5)
                build += "\t- **"+ (i+1) +". " + username+"**\n"
            else if(i<10)
                build += "\t- _"+ (i+1) +". " + username+"_\n"
            else if(i<20)
                build += "\t- "+ (i+1) +". " + username+"\n"
            else if(i<1000)
                build += "\t - "+(i+1) +". " + username+"\n"
        };
        var builder =  new Discord.EmbedBuilder()
        .setColor(Discord.Colors.Blurple)
        .setTitle("**Naughty no-no word uwusers**")
        .setTimestamp()
        .setDescription(build)
        if(!(message == undefined)){
            if( !message.channel.isDMBased() && Hook.hooks.has(message.guild!.id)){
                Hook.hooks.get(message.guild!.id)!.sendMessage({
                    avatarURL: Config.naughtyAvatar,
                    username:"Naughty Kitten",
                    embeds:[builder],
                    allowedMentions: {
                        parse: []
                    }
                    
                },message.channel as Discord.TextChannel).then(()=>{
                    //message.delete();
                })
            }else{
                if(!message.channel.isDMBased())
                message.delete();
                message.reply({embeds:[builder]})
            }
        }
        
    }
    startUP() {
        var js = JSON.parse(fs.readFileSync("./naughty.json",{ encoding: 'utf8', flag: 'r' }))
        naughty.naughtyDB.naughty = new Map(Object.entries(js.naughty));
        naughty.naughtyDB.count = js.count;
    }
    help(admin: Boolean, message?: Discord.Message<boolean> | undefined): Discord.EmbedBuilder {
        var builder =  new Discord.EmbedBuilder()
        .setColor(Discord.Colors.Blurple)
        .setTitle("naughty Bot")
        .setTimestamp()
            builder.setDescription("This bot counts how naughty people are, really, just that.")
            .addFields({
                    "name": "Get List",
                    "value": "Get the list of naughty:\n**n! list**\n\n",
                    inline: true
                  },
                  {
                    "name": "Personal Position",
                    "value": "Gets your position:\n**n! me**\n\n",
                    inline: true
                  }
                  )
        if(!(message == undefined)){
            if( !message.channel.isDMBased() && Hook.hooks.has(message.guild!.id)){
                Hook.hooks.get(message.guild!.id)!.sendMessage({
                    avatarURL: Config.quoteAvatar,
                    username:"naughty Kitten",
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
    
}
new naughty();