arr = [12,3,4,5];

// var newArr = arr.filter((item, index, arr) => {
//     console.log(item, index, arr);
//     return item%2 === 0;
// });

// console.log(newArr);

// Polyfill for filter

Array.prototype.myFilter = function(callback){
    var result = [];
    for(let i = 0; i<this.length; i++){
        if(callback(this[i], i, this)){
            result.push(this[i]);
        }
    }
}

var newArr = arr.myFilter((item, index, arr) => {
    // console.log(item, index, arr);
    return item%2 === 0;
});