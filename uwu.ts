import uwuifier from "uwuifier";
const Uwuifier = new uwuifier();
import {Bot} from './defBot.ts';
import { Help } from "./help.js";
import Discord from 'discord.js';
import Hook from "./hooks.ts";
import Pirate from "./pirate-speak.ts"


function uwuIT(text){
    return Uwuifier.uwuifySentence(text);
}
const catPatter = {
    1 : ["n","y",""],
    2 : ["n","y","a"],
    3 : ["ny","a","n"],
    4 : ["mi","a","ow"],
    5 : ["miao","o","w"]
};


function concatString(s,n) {var concatenatedString = catPatter[s][1]; for (let i = 0; i < n; i++) {concatenatedString = concatenatedString+catPatter[s][1];} return concatenatedString;}

const specialChars = ["!",",",".","?","@","#","~","*"];
function catIT(text : string){
    var words = text.split(" ")
    var converted ="";
    for (var i = 0; i < words.length - 1; i++) {
        var t = Array.from(words[i]);
        if(specialChars.includes(t[t.length-1])){
            if(t.length-2 == 0){
                words[i] = ":cat:"+t[t.length-1];
            }else if(t.length-2 >5){
                var n = Help.RandomInt(4)+1;
                var cat = concatString(n,(t.length-2 - n));
                words[i] =catPatter[n][0]+cat+catPatter[n][2]+t[t.length-1];
            }else{
                words[i] =catPatter[t.length-2][0]+catPatter[t.length-2][1]+catPatter[t.length-2][2]+t[t.length-1];
            }
        }else{
            if(t.length-1 == 0){
                words[i] = ":cat:";
            }else if(t.length-1 >5){
                var n = Help.RandomInt(4)+1;
                var cat = concatString(n,(t.length-1 - n));
                words[i] =catPatter[n][0]+cat+catPatter[n][2];
            }else{
                words[i] =catPatter[t.length-1][0]+catPatter[t.length-1][1]+catPatter[t.length - 1 ][2];
            }
        }
        converted = converted+words[i]+" ";
    }
    return converted;
}
const leetCode = {
    A: "4",
    B: '8',
    C: '(',
    D: '|}',
    E: '3',
    F: 'F',
    G: 'g',
    H: '#',
    I: '1',
    J: 'J',
    K: '|<',
    L: 'L', 
    M: 'M',
    N: '/|/',
    O: '0', 
    P: '|D',
    Q: '(,)',
    R: '|2',
    S: '5',
    T: '7',
    U: '|_|',
    V: '|/',
    W: 'W',
    X: '><',
    Y: 'Y',
    Z: '2'
}

function speakLeet(str) {
	var translatedStr = "";
	for (var i = 0; i < str.length; i++) {
        if(leetCode[str.charAt(i).toUpperCase()] == null)
		    translatedStr += str.charAt(i);
        else
            translatedStr += leetCode[str.charAt(i).toUpperCase()];
		}

	return translatedStr;
}
export const database =  new Map<string, user>();
export class user{
    static hook;
    id;
    static messages = new Map();
    ban;
    toend = 0;
    severity;
    constructor(id,ban, severity){
        this.id = id;
        this.ban =Number(ban);
        this.severity = Number(severity);
        database.set(this.id, this);
    }
    message(text){
            var textT = "";
            switch (this.severity) {
                case 1:
                    textT = speakLeet(text)
                    break;
                case 2:
                    textT = catIT(text)
                    break;
                case 3:
                    textT = Pirate(text);
                    break;
                default:
                    textT = uwuIT(text)
                    break;
            }
            this.toend ++;
            if(this.ban <= this.toend){
                database.delete(this.id);
            }
            return textT;
        
    }
    store(text, id, messageID){
        user.messages.set(messageID, {channel:id,text:text});
    }
}
export class timeout extends Bot{

    constructor(){
        super("timeout");
        this.commands.addKey("t!",this.processMessagesOfUser).addKey("add",this.add)
        this.commands.getKey("t!")?.addKey("remove", this.del)
        this.commands.getKey("t!")?.addKey("help", this.help)
    }
    protected processM(admin: Boolean, message: Discord.Message) {
        if(database.has(message.author.username)){
            timeout.send(message);
        }
    }
    protected processMessagesOfUser(admin: Boolean, message: Discord.Message){
        var split = message.content.split(" ");
        var severity = (Help.isNumeric(split[0])? Number(split[0]): 0)
        if(Help.isNumeric(split[0])){
            split = Help.removerFromArray(split,split[0])
        }
        message.content = split.join(" ");
        new user(message.author.username, 1,  severity);
        timeout.send(message);
    }
    private static send(message: Discord.Message<boolean>){
        if(database.has(message.author.username)){
            var current = database.get(message.author.username)!;
            if(!message.channel.isDMBased()){
                var username = message.guild!.members.cache.get(message.author.id)!.nickname == undefined? message.author.displayName : message.guild!.members.cache.get(message.author.id)!.nickname;
                var avatar = message.guild!.members.cache.get(message.author.id)!.avatar == undefined? message.author.avatarURL() : message.guild!.members.cache.get(message.author.id)!.avatarURL();
                Hook.hooks.get(message.guild!.id)!.sendMessage({
                    username:username!,
                    avatarURL:avatar!,
                    content: current.message(message.content)
                }, message.channel as Discord.TextChannel).then(messageSent => {
                    current.store(message.content, messageSent.channel.id, messageSent.id);
                    message.delete();
                    var collector = messageSent.createReactionCollector();
                    collector.on('collect', (reaction, u) => {
                        var userhook = user.messages.get(reaction.message.id);
                        Hook.hooks.get(message.guild!.id)?.WebHook.editMessage(reaction.message.id, userhook.text);
                    });
                })
            }else{
                message.reply(current.message(message.content))
            }
        }
    }
    help(admin: Boolean, message?: Discord.Message ) {
        var builder =  new Discord.EmbedBuilder()
        .setColor(Discord.Colors.Gold)
        .setTitle("Timeout")
        .setTimestamp()
        if(admin){
            builder.setDescription("Forces a user message to be translated to a alternative form of speech, does not save the users betwen sessions.\n\nSupported severity: \n· 0. uwu, \n· 1. leet\n· 2. full cat\n· 3 Pirate!\n")
            .addFields({
                "name": "Add",
                "value": "Puts a new user in the punishment list:\n\nt! add <UserName_to_be_banned> <Numer_Of_Messages> <Severity>\n\n"
                },
                {
                "name": "Remove",
                "value": "Removes a user from the list before the allocated time:\n\nt! remove <UserName_to_be_unbanned>",
                "inline": false
                },
                {
                "name": "Help",
                "value": "Shows this help text:\n\nt! help",
                "inline": false
                })
        }else{
            builder.setDescription("Translates your message to one of the types of 'speak':\n\nSupported severity: \n· 0. uwu, \n· 1. leet\n· 2. full cat\n· 3 Pirate!\n")
            .addFields({
                "name": "How to",
                "value": "Use the following command:\n\nt! <Severity> <Whatever_you_want_text>\n\n"
                })
        }
        if(!(message == undefined)){
            message.reply({embeds:[builder]})
        }
        return builder;
        
    }
    startUP() {
        
    }

    protected add(admin: Boolean,admessage: Discord.Message<boolean>) {
        var message = admessage.content.split(" ");
        if(admin)
        return true
    }
    protected del(admin: Boolean,admessage: Discord.Message<boolean>) {
        if(admin)
        database.delete(admessage.author.username)
        return true
    }
}
new timeout();
