const cards = document.querySelectorAll('.memory-card');
const noOfMoves=document.getElementById('moves');
const lost=document.getElementById('loose');
const resetBtn=document.getElementById('reset');
const winMsg=document.getElementById('win');
const resetBtn2=document.getElementById('re-set');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves=0;
let score=0;

function flipCard() {
    if (lockBoard || this === firstCard) return;
    
    this.classList.add('flip');
  
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
    } else {
        moves++;
        noOfMoves.textContent = `Moves : ${moves}`;
      secondCard = this;
      checkForMatch();
      if(moves>20){
        lost.style.display="block";
      }
    }
  }
 
  

function checkForMatch() {
  let firstCardImage = firstCard.querySelector('.back-side').getAttribute('src');
  let secondCardImage = secondCard.querySelector('.back-side').getAttribute('src');

  if (firstCardImage === secondCardImage) {
    score++;
    disableCards();
    if(score==8){
        winMsg.style.display="block";
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
 hasFlippedCard = false;
 lockBoard = false;
 firstCard=null;
 secondCard=null;
}
function closeAllCards(){
  cards.forEach(card=>{
    card.classList.remove('flip');
  });
}
function shuffle() {
  cards.forEach(card => {
    let random = Math.floor(Math.random() * 16);
    card.style.order = random;
  });
};
function resetGame() {
  closeAllCards(); 
  cards.forEach(card => card.addEventListener('click', flipCard)); 
  shuffle(); 
  moves = 0;
  score = 0;
  noOfMoves.textContent = `Moves: ${moves}`;
  lost.style.display = "none";
  winMsg.style.display = "none";
  resetBoard();
}

cards.forEach(card => card.addEventListener('click', flipCard));
resetBtn2.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);