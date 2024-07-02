/* \nfile_search\n\n

file_search


【
】 */

let array = arr = ["Jo", "file_search", "【32:1†source】", "【32:1†source】"]
console.log(array.includes('【'));
console.log(array.some(element => element.includes('【')));

let positions = array
    .map((element, index) => ({ elementIndex: index, charIndex: element.indexOf('【') }))
    .filter(position => position.charIndex !== -1);

console.log(positions);

// console.log(array.indexOf('file_search'));
// console.log(array.includes('file_search'));

// let string = "Deine Mudda ist fett file_search alwujdhaizuwdh";
// console.log(string.includes("file_search"));