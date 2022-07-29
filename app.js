const input = document.querySelector(".input");
const output = document.querySelector(".output");
const prettify = document.querySelector(".prettify");
const minify = document.querySelector(".minify");

prettify.addEventListener("click", () => {
  try {
    let formatted = JSON.stringify(JSON.parse(input.value), null, 4);
    output.value = formatted;
  } catch (err) {
    output.value = err.message;
  }
});

minify.addEventListener("click", () => {
    try {
      let formatted = JSON.stringify(JSON.parse(input.value));
      output.value = formatted;
    } catch (err) {
      output.value = err.message;
    }
  });
