

const getArgs = (args) => {
    const res = {};
    const [executer, file,...rest] = args; // первые два значения в executer и file, остальное в rest
    rest.forEach((value, index, array) => {
        if(value.charAt(0) == '-') {       // если первый символ первого значения равен дефису
            if(index == array.length - 1) { //проверка того, что мы дошли до последнего элемента
                res[value.substring(1)] =  true;
            } else if(array[index + 1].charAt(0) != '-') {   //проверка следующего аргумента, должен быть не равен дефису
                res[value.substring(1)] = array[index + 1]; //от value отбрасываем первый символ, это будет наш ключ
            } else {
                res[value.substring(1)] = true;
            }
        }         
    });
    return res;
};

export {getArgs};