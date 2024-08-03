const arr = [12,3,4,5];

var newArr = arr.reduce((acc, item, index, arr) => {
    if(acc < item){
        acc = item;
    }
    return acc;
}, -Infinity);

console.log(typeof newArr);


// Polyfill for reduce

Array.prototype.myReduce= function(callbackFn, initialValue) {
    var accumulator = initialValue;
    for (var i = 0; i < this.length; i++) {
      if (accumulator !== undefined) {
        accumulator = callbackFn(accumulator, this[i],   i, this);
      } else {
        accumulator = this[i];
      }
    }
    return accumulator;
  }

var newArr = arr.myReduce((acc, item, index, arr) => {
    if(acc < item){
        acc = item;
    }
    return acc;
}, -Infinity);

console.log(newArr);