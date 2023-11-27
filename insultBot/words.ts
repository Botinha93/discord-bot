export enum types{
    NOUN = 1,
    VERB = 2,
    ENDING = 3
}
export enum weakness{
    Style = 2,
    Poverty = 4,
    Weakness = 1,
    Size = 20,
    Reality = 10,
    Origin=40,
    Serious =100,
    Family = 400,
    Sins = 200,
    AgeDeath=1000,
    Modern=2000
}

export class Word {
    static nouns = Array<Word>() 
    static verb = Array<Word>() 
    static ending = Array<Word>() 
    word:string
    weakness:number
    needsNoun:boolean
    plural:Array<string>
    type : types
    constructor(type : types, word : string, weakness=0 , needsNoun = false, plural = ["",""]) {
        this.word = word;
        this.weakness = weakness;
        this.needsNoun = needsNoun;
        this.plural = plural;
        this.type = type;
        if(type == types.ENDING) Word.ending.push(this);
        if(type == types.NOUN) Word.nouns.push(this);
        if(type == types.VERB) Word.verb.push(this);
    }
}
new Word(types.NOUN,"a cheap suit",weakness.Style+weakness.Poverty)
new Word(types.NOUN,"a cheese shop")
new Word(types.NOUN,"a frightened schoolboy",weakness.Weakness)
new Word(types.NOUN,"a grunting sow",weakness.Size)
new Word(types.NOUN,"a hamster")
new Word(types.NOUN,"a lumberjack")
new Word(types.NOUN,"a muppet")
new Word(types.NOUN,"a platypus")
new Word(types.NOUN,"a public loo")
new Word(types.NOUN,"a red-arsed baboon")
new Word(types.NOUN,"a strange woman lying in a pond")
new Word(types.NOUN,"angry mob")
new Word(types.NOUN,"an ordinary pigsty",weakness.Reality)
new Word(types.NOUN,"elderberries")
new Word(types.NOUN,"Homeless man's socks",weakness.Size+weakness.Poverty)
new Word(types.NOUN,"satan",weakness.Sins)
new Word(types.NOUN,"some bloody minger")
new Word(types.NOUN,"some dirty rag")
new Word(types.NOUN,"some dog")
new Word(types.NOUN,"someone insane")
new Word(types.NOUN,"spam")
new Word(types.NOUN,"stalin's jockstrap",weakness.Origin)
new Word(types.NOUN,"the African swallow")
new Word(types.NOUN,"the Communists",weakness.Origin+weakness.Style)
new Word(types.NOUN,"the Nazis",weakness.Serious)
new Word(types.NOUN,"the Queen",weakness.Serious)
new Word(types.NOUN,"the royal family",weakness.Serious)
new Word(types.NOUN,"this conversation")
new Word(types.NOUN,"this place")
new Word(types.NOUN,"you")
new Word(types.NOUN,"your beloved auntie",weakness.Family)
new Word(types.NOUN,"your country",weakness.Origin)
new Word(types.NOUN,"your cousin's car")
new Word(types.NOUN,"your face",weakness.Size)
new Word(types.NOUN,"your father",weakness.Family)
new Word(types.NOUN,"your favourite Bond actor")
new Word(types.NOUN,"your hat",weakness.Style)
new Word(types.NOUN,"your house",weakness.Poverty)
new Word(types.NOUN,"your hovercraft")
new Word(types.NOUN,"your husband",weakness.Family)
new Word(types.NOUN,"your math teacher")
new Word(types.NOUN,"your mother",weakness.Family)
new Word(types.NOUN,"your seat")
new Word(types.NOUN,"your sense of style",weakness.Size)
new Word(types.NOUN,"your sister",weakness.Family)
new Word(types.NOUN,"your son",weakness.Family)
new Word(types.NOUN,"your wife",weakness.Family)
new Word(types.VERB,"",0,false,["is","are"]);
new Word(types.VERB,"",0,false,["is","are"]);
new Word(types.VERB,"an old bugger",weakness.AgeDeath,false,["is","are"]);
new Word(types.VERB,"deceased",weakness.AgeDeath+ weakness.Serious,false,["is","are"]);
new Word(types.VERB,"dull and ugly",weakness.Size,false,["is","are"]);
new Word(types.VERB,"full of eels",0,false,["is","are"]);
new Word(types.VERB,"getting fat",weakness.Size,false,["is","are"]);
new Word(types.VERB,"interested in photography",0,false,["is","are"]);
new Word(types.VERB,"no more",weakness.AgeDeath,false,["is","are"]);
new Word(types.VERB,"not a part of Europe",weakness.Origin,false,["is","are"]);
new Word(types.VERB,"not interesting",weakness.Reality,false,["is","are"]);
new Word(types.VERB,"not migratory",0,false,["is","are"]);
new Word(types.VERB,"old",weakness.AgeDeath,false,["is","are"]);
new Word(types.VERB,"rather plain",0,false,["is","are"]);
new Word(types.VERB,"rude",0,false,["is","are"]);
new Word(types.VERB,"scratched",0,true,["is","are"]);
new Word(types.VERB,"silly",0,false,["is","are"]);
new Word(types.VERB,"stone dead",weakness.AgeDeath,false,["is","are"]);
new Word(types.VERB,"very naughty",0,false,["is","are"]);
new Word(types.VERB,"vile",0,false,["is","are"]);
new Word(types.VERB,"worthless",weakness.Poverty+ weakness.Poverty,false,["is","are"]);
new Word(types.VERB,"born in",weakness.Origin,true,["was","were"]);
new Word(types.VERB,"burnt like a witch",weakness.Sins,false,["was","were"]);
new Word(types.VERB,"defeated by",weakness.Poverty,true,["was","were"]);
new Word(types.VERB,"in jail",0,false,["was","were"]);
new Word(types.VERB,"a steaming romp with",weakness.Sins,true,["has","have"]);
new Word(types.VERB,"an unsightly face",weakness.Size,false,["has","have"]);
new Word(types.VERB,"bad breath",weakness.Reality,false,["has","have"]);
new Word(types.VERB,"bum cancer",weakness.Reality,false,["has","have"]);
new Word(types.VERB,"only local multiplayer",weakness.Modern,false,["has","have"]);
new Word(types.VERB,"tiny feet",0,false,["has","have"]);
new Word(types.VERB,"worse hair than",weakness.Style,true,["has","have"]);
new Word(types.VERB,"like",0,true,["act","acts"]);
new Word(types.VERB,"pictures of",0,true,["admire","admires"]);
new Word(types.VERB,"bother me");
new Word(types.VERB,"can be found in Pokémon GO",weakness.Modern);
new Word(types.VERB,"can't dance");
new Word(types.VERB,"can't exercise because of",weakness.Size,true);
new Word(types.VERB,"can't tie a tie",weakness.Style);
new Word(types.VERB,"into",0,true,["change","changes"]);
new Word(types.VERB,"like",0,true,["dance","dances"]);
new Word(types.VERB,"n't like",0,true,["do","does"]);
new Word(types.VERB,"n't own a colour telly",weakness.Modern+ weakness.Poverty,true,["do","does"]);
new Word(types.VERB,"enjoyed Batman v Superman",weakness.Modern);
new Word(types.VERB,"in your general direction",0,false,["fart","farts"]);
new Word(types.VERB,"farted on",0,true);
new Word(types.VERB,"to flash in the park",0,false,["like","likes"]);
new Word(types.VERB,"like",0,true,["look","looks"]);
new Word(types.VERB,"like a sad lemur",weakness.Size,false,["look","looks"]);
new Word(types.VERB,"fun of the Pope",weakness.Serious,false,["make","makes"]);
new Word(types.VERB,"me sick",0,false,["make","makes"]);
new Word(types.VERB,"must be fun at parties",);
new Word(types.VERB,"never watched Star Wars",weakness.Modern);
new Word(types.VERB,"hidden object games",weakness.Modern,false,["play","plays"]);
new Word(types.VERB,"pre-ordered No Man's Sky",weakness.Modern);
new Word(types.VERB,"poses nude for",0,true);
new Word(types.VERB,"on granny's clothing",weakness.Style,false,["put","puts"]);
new Word(types.VERB,"secretly adore",0,true);
new Word(types.VERB,"next to",0,true,["sit","sits"]);
new Word(types.VERB,"of",0,true,["smell","smells"]);
new Word(types.VERB,"stalked",0,true);
new Word(types.VERB,"Windows Vista",weakness.Modern,false,["still use","still uses"]);
new Word(types.VERB,"at Overwatch",weakness.Modern+ weakness.Poverty,false,["suck","sucks"]);
new Word(types.VERB,"supports",0,true);
new Word(types.VERB,"swallowed a chewing gum",);
new Word(types.VERB,"to strangers",0,false,["talk","talks"]);
new Word(types.VERB,"silly",0,false,["walk","walks"]);
new Word(types.VERB,"wanted to be");
new Word(types.VERB,"second-hand clothes",weakness.Style+ weakness.Poverty,false,["wear","wears"]);
new Word(types.VERB,"will always be alone",weakness.Size+weakness.Reality);
new Word(types.VERB,"will soon kick the bucket",weakness.AgeDeath);
new Word(types.VERB,"worked with",0,true);
new Word(types.ENDING,"mate!")
new Word(types.ENDING,"respectfuly!")
new Word(types.ENDING,"my noble!")
new Word(types.ENDING,"and everybody knows that!")
new Word(types.ENDING,"and I have proof!")
new Word(types.ENDING,"and it's scientifically proven!")
new Word(types.ENDING,"and piss off")
new Word(types.ENDING,"and you can't deny it!")
new Word(types.ENDING,"and you know it's true!")
new Word(types.ENDING,"like a minging peasant!", weakness.Origin+weakness.Poverty)
new Word(types.ENDING,"nudge nudge!")
new Word(types.ENDING,"pardon my French!")
new Word(types.ENDING,"you child of a washerwoman!", weakness.Poverty)
new Word(types.ENDING,"you commoner!",weakness.Origin+weakness.Poverty)
new Word(types.ENDING,"you inbred twit!")
new Word(types.ENDING,"you lying git!")
