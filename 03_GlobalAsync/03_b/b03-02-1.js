function secondJob() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("smth happend");
    }, 3000);
  });
}

const main = () => {
  secondJob()
    .then((data) => {
      console.log('Success: ', data);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
};

main();
