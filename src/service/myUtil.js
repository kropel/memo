const getRandom = (max, min = 0) =>
  Math.floor(Math.random() * (max - min) + min);

const cutElementFromArray = (array, cutIndex = null, deleteCount = 1) => {
  let length = array.length;
  //   if (length < 1) return [];
  cutIndex = cutIndex || getRandom(length);
  //   if (cutIndex > length) return [];
  return array.splice(cutIndex, deleteCount)[0];
};

const getNumberAllElemArray = (array) => {
  let counter = 0;
  (function countMethod(array) {
    array.forEach((elem) =>
      Array.isArray(elem) ? countMethod(elem) : ++counter
    );
  })(array);
  return counter;
};

const removeFromArray = (array, ...items) => {
  let filterItems = items.flat();
  return array.filter((elem) => !filterItems.some((item) => elem === item));
};

module.exports = {
  getRandom,
  cutElementFromArray,
  getNumberAllElemArray,
  removeFromArray,
};
