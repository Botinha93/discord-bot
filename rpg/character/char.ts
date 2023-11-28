import {attributes , Attributes} from './attributes'
class char{
    attributes : Attributes
    constructor(attributes:attributes){
        this.attributes = new Attributes(attributes)
    }
}