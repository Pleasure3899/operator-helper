function getLastId(array) {
    var lastValue = 0;
    for (let i=0; i<array.length; i++) {
        if (array[i].id>lastValue)
        lastValue=array[i].id
    }
    return lastValue;
}

export default getLastId;