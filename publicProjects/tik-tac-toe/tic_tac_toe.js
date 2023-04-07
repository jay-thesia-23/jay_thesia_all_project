let jayOne = document.getElementById("one");
let jayTwo = document.getElementById("two");
let jayThree = document.getElementById("three");
let jayFour = document.getElementById("four");
let jayFive = document.getElementById("five");
let jaySix = document.getElementById("six");
let jaySeven = document.getElementById("seven");
let jayEight = document.getElementById("eight");
let jayNine = document.getElementById("nine");

let jayFlag = 0;


var jayCells = document.querySelectorAll("td");

jayCells.forEach((jayCurrCell) => {
  jayCurrCell.addEventListener("click", function () {
    // console.log("You selected: "+ jayCurrCell.closest('tr').rowIndex +"     "+ "you selected this col: "+ jayCurrCell.cellIndex);

    if(jayFlag){
      this.innerHTML = "O"
      this.style.color = "green"
      turn2();
    }else{
      
      this.innerHTML = "X"
      this.style.color = "red"
      turn1();
    }

    jayFlag=!jayFlag
    winner();
    
    //cell 1
    // if (
    //   jayFlag == 0 &&
    //   jayCurrCell.closest("tr").rowIndex == 0 &&
    //   jayCurrCell.cellIndex == 0
    // ) {
    //   jayOne.innerHTML = "O";
    //   jayFlag = 1;
    //   jayOne.style.color = "green";
    //   turn2();
    //   winner();
    // } else if (
    //   jayFlag == 1 &&
    //   jayCurrCell.closest("tr").rowIndex == 0 &&
    //   jayCurrCell.cellIndex == 0
    // ) {
    //   jayOne.innerHTML = "X";
    //   jayFlag = 0;
    //   jayOne.style.color = "red";
    //   turn1();
    //   winner();
    // }

    // //cell 2

    // if (
    //   jayFlag == 0 &&
    //   jayCurrCell.closest("tr").rowIndex == 0 &&
    //   jayCurrCell.cellIndex == 1
    // ) {
    //   jayTwo.innerHTML = "O";
    //   jayFlag = 1;
    //   jayTwo.style.color = "green";
    //   turn2();
    //   winner();
    // } else if (
    //   jayFlag == 1 &&
    //   jayCurrCell.closest("tr").rowIndex == 0 &&
    //   jayCurrCell.cellIndex == 1
    // ) {
    //   jayTwo.innerHTML = "X";
    //   jayFlag = 0;
    //   jayTwo.style.color = "red";
    //   turn1();
    //   winner();
    // }

    // //cell 3
    // if (
    //   jayFlag == 0 &&
    //   jayCurrCell.closest("tr").rowIndex == 0 &&
    //   jayCurrCell.cellIndex == 2
    // ) {
    //   jayThree.innerHTML = "O";
    //   jayFlag = 1;
    //   jayThree.style.color = "green";
    //   turn2();
    //   winner();
    // } else if (
    //   jayFlag == 1 &&
    //   jayCurrCell.closest("tr").rowIndex == 0 &&
    //   jayCurrCell.cellIndex == 2
    // ) {
    //   jayThree.innerHTML = "X";
    //   jayFlag = 0;
    //   jayThree.style.color = "red";
    //   turn1();
    //   winner();
    // }

    // //cell 4
    // if (
    //   jayFlag == 0 &&
    //   jayCurrCell.closest("tr").rowIndex == 1 &&
    //   jayCurrCell.cellIndex == 0
    // ) {
    //   jayFour.innerHTML = "O";
    //   jayFlag = 1;
    //   jayFour.style.color = "green";
    //   turn2();
    //   winner();
    // } else if (
    //   jayFlag == 1 &&
    //   jayCurrCell.closest("tr").rowIndex == 1 &&
    //   jayCurrCell.cellIndex == 0
    // ) {
    //   jayFour.innerHTML = "X";
    //   jayFlag = 0;
    //   jayFour.style.color = "red";
    //   turn1();
    //   winner();
    // }

    // //cell 5
    // if (
    //   jayFlag == 0 &&
    //   jayCurrCell.closest("tr").rowIndex == 1 &&
    //   jayCurrCell.cellIndex == 1
    // ) {
    //   jayFive.innerHTML = "O";
    //   jayFlag = 1;
    //   jayFive.style.color = "green";
    //   turn2();
    //   winner();
    // } else if (
    //   jayFlag == 1 &&
    //   jayCurrCell.closest("tr").rowIndex == 1 &&
    //   jayCurrCell.cellIndex == 1
    // ) {
    //   jayFive.innerHTML = "X";
    //   jayFlag = 0;
    //   jayFive.style.color = "red";
    //   turn1();
    //   winner();
    // }

    // //cell 6

    // if (
    //   jayFlag == 0 &&
    //   jayCurrCell.closest("tr").rowIndex == 1 &&
    //   jayCurrCell.cellIndex == 2
    // ) {
    //   jaySix.innerHTML = "O";
    //   jayFlag = 1;
    //   jaySix.style.color = "green";
    //   turn2();
    //   winner();
    // } else if (
    //   jayFlag == 1 &&
    //   jayCurrCell.closest("tr").rowIndex == 1 &&
    //   jayCurrCell.cellIndex == 2
    // ) {
    //   jaySix.innerHTML = "X";
    //   jayFlag = 0;
    //   jaySix.style.color = "red";
    //   turn1();
    //   winner();
    // }

    // //cell 7
    // if (
    //   jayFlag == 0 &&
    //   jayCurrCell.closest("tr").rowIndex == 2 &&
    //   jayCurrCell.cellIndex == 0
    // ) {
    //   jaySeven.innerHTML = "O";
    //   jayFlag = 1;
    //   jaySeven.style.color = "green";
    //   turn2();
    //   winner();
    // } else if (
    //   jayFlag == 1 &&
    //   jayCurrCell.closest("tr").rowIndex == 2 &&
    //   jayCurrCell.cellIndex == 0
    // ) {
    //   jaySeven.innerHTML = "X";
    //   jayFlag = 0;
    //   jaySeven.style.color = "red";
    //   turn1();
    //   winner();
    // }

    // //cell 8
    // if (
    //   jayFlag == 0 &&
    //   jayCurrCell.closest("tr").rowIndex == 2 &&
    //   jayCurrCell.cellIndex == 1
    // ) {
    //   jayEight.innerHTML = "O";
    //   jayFlag = 1;
    //   jayEight.style.color = "green";
    //   turn2();
    //   winner();
    // } else if (
    //   jayFlag == 1 &&
    //   jayCurrCell.closest("tr").rowIndex == 2 &&
    //   jayCurrCell.cellIndex == 1
    // ) {
    //   jayEight.innerHTML = "X";
    //   jayFlag = 0;
    //   jayEight.style.color = "red";
    //   turn1();
    //   winner();
    // }

    // //cell9

    // if (
    //   jayFlag == 0 &&
    //   jayCurrCell.closest("tr").rowIndex == 2 &&
    //   jayCurrCell.cellIndex == 2
    // ) {
    //   jayNine.innerHTML = "O";
    //   jayFlag = 1;
    //   jayNine.style.color = "green";
    //   turn2();
    //   winner();
    // } else if (
    //   jayFlag == 1 &&
    //   jayCurrCell.closest("tr").rowIndex == 2 &&
    //   jayCurrCell.cellIndex == 2
    // ) {
    //   jayNine.innerHTML = "X";
    //   jayFlag = 0;
    //   jayNine.style.color = "red";
    //   turn1();
    //   winner();
    // }
  });
});

