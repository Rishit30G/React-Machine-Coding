//! Call Method: It is used to call the function with the context of the object.


Function.prototype.myCall = function(context={}, ...args){
    if(typeof this !== 'function'){
        throw new TypeError('Error');
    }
    context.fn = this; 
    context.fn(...args);
}

let car1 = {
    color: "red", 
    company: "Ferrari",
}

const purchaseCar = (currency) => {
    console.log(`I want to purchase ${this.color} ${this.company} car for ${currency} `);
}

purchaseCar.myCall(car1, 50000);




