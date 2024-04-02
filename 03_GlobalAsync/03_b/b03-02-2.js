function secondJob() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Ошибка");
    }, 3000);
  });
}

const main = async () => {
  try {
    const result = await secondJob();
  } catch (e) {
    console.log(e);
  }
};

main();
