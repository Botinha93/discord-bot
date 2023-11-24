import Discord from 'discord.js'
import {Bot} from './defBot'
import fs from 'fs'
import Hook from "./hooks.ts";
import Config from "./config.json";

const hornyWords = [
    "horny",
    "anal",
    "anus",
    "arschloch",
    "arse",
    "ash0le",
    "ash0les",
    "asholes",
    "ass",
    "ass",
    "asshole",
    "assrammer",
    "ayir",
    "b!+ch",
    "b!tch",
    "b00b",
    "b00bs",
    "b17ch",
    "b1tch",
    "bara",
    "bdsm",
    "bestiality",
    "bi+ch",
    "bi7ch",
    "biatch",
    "bitch",
    "bitch",
    "bitches",
    "blow Job",
    "blowjob",
    "boffing",
    "bondage",
    "boob",
    "boobies",
    "boobs",
    "boobs",
    "boobys",
    "bound & gagged",
    "bound and gagged",
    "breast",
    "breasts",
    "breasts",
    "buceta",
    "bukkake",
    "butt",
    "butthole",
    "butt-pirate",
    "c0ck",
    "c0cks",
    "c0k",
    "cameltoe",
    "carpet muncher",
    "cawk",
    "cazzo",
    "chraa",
    "chuj",
    "clit",
    "clits",
    "cnts",
    "cntz",
    "cock",
    "cocks",
    "condom",
    "crap",
    "creampie",
    "cum",
    "cum-shot",
    "cunt",
    "cunts",
    "cuntz",
    "d4mn",
    "daygo",
    "deep thraot",
    "deep throat",
    "deep throating",
    "deepthraot",
    "deep-thraot",
    "deepthraoting",
    "deep-thraoting",
    "dego",
    "dick",
    "dild0",
    "dild0s",
    "dildo",
    "dildos",
    "dilld0",
    "dilld0s",
    "dominatricks",
    "dominatrics",
    "dominatrix",
    "dp",
    "emetophilia",
    "enema",
    "erection",
    "erections",
    "erotic",
    "erotica",
    "escort",
    "f u c k",
    "f u c k e r",
    "facesitting",
    "facial",
    "fcuk",
    "felching",
    "femdon",
    "fetish",
    "fisting",
    "fuck",
    "fuck",
    "fucked",
    "fucker",
    "fucker",
    "fuckin",
    "fucking",
    "fucking",
    "fucks",
    "fucks",
    "fuk",
    "fukk",
    "futanari",
    "futkretzn",
    "g00k",
    "gapping",
    "glory hole",
    "gloryhole",
    "gock",
    "gonzo",
    "gook",
    "gore",
    "guro",
    "hardon",
    "hard-on",
    "helvete",
    "hentai",
    "hoer",
    "honkey",
    "hoore",
    "hore",
    "hump",
    "humped",
    "humping",
    "hustler",
    "incest",
    "jackoff",
    "jap",
    "japs",
    "jerkoff",
    "jerk-off",
    "jisim",
    "jism",
    "jiss",
    "jizm",
    "jizz",
    "kinky",
    "knob",
    "knobs",
    "knobz",
    "kunt",
    "kunts",
    "kuntz",
    "lolicon ",
    "masochist",
    "masokist",
    "massterbait",
    "masstrbait",
    "masstrbate",
    "masterbaiter",
    "masterbat*",
    "masterbat3",
    "masterbate",
    "masterbates",
    "masturbate",
    "milking",
    "motherfucker",
    "naked",
    "naughty",
    "nude",
    "nutsack",
    "orafis",
    "orgasim",
    "orgasm",
    "orgasm",
    "orgasum",
    "orgie",
    "orgy",
    "oriface",
    "orifice",
    "orifiss",
    "p0rn",
    "pecker",
    "pegging",
    "pen1s",
    "penetration",
    "penis",
    "penis",
    "pet play",
    "porn",
    "porn",
    "pornagraphy",
    "pov",
    "pr0n",
    "preggo",
    "pregnant",
    "pubic",
    "pusse",
    "pussee",
    "pussy",
    "pussy",
    "recktum",
    "rectum",
    "retard",
    "rimjob",
    "rope",
    "rope bunny",
    "sadist",
    "scat",
    "schaffer",
    "schlong",
    "screw",
    "screwing",
    "semen",
    "semen",
    "sex",
    "sex",
    "sexting",
    "sexual",
    "sexy",
    "sexy",
    "skank",
    "slut",
    "slut",
    "sluts",
    "slutty",
    "sluty",
    "slutz",
    "smut",
    "snuf",
    "snuff",
    "sperm",
    "sphencter",
    "sphincter",
    "squirt",
    "swapping",
    "teets",
    "testicle",
    "threesome",
    "tit",
    "titie",
    "tities",
    "tits",
    "twink",
    "upskirt",
    "vagina",
    "virgin",
    "wank",
    "wet",
    "whoar",
    "whore",
    "wore",
    "xrated",
    "xxx",
    "yaoi",
    "yif",
    "yiff",
    "yiffy",
    "youporn",
    "yuri",
    "dom",
    "sub",
    "suby",
    "subby",
    "domm",
    "bottom",
    "top",
    "switch",
    "vers",
    "cylinder",
    "cilinder",
    
]
const channels=[
]
class horny extends Bot{
    static hornyDB = {horny:new Map<string,number>(), count:0};
    constructor(){
        super("horny")
        this.commands.addKey("h!", this.getHorny)
    }
    protected processM(admin: Boolean, message: Discord.Message<boolean>) {
        if(message.content != undefined && hornyWords.some(v => message.content.toLocaleLowerCase().includes(v))){
            if(!horny.hornyDB.horny.has(message.author.id))
                horny.hornyDB.horny.set(message.author.id, 1);
            else
                horny.hornyDB.horny.set(message.author.id, horny.hornyDB.horny.get(message.author.id)! + 1);
            fs.writeFile("./horny.json",JSON.stringify({horny:Object.fromEntries(horny.hornyDB.horny),count:horny.hornyDB.count},null,"\t"), ()=>{})
        }
    }
    async getHorny(admin: Boolean, message?: Discord.Message<boolean> | undefined){
        var map = new Map([...horny.hornyDB.horny.entries()].sort((a, b) => b[1] - a[1]));
        var keys = [...map.keys()];
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
            if(i<1)
                build += "\t### - ⭐ "+ username+"\n"
            else if(i<2)
                build += "\t### - :hot_face: " + username+"\n"
            else if(i<3)
                build += "\t### - :flushed: " + username+"\n"
            else if(i<6)
                build += "\t### - *"+ (i+1) +".* " + username+"\n"
            else if(i<9)
                build += "\t### - "+ (i+1) +". " + username+"\n"
            else if(i<20)
                build += "\t - *"+ (i+1) +".* " + username+"\n"
            else if(i<99)
                build += "\t- "+ (i+1) +". " + username+"\n"
            else if(i<1000)
                build += "\t - "+(i+1) +". " + username+"\n"
        };
        var builder =  new Discord.EmbedBuilder()
        .setColor(Discord.Colors.Blurple)
        .setTitle(":eggplant: **HORNY PEOPLE RANKING** :eggplant: ")
        .setTimestamp()
        .setDescription(build)
        if(!(message == undefined)){
            if( !message.channel.isDMBased() && Hook.hooks.has(message.guild!.id)){
                Hook.hooks.get(message.guild!.id)!.sendMessage({
                    avatarURL: Config.quoteAvatar,
                    username:"Horny Kitten",
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
        var js = JSON.parse(fs.readFileSync("./horny.json",{ encoding: 'utf8', flag: 'r' }))
        horny.hornyDB.horny = new Map(Object.entries(js.horny));
        horny.hornyDB.count = js.count;
    }
    help(admin: Boolean, message?: Discord.Message<boolean> | undefined): Discord.EmbedBuilder {
        var builder =  new Discord.EmbedBuilder()
        .setColor(Discord.Colors.Blurple)
        .setTitle("Horny Bot")
        .setTimestamp()
            builder.setDescription("This bot counts how horny people are, really, just that.")
            .addFields({
                    "name": "Get List",
                    "value": "Get the list of horny:\n**h! list**\n\n",
                    inline: true
                  },
                  {
                    "name": "Personal Position",
                    "value": "Gets your position:\n**h! me**\n\n",
                    inline: true
                  }
                  )
        if(!(message == undefined)){
            if( !message.channel.isDMBased() && Hook.hooks.has(message.guild!.id)){
                Hook.hooks.get(message.guild!.id)!.sendMessage({
                    avatarURL: Config.quoteAvatar,
                    username:"Horny Kitten",
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
new horny();