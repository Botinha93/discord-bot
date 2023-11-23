import uwuifier from "uwuifier";
const Uwuifier = new uwuifier();
import {Bot} from './defBot.ts';
import { Help } from "./help.js";
import Discord from 'discord.js';


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

function gRandomInt(max) {
    return Math.floor(Math.random() * max);
}
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
                var n = gRandomInt(4)+1;
                var cat = concatString(n,(t.length-2 - n));
                words[i] =catPatter[n][0]+cat+catPatter[n][2]+t[t.length-1];
            }else{
                words[i] =catPatter[t.length-2][0]+catPatter[t.length-2][1]+catPatter[t.length-2][2]+t[t.length-1];
            }
        }else{
            if(t.length-1 == 0){
                words[i] = ":cat:";
            }else if(t.length-1 >5){
                var n = gRandomInt(4)+1;
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
const database =  new Map();
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

class user{
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
function administ(admmess){
    var message = admmess.content.split(" ");
    try {
        if(message.length>2){
            if(message.length>5 && message[2].toLocaleLowerCase().includes("add")){
                new user(message[3], message[4], message[5])
            }else if(message.length>3 && message[2].toLocaleLowerCase().includes("remove")){
                database.delete(message[3])
            }else{
                admmess.channel.send({embeds: Help.uwu()});
            }
        }
        else{
            admmess.channel.send({embeds: Help.uwu()});
        }
    } catch (error) {
        admmess.channel.send({embeds: Help.uwu()});
        console.log(error)
    }
}


function processMessage(message, admin){
    if(user.hook == null){
        message.guild.fetchWebhooks().then(webhooks => {webhooks.forEach(webhook => {
            if(webhook.name == "timeout"){
                user.hook = webhook;
            }
        })
        if(user.hook == null){
            message.channel.createWebhook({
                name: "timeout",
            }).then(webhook => user.hook = webhook)
        }
    })
    }
    if(admin){
        administ(message);
    }else if(database.has(message.author.username)){
        var current = database.get(message.author.username);
        user.hook.edit({channel: message.channel}).then(webhook => {
            user.hook = webhook
            processing(message,current);
        });
    }
    
}
function processing(messagesent : Discord.Message, current){

    var username = messagesent.guild!.members.cache.get(messagesent.author.id)!.nickname == undefined? messagesent.author.displayName : messagesent.guild!.members.cache.get(messagesent.author.id)!.nickname;
    var avatar = messagesent.guild!.members.cache.get(messagesent.author.id)!.avatar == undefined? messagesent.author.avatarURL() : messagesent.guild!.members.cache.get(messagesent.author.id)!.avatarURL();
    user.hook.send({
        content: current.message(messagesent.content),
        username: username,
        avatarURL: avatar,
    }).then(message => {
        current.store(messagesent.content, message.channel.id, message.id);
        messagesent.delete();
        var collector = message.createReactionCollector();
        collector.on('collect', (reaction, u) => {
            var userhook = user.messages.get(reaction.message.id);
            user.hook.editMessage(reaction.message.id, userhook.text)
    });
    })
}
new Bot(processMessage,Help.uwu, "timeout");
module.exports = processMessage;