/*
123
456
789
147
258
369
159
357
*/

let winningCountO=0;
let winningCountX=0;
let winningCountD=0;

function winner() {
  if (
    (jayOne.innerText == "X" &&
      jayTwo.innerText == "X" &&
      jayThree.innerText == "X") ||
    (jayFour.innerText == "X" &&
      jayFive.innerText == "X" &&
      jaySix.innerText == "X") ||
    (jaySeven.innerText == "X" &&
      jayEight.innerText == "X" &&
      jayNine.innerText == "X") ||
    (jayOne.innerText == "X" &&
      jayFour.innerText == "X" &&
      jaySeven.innerText == "X") ||
    (jayTwo.innerText == "X" &&
      jayFive.innerText == "X" &&
      jayEight.innerText == "X") ||
    (jayThree.innerText == "X" &&
      jaySix.innerText == "X" &&
      jayNine.innerText == "X") ||
    (jayOne.innerText == "X" &&
      jayFive.innerText == "X" &&
      jayNine.innerText == "X") ||
    (jayThree.innerText == "X" &&
      jayFive.innerText == "X" &&
      jaySeven.innerText == "X")
  ) {
    alert("Player 2 won");
    location.reload();
    winningCountX++;


  } else if (
    (jayOne.innerText == "O" &&
      jayTwo.innerText == "O" &&
      jayThree.innerText == "O") ||
    (jayFour.innerText == "O" &&
      jayFive.innerText == "O" &&
      jaySix.innerText == "O") ||
    (jaySeven.innerText == "O" &&
      jayEight.innerText == "O" &&
      jayNine.innerText == "O") ||
    (jayOne.innerText == "O" &&
      jayFour.innerText == "O" &&
      jaySeven.innerText == "O") ||
    (jayTwo.innerText == "O" &&
      jayFive.innerText == "O" &&
      jayEight.innerText == "O") ||
    (jayThree.innerText == "O" &&
      jaySix.innerText == "O" &&
      jayNine.innerText == "O") ||
    (jayOne.innerText == "O" &&
      jayFive.innerText == "O" &&
      jayNine.innerText == "O") ||
    (jayThree.innerText == "O" &&
      jayFive.innerText == "O" &&
      jaySeven.innerText == "O")
  ) {
    alert(`Player 1("O") won`);
    location.reload();
    winningCountO++;

  } else if (
    (jayOne.innerText == "X" || jayOne.innerText == "O") &&
    (jayTwo.innerText == "X" || jayTwo.innerText == "O") &&
    (jayThree.innerText == "X" || jayThree.innerText == "O") &&
    (jayFour.innerText == "X" || jayFour.innerText == "O") &&
    (jayFive.innerText == "X" || jayFive.innerText == "O") &&
    (jaySix.innerText == "X" || jaySix.innerText == "O") &&
    (jaySeven.innerText == "X" || jaySeven.innerText == "O") &&
    (jayEight.innerText == "X" || jayEight.innerText == "O") &&
    (jayNine.innerText == "X" || jayNine.innerText == "O")
  ) {
    alert("Match Tie");
    location.reload();
    winningCountD++;
    document.getElementById("scoreD").innerHTML=winningCountD;
  }
}

function disable(element) {
  document.getElementById(element).classList.add("disabled");
}

let next = document.getElementById("nextClick");

function turn1() {
  next.innerText = `Please player one ("O") take your turn`;
  
}

function turn2() {
  next.innerText = `Please player two ("X") take your turn`;

}
