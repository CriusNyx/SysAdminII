  
function Default(value, defaultValue){
    if(value != null){
        return value;
    }
    else{
        return defaultValue;
    }
}

export default Default;