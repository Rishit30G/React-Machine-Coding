const API = (time) => {
    return new Promise((res, req) => {
        setTimeout(() => {
            res(`Response from API ${time}`)
        }, time);
    })
}; 

const tasksArray = [API(1000), API(3000), API(2000)]; 

const promisePolyfill = (tasksArray) => {
    let mappedPromises = tasksArray.map((p) => {
        return p.then((value) => {
            return {
                status: 'fulfilled', 
                value,
            }
        }).catch((reason) => {
            return{
                status: 'rejected', 
                reason,
            }
        })
    })
    return Promise.all(mappedPromises);
}

promisePolyfill(tasksArray).then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
});