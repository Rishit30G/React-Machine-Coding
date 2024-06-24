arr = [12,3,4,5];


var newArr = arr.map((item, index, arr) => {
    console.log(item, index, arr);
    return item;
})

console.log(newArr);


//Polyfill for map

Array.prototype.myMap = function(callback){
    var result = [];
    for(let i = 0; i< this.length; i++){
        result.push(callback(this[i], i, this));
    }
}

var newArr = arr.myMap((item, index, arr) => {
    console.log(item, index, arr);
    return item;
})
