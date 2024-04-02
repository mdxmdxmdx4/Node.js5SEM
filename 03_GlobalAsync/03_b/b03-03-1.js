const thirdJob = (data) => {
  if (typeof data !== "number") {
    return Promise.reject("error");
  }

  if (data % 2 !== 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("odd");
      }, 1000);
    });
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("even");
    }, 2000);
  });
};

const main = () => {
  thirdJob(1).then((data) => {
    console.log(data); //
  }).catch((error) => {
    console.log(error);
  });

  thirdJob(2).then((data) => {
    console.log(data); 
  }).catch((error) => {
    console.log(error);
  });

  thirdJob('asd').then((data) => {
    console.log(data); 
  }).catch((error) => {
    console.log(error);
  });
};

main();
