import './style.css'

const btn = document.querySelector('.increment_btn');
const incrementCount = document.querySelector('.increment_pressed');
const debouncedCount = document.querySelector('.increment_debounced');
const throttledCount = document.querySelector('.increment_throttled');

var debounceCounter = 0; 
var throttleCounter = 0;
var pressedCount = 0; 

//! Debouce Implementation.
const myDebounce = (cb, d) => { // passing a callback function and delay time
  let timer; 

  return function (...args){ // return a function as it's called somewhere where it's needed 
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb(...args); //args passed just in case we need to pass any arguments to the callback function
    }, d);
  }
}

const debounceCount = myDebounce(() => {
  debounceCounter += 1; 
  debouncedCount.innerHTML = debounceCounter;
}, 800);


btn.addEventListener('click', () => {
  incrementCount.innerHTML = ++pressedCount;
  debounceCount();
}); 


//! Throttle Implementation.
const start = new Date().getTime();

const myThrottle = (cb, d) => {
  let last = 0; 

  return function (...args){
    let now = new Date().getTime();
     if(now - last < d){
       return;
     }
     last = now;
     return cb(...args);  
  }
}

const throttleCount = myThrottle(() => {
  throttleCounter += 1; 
  throttledCount.innerHTML = throttleCounter;
}, 1000);

btn.addEventListener('click', () => {
  incrementCount.innerHTML = ++pressedCount;
  const now = new Date().getTime(); 
  const seconds = (now - start) / 1000; 
  console.log(seconds.toFixed()); 
  throttleCount();
});
