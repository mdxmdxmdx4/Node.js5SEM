function calculateSquare(value){
    return new Promise((resolve, reject)=>{
        if(typeof value !== "number"){
            reject("error");
        }
        else{
            const square = Math.pow(value, 2);
            resolve(square);
        }
    });
}

function calculateCube(value){
    return new Promise((resolve, reject)=>{
        if(typeof value !== "number"){
            reject("error");
        }
        else{
            const cube = Math.pow(value, 3);
            resolve(cube);
        }
    });
}

function calculateFourthPower(value){
    return new Promise((resolve, reject)=>{
        if(typeof value !== "number"){
            reject("error");
        }
        else{
            const fourthPower = Math.pow(value, 4);
            resolve(fourthPower);
        }
    });
}

const number = 7;

Promise.all([
    calculateSquare(number),
    calculateCube('12'),
    calculateFourthPower(number)
]).then(([squareResult, cubeResult, fourthResult])=>{
    console.log(`Square: ${squareResult}`);
    console.log(`Cube: ${cubeResult}`);
    console.log(`Fourth: ${fourthResult}`);
}).catch((error)=>{
    console.log(error);
})
