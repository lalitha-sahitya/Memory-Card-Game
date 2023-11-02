const cards = document.querySelectorAll('.memory-card');

let matched = 0;
let firstCard, secondCard;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
    if (!firstCard || !secondCard) {
        if (!firstCard) {
            firstCard = clickedCard;
            firstCard.classList.add("flip");
        } else {
            secondCard = clickedCard;
            secondCard.classList.add("flip");
            disableDeck = true;
            
            let cardOneImg = firstCard.querySelector(".back-side[data-img]");
            let cardTwoImg = secondCard.querySelector(".back-side[data-img]");
            
            matchCards(cardOneImg, cardTwoImg);
        }
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched === 8) {
            setTimeout(() => {
                shuffleCard();
            }, 1000);
        }
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        firstCard = secondCard = "";
        disableDeck = false;
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            firstCard = secondCard = "";
            disableDeck = false;
        }, 1000);
    }
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    firstCard = secondCard = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-side");
        imgTag.src = `img${arr[i]}.jpg`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card => card.addEventListener('click', flipCard));
