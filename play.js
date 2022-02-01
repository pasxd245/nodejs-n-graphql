// Arrow function
const printParams = (p1, p2, p3) => {
  return "Param 1 is " + p1 + ", param 2 is: " + p2 + ", param 3 is" + p3;
};

const add = (a, b) => a + b;
const addOne = (a) => a + 1;
const addRandom = () => 1 + 2;

// Spread operator `...`
const hobbies = ["Sport", "Cooking"];
const copiedArray = [...hobbies];

// Rest operator `...`
const toArray = (...args) => {
  return args;
};
console.log(toArray(1, 2, 3));

// (Object) Destructuring
const person = {
  name: "Max",
  age: 29,
  greet() {
    console.log(`Hello ${this.name}`);
  },
};
const printName = ({ name }) => {
  console.log(name);
};
printName(person);

// (Array) Destructuring
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);

/// Async + Promises:
// => callback function
setTimeout(() => {
  console.log("Time is done: callback.");
}, 2000);
console.log("Hello");
console.log("there");
// ?? nested callback, dependency callback ?
// alternative: Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!");
    }, 1500);
  });
};
console.log("test Promise:");
setTimeout(() => {
  fetchData()
    .then((text) => {
      console.log(text);

      return fetchData();
    })
    .then((text2) => {
      console.log(text2);
    });
}, 2000);
