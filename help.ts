import Discord from 'discord.js';
export class Help{
    static mainScreen(boots) {
         return new Discord.EmbedBuilder()
         .setColor(0x0099FF)
         .setTitle("The Bot")
         .setDescription(" Welcome to **The Bot (no name)**! 🎉every bot we create will be added under the same command \"b!\"\n\nThis help screen will give you the basic functionalities. The commands shown should have whatever is inside **<Value_inside>** exchanged for said value, example: \n\n **b! <enable_or_disabled> <bot_name>** will be **b! enable wordban**\n\n")
         .addFields(
           {"name": "Current bots", "value": boots},
           {"name": "Enable or disable a bot", "value": "b! <enable_or_disabled> <bot_name>"}, 
           {"name": "Child bot functions", "value": "b! <bot_name>"})
         .setTimestamp()

    }
    static uwu(){
            return                 {
                  "id": 652627557,
                  "name": "Timeout",
                  "title": "Timeout",
                  "username":"Bot Helper",
                  "description": "Forces a user message to be translated to a alternative form of speech, does not save the users betwen sessions.\n\nSupported severity: \n· 1. uwu, \n· 2. leet\n· 3. full cat\n\n",
                  "color": 15409973,
                  "fields": [
                    {
                      "id": 57762242,
                      "name": "Add",
                      "value": "Puts a new user in the punishment list:\n\nb! timeout add <UserName_to_be_banned> <Numer_Of_Messages> <Severity>\n\n"
                    },
                    {
                      "id": 349373621,
                      "name": "Remove",
                      "value": "Removes a user from the list before the allocated time:\n\nb! timeout remove <UserName_to_be_unbanned>",
                      "inline": false
                    }
                  ]
                }
              
    }
    static banned(){
        return             {
              "name": "Banword",
              "title": "Banword",
              "username":"Bot Helper",
              "description": "Bans frequently used words by a random amount of uses, if a word isnt used for a random amount of messages a different word is banned.\n\nAlternatively you can define a custom banned content to be identified in any message\n\nWhen the banned behavior is found the message is deleted and the bot tells such content is lost for now.",
              "color": 2353981,
              "fields": [
                {
                  "name": "Users",
                  "value": "Defines if the bot will be white/black list or apply globally (type_list: white, black, global), **defaults to global**\n\nb! banword users <type_list> \n\n"
                },
                {
                  "name": "Add",
                  "value": "Adds a user to the white/black list\n\nb! banword users add <username>",
                  "inline": false
                },
                {
                  "name": "Remove",
                  "value": "Remove a user in the white/black list\n\nb! banword users remove <username>",
                  "inline": false
                },
                {
                  "name": "Custom",
                  "value": "Toggles using the default word list behavior\n\nb! banword custom off",
                  "inline": false
                },
                {
                  "name": "Set Custom",
                  "value": "Toggles using custom behavior, the behavior has to be configured for this option to work\n\nb! banword custom <word_letter_or_phrase_to_ban> <Message_to_show>",
                  "inline": false
                },
                {
                  "name": "Banned",
                  "value": "Shows the current banned word and for how long\n\nb! banword banned ",
                  "inline": false
                }
              ]
            }
          
    }
}