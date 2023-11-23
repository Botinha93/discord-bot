import { Help } from "./help.js";
import {Bot} from './defBot.ts';
const ban = [
    "man",
    "quiz",
    "yes",
    "lol",
    "lmao",
    "why",
    "see",
    "would",
    "country",
    "one",
    "should",
    "time",
    "will",
    "know",
    "like",
    "up",
    "use",
    "yeah",
    "city",
    "from",
    "just",
    "think",
    "all",
    "good",
    "make",
    "with",
    "name",
    "some",
    "thing",
    "because",
    "been",
    "even",
    "look",
    "only",
    "same",
    "say",
    "though",
    "about",
    "also",
    "really",
    "mean",
    "people",
    "still",
    "that",
    "wait",
    "time",
    "year",
    "people",
    "way",
    "day",
    "man",
    "thing",
    "woman",
    "life",
    "child",
    "world",
    "school",
    "state",
    "family",
    "student",
    "group",
    "country",
    "problem",
    "hand",
    "part",
    "place",
    "case",
    "week",
    "system",
    "program",
    "question",
    "work",
    "government",
    "number",
    "night",
    "point",
    "home",
    "water",
    "room",
    "mother",
    "area",
    "money",
    "story",
    "fact",
    "month",
    "lot",
    "right",
    "study",
    "book",
    "eye",
    "job",
    "word",
    "issue",
    "side",
    "kind",
    "head",
    "house",
    "friend",
    "hour",
    "game",
    "line",
    "end",
    "city",
    "name",
    "team",
    "minute",
    "idea",
    "kid",
    "body",
    "back",
    "parent",
    "face",
    "others",
    "level",
    "office",
    "door",
    "health",
    "person",
    "art",
    "morning",
    "reason",
    "girl",
    "guy",
    "moment",
    "air",
    ]

const users = new Map();
    
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
var rand = getRandomInt(4)+1;
var current = getRandomInt(ban.length -1);
var count = 0;
var countIDDLE = 0;
console.log("banned: "+ban[current]+" for "+ rand)
function banWord (message, admin){
    if(admin){
        administra(message);
    }else{
        if(!global){
            if((white && users.has(message.author.username)) || (!white && !users.has(message.author.username)))
                processM(message)
        }else{
            processM(message)
        }
    }
}
function processM(message){
    if(use){
        if(message.content.toLocaleLowerCase().includes(ban[current]) && !(message.author.displayName === "Letter_Bot")) {
            countIDDLE = 0;
            message.delete() // Deletes the message
            message.channel.send("The word '"+ban[current]+"' is lost to us, for now");
            count++;
            if(count === rand){
                rand = getRandomInt(4)+1;
                current = getRandomInt(ban.length)+1;
                count = 0;
                console.log("banned: "+ban[current]+" for "+ rand)
            }
        }else{
            countIDDLE++;
            if(countIDDLE>100){
                rand = getRandomInt(4)+1;
                current = getRandomInt(ban.length)+1;
                count = 0;
                console.log("banned: "+ban[current]+" for "+ rand)
                countIDDLE = 0;
            }
        }
    }else{
        banCustom(message);
    }
}

var applyGlobal = true;
var use = true;
var white = true;
var custom="";
var response = "";
function banCustom(message){
    if(message.content.toLocaleLowerCase().includes(custom) && !(message.author.displayName === "Letter_Bot")) {
        message.delete();
        message.channel.send(response);
    }
}
function administra(admmess){
    var message = admmess.content.toLocaleLowerCase().split(" ");
    try {
        if(message.length > 3){
            if(message[2].includes("custom")){
                if(message.length> 5 ){
                    use = false;
                    custom = message[3];
                    for (let index = 4; index < message.length; index++) {
                        response = message[index] + " ";
                    }
                    admmess.channel.send("Using custom ban");
                }else{
                    use = true;
                    admmess.channel.send("Using word list");
                }
            }else if(message[2].includes("users")){
                if(message.length > 4 && message[3].includes("add")){
                    applyGlobal = false;
                    users.set(message[4], "")
                    admmess.channel.send("Add user");
                }else if(message.length > 4 && message[3].includes("remove")){
                    users.delete(message[4])
                    admmess.channel.send("Removed user");
                }else{
                    if(message[3].includes("white")){
                        white = true;
                    }else if(message[3].includes("black")){
                        white = false;
                    }else{
                        applyGlobal = true;
                        admmess.channel.send("Using global ban");
                    }
                }
            }else{
                admmess.channel.send({embeds: Help.banned()});
            }
        }else{
            if(message[2].includes("banned")){
                admmess.channel.send("banned: "+ban[current]+" for "+ rand);
            }else
                admmess.channel.send({embeds: Help.banned()});
        }
    } catch (error) {
        admmess.channel.send({embeds: Help.banned()});
        console.log(error)
    }   
}
new Bot(banWord,Help.banned, "banword");
console.log("teste")