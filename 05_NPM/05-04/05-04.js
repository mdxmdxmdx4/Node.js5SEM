const emailModule = require('../m05_ldi/index.js');

async function main() {
    let from = 'leshuk_03@mail.ru';
    let to = 'lonelystarpinkphloyd@gmail.com';
    let pass = 'fL3tLfF2p0mPate9FJ7w'; 
    let message = 'Global module, you know?';
  
    try {
      await emailModule.send(from, to, pass, message);
      console.log('Функция send успешно выполнена');
    } catch (error) {
      console.error('Произошла ошибка при выполнении функции send:', error);
    }
}
  
main();