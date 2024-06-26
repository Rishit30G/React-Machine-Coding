//! Bind Method: It is used to call the function with the context of the object and pass the arguments as an array. But it doesn't call the function immediately. It returns a function that can be called later.


Function.prototype.myBind = function(context={}, ...args){
    if(typeof this !== 'function'){
        throw new Error("Error");
    }

    context.fn = this; 
    return function (...newArgs){
        return context.fn(...args, ...newArgs)
    }

}

let car1 = {
    color: "red", 
    company: "Ferrari",
}

const purchaseCar = (currency, crypto) => {
    console.log(`I want to purchase ${this.color} ${this.company} car for ${currency} / ${crypto} `);
}

const x = purchaseCar.myBind(car1, 50000);
x('BTC');

