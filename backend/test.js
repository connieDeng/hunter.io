const sortOnKeys = (dict) => {
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
    
    // Sort the array based on the second element
    items.sort(function(first, second) {
    return second[5] - first[5];
    });     

    return items
}

let arr = { 0: 1, 1: 10, 2: 2};
console.log(sortOnKeys(arr));
