function calculateSquare(value){
    return new Promise((resolve, reject)=>{
        if(typeof value !== "number"){
            reject("error");
        }
        else{
            setTimeout(()=>{
                const square = Math.pow(value, 2);
                resolve(square);
            }, 2000);
        }
    });
}

function calculateCube(value){
    return new Promise((resolve, reject)=>{
        if(typeof value !== "number"){
            reject("error");
        }
        else{
            setTimeout(()=>{
                const cube = Math.pow(value, 3);
                resolve(cube);
            }, 3000);
        }
    });
}

function calculateFourthPower(value){
    return new Promise((resolve, reject)=>{
        if(typeof value !== "number"){
            reject("error");
        }
        else{
            setTimeout(()=>{
                const fourthPower = Math.pow(value, 4);
                resolve(fourthPower);
            }, 4000);
        }
    });
}

const number = 3;

Promise.race([
    calculateSquare('ásda'),
    calculateCube(number),
    calculateFourthPower(number)
]).then((result)=>{
    console.log(`result: ${result}`);
}).catch((error)=>{
    console.log(error);
})
