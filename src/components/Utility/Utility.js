
const extractNumFromString = (str) => {
    if(str.length > 0){
        const numbers = str.match(/\d+\.?\d*/g);
        if(numbers){
            if(numbers.length > 0){
                return numbers;
            }
            return;
        }
        return;
    }
    return;
}

const extractOperatorFromString = (str) => {
    if(str.length > 0){
        const operators = str.match(/[^\d \.]/g);
        if(operators){
            if(operators.length > 0){
                return operators;
            }
            return;
        }
        return;
    }
    return;
}

export {extractNumFromString, extractOperatorFromString};