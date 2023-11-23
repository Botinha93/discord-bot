import Discord from 'discord.js';
class botControl{
    public enabled : Boolean;
    public func : Bot;
    constructor(enabled : Boolean, func : Bot){
        this.enabled = enabled;
        this.func = func;
    }
}
export class Bot{
    static functions = new Map<String,botControl>();
    processMessage : (message: Discord.Message, admin: Boolean) => void;
    startUP : () => void;
    help : Function;
    constructor(funcMessage : (message: Discord.Message, admin: Boolean) => void, help : Function, name : string, startUP = ()=>{}){
        console.log(name)
        this.processMessage = funcMessage;
        this.help = help;
        this.startUP = startUP;
        Bot.functions.set(name, new botControl(false, this));
    }
}