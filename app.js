const input = document.querySelector(".input");
const output = document.querySelector(".output");
const prettify = document.querySelector(".prettify");
const minify = document.querySelector(".minify");
var codeEditor = document.getElementById("codeEditor");
var lineCounter = document.getElementById("lineCounter");

const keymap = new Map();
keymap.set('{','}');
keymap.set('[',']');
keymap.set('(',')');
keymap.set("'","'");
keymap.set('"','"');

const seen_indices = new Map();


prettify.addEventListener("click", () => {
  try {
    let formatted = JSON.stringify(JSON.parse(input.value), null, 4);

    output.value = formatted;

    line_counter();
  } catch (err) {
    output.value = err.message;
  }
});

minify.addEventListener("click", () => {
  try {
    let formatted = JSON.stringify(JSON.parse(input.value));
    output.value = formatted;

    line_counter();
  } catch (err) {
    output.value = err.message;
  }
});

// To synchronise the scrolling of both Textareas
codeEditor.addEventListener("scroll", () => {
  lineCounter.scrollTop = codeEditor.scrollTop;
  lineCounter.scrollLeft = codeEditor.scrollLeft;
});

// To enable the Tab key to be input into the code editor component:
codeEditor.addEventListener("keydown", (e) => {
  let { keyCode } = e;
  let { value, selectionStart, selectionEnd } = codeEditor;
  if (keyCode === 9 && !e.shiftKey && value.slice(selectionEnd) !== "\n") {
    // TAB = 9
    e.preventDefault();
    codeEditor.value =
      value.slice(0, selectionStart) + "\t" + value.slice(selectionEnd);
    codeEditor.setSelectionRange(selectionStart + 1, selectionStart + 1);
  }
});

// to output the line counter display
var lineCountCache = 0;
function line_counter() {
  var lineCount = codeEditor.value.split("\n").length;
  var outarr = new Array();
  if (lineCountCache != lineCount) {
    for (var x = 0; x < lineCount; x++) {
      outarr[x] = x + 1;
    }
    lineCounter.value = outarr.join("\n");
  }
  lineCountCache = lineCount;
}

codeEditor.addEventListener("input", () => {
  line_counter();
});


input.addEventListener('keyup',(e)=>{

  var a = Array.from(input.value);
  var cur = e.target.selectionStart;
  if (seen_indices.has(cur-1) || cur === 1 || cur === 2 || cur === 6 || cur === 8 || cur === 14 ){
    return
  }
  autocomplete(a, cur);
})

function autocomplete(a, cur){

  console.log(cur);

    if(keymap.has(a[cur-1])){
      
      a.splice(cur,0,keymap.get(a[cur-1]));
      console.log(a);
      a = a.join("");
      seen_indices.set(cur-1,true)
      if(a[cur-1] === "'" || a[cur-1] === `"`){
        seen_indices.set(cur,true);
      }
      input.value = a;
      input.setSelectionRange(cur,cur);
    }

}

