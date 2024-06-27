//! Apply Method: It is used to call the function with the context of the object and pass the arguments as an array.


Function.prototype.myApply = function(context={}, args = []){
    if(typeof this !== 'function'){
        throw new TypeError('Error');
    }
    if(!Array.isArray(args)){
        throw new TypeError('Error');
    }
    context.fn = this; 
    context.fn(...args);
}

let car1 = {
    color: "red", 
    company: "Ferrari",
}

function purchaseCar(currency){
    console.log(`I want to purchase ${this.color} ${this.company} car for ${currency} `);
}

purchaseCar.myApply(car1, [50000]);




