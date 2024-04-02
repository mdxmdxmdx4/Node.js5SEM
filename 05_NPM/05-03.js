const {send} = require('./m05_ldi/index.js')

async function main() {
    let from = 'leshuk_03@mail.ru';
    let to = 'lonelystarpinkphloyd@gmail.com';
    let pass = 'fL3tLfF2p0mPate9FJ7w';
    let message = 'This message was sent by standalone function from m05_ldi';
  
    try {
      await send(from, to, pass, message);
      console.log('Функция send успешно выполнена');
    } catch (error) {
      console.error('Произошла ошибка при выполнении функции send:', error);
    }
}
  
main();