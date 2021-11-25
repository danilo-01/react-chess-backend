// Funciton that checks if values are the correct type
// Targets will be an object that has an argument as the key and a typeof as its value
/* 
{
    "username" : "string"
}
*/
const checkTypes = (values, targets) => {
    for(let value of values){
        if(typeof(value) !== "boolean" === targets[value])
    }
}

module.exports = checkTypes;