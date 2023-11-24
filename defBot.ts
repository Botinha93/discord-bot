import Discord from 'discord.js';
class botControl{
    public enabled : Boolean;
    public func : Bot;
    constructor(enabled : Boolean, func : Bot){
        this.enabled = enabled;
        this.func = func;
    }
}

export abstract class Bot{
    static functions = new Map<String,botControl>();
    protected abstract processM(admin: Boolean, message: Discord.Message);
    commands = new Commands();
    abstract startUP();
    private _name : string;
    abstract help(admin: Boolean, message?: Discord.Message ):Discord.EmbedBuilder;
    constructor(name : string){
        if(name != null ){
            this._name = name;
            Bot.functions.set(name!, new botControl(false, this));
        }
    }
    name(){
        return this._name;
    }
    processMessage(admin: Boolean, message: Discord.Message){
        var temp = (this.commands.processKey(message.content))
        message.content = temp.paran;
        if(temp.func(admin,message) == undefined)
            this.processM(admin,message);
    }
}
export class Commands{
    functions = new Map<string,Commands>();
    func : (admin: Boolean, message: Discord.Message) => void;
    constructor(func = (admin: Boolean, message: Discord.Message) => {}) {
        this.func = func;
    }
    keys(){
        return Object.keys(this.functions.keys());
    }
    addKey(key: string, func : (admin: Boolean, message: Discord.Message) => void){
        this.functions.set(key, new Commands(func))
        return this.getKey(key)!;
    }
    getKey(key: string ){
        if(!this.functions.has(key)){
            return undefined;
        }
        return this.functions.get(key);
    }
    processKey(command : string) : {func : (admin: Boolean, message: Discord.Message)=>void, paran : string}{
            if(command == undefined)
            {
                return {func : this.func, paran : command};
            }
            var com = command.split(/ (.+)/);
            if(!this.functions.has(com[0].toLowerCase())){
                return {func : this.func, paran : command};
            }if(this.functions.has(com[0].toLowerCase())){
                return this.getKey(com[0].toLowerCase())!.processKey(com[1])
            }
            return {func : this.func, paran : command};
    }
}
