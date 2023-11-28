import { attribute as Atrribute } from "../attributes";
import { Skills } from "./skills";

new Skills("Dodge", "The hability do dodge mele attacks","Defensive",true,Atrribute.dexterity);
new Skills("Climbing", "The hability do dodge mele attacks","Athletic",true,[Atrribute.dexterity,Atrribute.strenght]);
new Skills("Weapon Smithing", "How good you are at building weapons","Crafts",true);