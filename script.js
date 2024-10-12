let palyerText = document.getElementById("playerText");
let resetBtn = document.getElementById("resetBtn");
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndecator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const O = "O";
const X = "X";

let currentPlayer = X;
let spaces = Array(9).fill(null);
let countPlayes = 0;

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id] && countPlayes < 9) {
    spaces[id] = currentPlayer;
    e.target.innerHTML = currentPlayer;

    if (playerWon() !== false) {
      palyerText.innerHTML = `${currentPlayer} has won!`;
      let winningBlcoks = playerWon();
      countPlayes = 10;
      winningBlcoks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndecator)
      );
    }
    countPlayes++;
    currentPlayer = currentPlayer === X ? O : X;
  }

  if (countPlayes === 9) {
    palyerText.innerHTML = "Draw Game!";
    boxes.forEach((box) => (box.style.backgroundColor = winnerIndecator));
  }
}

const winnerConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerWon() {
  for (const condition of winnerConditions) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

resetBtn.addEventListener("click", () => {
  spaces.fill(null);
  palyerText.innerHTML = "Tic-Tac-Toe";
  countPlayes = 0;
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.style.backgroundColor = "";
  });

  currentPlayer = X;
});

startGame();
