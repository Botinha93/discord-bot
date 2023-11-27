import { Message, EmbedBuilder } from "discord.js";
import { Bot } from "../defBot";
import * as Words from "./words.ts";

class Games{
    player1 = Array<Words.Word>();
    player2 = Array<Words.Word>();
    player1ID : string
    player2ID : string
    constructor(player1ID,player2ID){
        this.player1ID = player1ID;
        this.player2ID = player2ID;
    }
}
class Insult extends Bot{
    static games = new Map<string,Games>()
    program() {
        
        // we need a list of verbs, adjectives and nouns to randomly choose from
        var subjects = ["your mom", "you", "your parrot", ]
        var verbs = ['sing', 'write JavaScript', 'run', 'dance', 'eat', 'look'];
        var adjectives = ['hyperactive', 'demented', 'squashed'];
        var nouns = ['kangeroo', 'hippo', 'elephant', 'toad'];
      
        //randomly select an item from each list
        var verb = this.getItemFromList(verbs);
        var adj = this.getItemFromList(adjectives);
        var noun = this.getItemFromList(nouns);
        
        //construct the sentence that we'll output
        var sentence ='Hi ' + name + ', you ' + verb + ' like a ' + adj + ' ' + noun + '.';
        
        //output the sentence to the web page
    }
    newGame(idP1, idP2,MessageID:string){
        Insult.games.set(MessageID,new Games(idP1,idP2))
    }

    // return a random item from a list
    getItemFromList(list){
      return list[Math.floor(Math.random()* list.length)]; 
    }
    

    constructor(){
        super("insult")
    }
    protected processM(admin: Boolean, message: Message<boolean>) {
        throw new Error("Method not implemented.");
    }
    startUP() {
        throw new Error("Method not implemented.");
    }
    help(admin: Boolean, message?: Message<boolean> | undefined): EmbedBuilder {
        throw new Error("Method not implemented.");
    }
    
}