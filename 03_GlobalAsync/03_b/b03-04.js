function createOrder(cardNumber){
    return new Promise((resolve,reject)=>{
        if(!validateCard(cardNumber)){
            reject("Card is not valid");
        }
        else{
            setTimeout(()=>{
                result = Math.floor(Math.random() * 100000);
                resolve(result);
            }, 5000);
        }
    })
}

function validateCard(cardNumber){
    console.log(`Card Number:${cardNumber}`);
    return Math.random() < 0.5;
}

function proceedToPayment(orderNumber){
    console.log(`Order ID: ${orderNumber}`);
    return new Promise((resolve, reject)=>{
        if(Math.random() < 0.8){
            resolve("Payment successfull");
        }
        else{
            reject("Payment failed");
        }
    })
}


createOrder("32132267890300518494").then((orderNumber)=>{
    return proceedToPayment(orderNumber);
}).then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
})


// async function handleFourthJob(){
//     try{
//         const orderNumber = await createOrder("123456789123456789");
//         const result = await proceedToPayment(orderNumber);
//         console.log(result);    
//     }
//     catch(error){
//         console.log(error);
//     }
// }

// handleFourthJob();