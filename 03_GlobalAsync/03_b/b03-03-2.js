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

const main = async () => {
  try {
    const result1 = await thirdJob(1);
    console.log(result1);
  } catch (error) {
    console.log(error); 
  }

  try {
    const result2 = await thirdJob(2);
    console.log(result2); 
  } catch (error) {
    console.log(error);
  }

  try {
    const result2 = await thirdJob(undefined);
    console.log(result2); 
  } catch (error) {
    console.log(error);
  }
};

main();
