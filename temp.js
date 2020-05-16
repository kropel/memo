console.log(
  ["1", "3", "4"].filter((item) => !["1", "3"].some((fil) => fil === item))
);
