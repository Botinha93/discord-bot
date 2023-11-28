
import { attribute as Atrribute } from "../attributes";
export class Skills{
    private attribute : Array<Atrribute>
    name : string
    description : string
    basic : boolean
    category:string;
    static database = {skills : new Map<String,Skills>(), basicSkills: new Map<String,Skills>(), categories:{}}

    constructor(name : string ,description : string,category:string, basic = false,attribute? : Atrribute | [Atrribute,Atrribute]) {
        this.attributes = attribute;
        this.name = name;
        this.description = description
        this.category = category;
        this.basic =basic
        this.setDB(this)
    }
    private setDB(tostore :Skills){
        if(Skills.database.categories[tostore.category] == undefined){
            Skills.database.categories[tostore.category] = new Map<String,Skills>();
        }
        (Skills[tostore.category] as Map<String,Skills>).set(tostore.name,this)
        Skills.database.skills.set(tostore.name,this)
        if(tostore.basic){Skills.database.basicSkills.set(tostore.name,this)}
    }
    get attributes():Array<Atrribute>{
        return this.attribute
    }
    set attributes(value: Atrribute | [Atrribute,Atrribute] | undefined){
        if(value == undefined){
            this.attribute = new Array<Atrribute>()
        }else
            this.attribute = (Array.isArray(value)? value : [value,value])
    }

}