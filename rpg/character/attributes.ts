

abstract class Attribute{
    value : number; 
    constructor(value){
        this.value = value
    }
    
}
class AttributeStrenght extends Attribute{description = "Teste" }
class AttributeConstitution extends Attribute{description = "Teste" }
class AttributeAgility extends Attribute{description = "Teste" }
class AttributDexterity extends Attribute{description = "Teste" }
class AttributeCharisma extends Attribute{description = "Teste" }
class AttributeMind extends Attribute{description = "Teste" }
class AttributeIntelligence extends Attribute{description = "Teste" }
class AttributePerception extends Attribute{description = "Teste" }


export enum attribute{
    strenght = "strenght",
    constitution  = "constitution",
    agility ="agility",
    dexterity  = "dexterity",
    charisma  = "charisma",
    mind  = "mind",
    intelligence = "intelligence",
    perception  = "perception",
}

export type attributes= {
    strenght : number
    constitution  : number
    agility  : number
    dexterity  : number
    charisma  : number
    mind  : number
    intelligence : number
    perception  : number
}
export class Attributes {
    private _strenght : AttributeStrenght
    private _constitution  : AttributeConstitution
    private _agility  : AttributeAgility
    private _dexterity  : AttributDexterity
    private _charisma  : AttributeCharisma
    private _mind  : AttributeMind
    private _intelligence : AttributeIntelligence
    private _perception  : AttributePerception

    constructor(attributes : attributes){
        this.strenght = attributes.strenght
        this.constitution = attributes.constitution
        this.agility = attributes.agility
        this.dexterity = attributes.dexterity
        this.charisma = attributes.charisma
        this.mind = attributes.mind
        this.intelligence = attributes.intelligence
        this.perception = attributes.perception
    }
    set strenght(value : number){
        this._strenght = new AttributeStrenght(value)
    }
    get strenght():AttributeStrenght{
        return this._strenght;
    }
    set constitution(value : number){this._constitution = new AttributeConstitution(value)}
    get constitution():AttributeConstitution{return this._constitution; }

    set agility(value : number){this._agility = new AttributeAgility(value)}
    get agility():AttributeAgility{return this._agility; }

    set dexterity(value : number){this._dexterity = new AttributDexterity(value)}
    get dexterity():AttributDexterity{return this._dexterity; }

    set charisma(value : number){this._charisma = new AttributeCharisma(value)}
    get charisma():AttributeCharisma{return this._charisma; }

    set mind(value : number){this._mind = new AttributeMind(value)}
    get mind():AttributeMind{return this._mind; }
    
    set intelligence(value : number){this._intelligence = new AttributeIntelligence(value)}
    get intelligence():AttributeIntelligence{return this._intelligence; }

    set perception(value : number){this._perception = new AttributePerception(value)}
    get perception():AttributePerception{return this._perception; }
}
