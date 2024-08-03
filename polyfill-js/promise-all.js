const API = (time) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(`Response from API ${time}`)
        }, time)
    }) 
}

const tasksArray = [API(3000), API(2000), API(1000)]

const promisePolyfill = (tasksArray) => {
    return new Promise((res, rej) => {
        let results = []
        let resolveCounter = 0
        tasksArray.forEach((item, index) => {
            item.then((data) => {
                results[index] = data
                resolveCounter++
                if (resolveCounter === tasksArray.length) {
                    res(results)
                }
            }).catch((err) => {
                rej(err)
            })
        })
    })
}

promisePolyfill(tasksArray).then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
});