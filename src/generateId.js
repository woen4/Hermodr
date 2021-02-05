const { v5: uuidv5 } = require('uuid');

const id1 = 'f7d952a7c86240709d3b367ed306785f';
const id2 = '4572d0edf9b149f0b3faabf40ee7c813';

function get(id1, id2) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split();

  const blend = (id1 + id2).split('');

  const numbers = [];

  const letters = [];

  blend.forEach((element) => {
    const number = Number(element);
    if (isNaN(number)) {
      letters.push(element);
    } else {
      numbers.push(number);
    }
  });

  const letterSorted = [];

  alphabet.forEach((letter) => {
    letters.forEach((position) => {
      if (position === letter) {
        letterSorted.push(position);
      }
    });
  });

  const id = letterSorted.join('') + numbers.join('');

  return uuidv5(id, '701fd921-662c-4d06-8860-97fd97faeff4');
}

console.log(get(id1, id2));
