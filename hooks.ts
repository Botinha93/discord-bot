import {client} from "./index.ts";
import Discord from "discord.js";
export default class Hook {
    static hooks = new Map<DiscordServerID,Hook>();
    WebHook : Discord.Webhook
    constructor(WebHook : Discord.Webhook) {
        this.WebHook =WebHook;
    }
    async sendMessage(content : Discord.WebhookMessageCreateOptions | string ,channelToUser: Discord.StageChannel | Discord.VoiceChannel | Discord.ForumChannel | Discord.MediaChannel | Discord.GuildTextChannelResolvable | null = null, username:string = process.env.USERNAME!,avatar:string = process.env.AVATAR! ){
        if(channelToUser != null){
            return await this.WebHook.edit({channel:channelToUser!}).then(webhook => {
                this.WebHook = webhook;
                    return this.send(this.WebHook,content,username,avatar);
            });
        }
        return this.send(this.WebHook,content,username,avatar);
    }
    private async send(webhook:Discord.Webhook, content : Discord.WebhookMessageCreateOptions | string , username:string ,avatar:string){
        if((typeof content ) === 'string' ){
            return webhook.send({
                content : content as string,
                avatarURL: avatar,
                username:username
            });
        }
        return webhook.send(content as Discord.WebhookMessageCreateOptions);
        
    }
    static setUP(){
        console.log("RECOVERING WEBHHOOKS"); 
        client.guilds.cache.forEach(guild =>{
            guild.fetchWebhooks().then(webhooks => {webhooks.forEach(webhook => {
                if(webhook.name == "timeout"){
                    Hook.hooks.set(guild.id,new Hook(webhook))
                }
            })
            if(!Hook.hooks.has(guild.id)){
                guild.channels.cache.forEach(channel =>{
                    if(channel.isTextBased()){
                        (channel as Discord.TextChannel).createWebhook({
                            name: "timeout",
                        }).then(webhook => Hook.hooks.set(guild.id,new Hook(webhook)))
                    }
                })
            }
        })
        })
    }
}
class DiscordServerID extends String{
}
