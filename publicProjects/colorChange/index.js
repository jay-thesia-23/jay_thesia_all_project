let jayRows = 3;
let jayCols = 3;
let jayOpacity = 1;

let table = document.getElementById("tbl");


//making dynamic table
function increase() {
  table.innerHTML = "";
  let tbl = document.createElement("table");

  for (let i = 0; i < jayRows; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < jayCols; j++) {
      let cell = document.createElement("td");

      cell.setAttribute("border-collapse", "collapse");
      cell.id = "cell_" + (i * jayRows + j);

      row.appendChild(cell);
    }

    tbl.appendChild(row);
  }

  table.appendChild(tbl);
  tbl.style.backgroundColor = generateRandomColor();

  ranCell(jayRows * jayCols);

  tbl.setAttribute("height", "200px");
  tbl.setAttribute("width", "200px");
}




var seconds = 10;
var timer;

//countdown clock for game
function countdown() {
  var seconds = 10;
  function tick() {
    var counter = document.getElementById("counter");
    seconds--;
    counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    if (seconds > 0) {
      setTimeout(tick, 1000);
    } else {
      location.reload()
      alert(`Game over your score is ${jayRows}`);
      
    }
  }
  tick();
}
countdown();

document.getElementById("timer").innerHTML = "1:00";


//generate the random color and convert it to the hexa decimal
function generateRandomColor() {
  var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  // -> #e1ac94
  return randomColor;
}


//generate the random cell
function ranCell(size) {
  var cellId = "cell_" + Math.floor(Math.random() * (size - 1));
  var cell = document.getElementById(cellId);

  console.log(cellId + "ceLlllllllll");
  cell.style.backgroundColor = `rgba(33,33,33,${jayOpacity})`;
  jayOpacity = jayOpacity - 0.1;

  if (jayOpacity <= 0.1) {
    jayOpacity = 0.1;
  }

  cell.onclick = function () {
    jayCols++;
    jayRows++;
    increase();
  };
}



