document.addEventListener('DOMContentLoaded',() => {

const cardArray =[
  {
    name:'fries',
    img:'images/fries.png'
  },
  {
    name:'fries',
    img:'images/fries.png'
  }, {
    name:'hotdog',
    img:'images/hotdog.png'
  }, {
    name:'hotdog',
    img:'images/hotdog.png'
  }, 
  {
    name:'icecream',
    img:'images/ice-cream.png'
  },
  {
    name:'icecream',
    img:'images/ice-cream.png'
  },
  {
    name:'milkshake',
    img:'images/milkshake.png'
  },{
    name:'milkshake',
    img:'images/milkshake.png'
  },
  {
    name:'pizza',
    img:'images/pizza.png'
  },{
    name:'pizza',
    img:'images/pizza.png'
  },
  {
    name:'hotdog',
    img:'images/hotdog.png'
  },{
    name:'hotdog',
    img:'images/hotdog.png'
  },
]
cardArray.sort(() => 0.5 - Math.random());
const resultDisplay =document.querySelector('#result');
const grid =document.querySelector('.grid');
const countdownDisplay = document.querySelector('#countdown');

var cardChosen=[];
var cardChosenId=[];
var cardsWon=[];
var countdown = 60; // Countdown duration in seconds
var countdownTimer; // Reference to the countdown timer
//create your board
function createBoard(){
  for (let i=0;i<cardArray.length;i++){
    const card =document.createElement('img');
    card.setAttribute('src','images/blank.png');
    card.setAttribute('data-id',i);
   card.addEventListener('click',flipCard);
    grid.appendChild(card)
  }
}
function startCountdown(){
  countdownTimer =setInterval(updateCountdown ,1000);
}
function updateCountdown(){
 if (countdown >= 0){
  countdownDisplay.textContent =formatTime(countdown);
  countdown--;
 }else{
  clearInterval(countdownTimer);
  endGame();
 }
}
function formatTime(seconds){
  const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

function padZero(number) {
  return number < 10 ? `0${number}` : number;
}
function endGame() {
  grid.removeEventListener('click', flipCard);
  resultDisplay.textContent = ` You found ${cardsWon.length} matches.`;
}

function checkForMatch(){
  var cards =document.querySelectorAll('img');
  const optionOneId =cardChosenId[0];
  const optionTwoId =cardChosenId[1];
if(optionOneId===optionTwoId){
  cards[optionOneId].setAttribute('src','images/blank.png');
  cards[optionTwoId].setAttribute('src','images/blank.png');
alert('You have clicked the same image!');
}
 else if (cardArray[optionOneId].name === cardArray[optionTwoId].name){
    alert('you find a match');
    cards[optionOneId].setAttribute('src','images/white.png');
    cards[optionTwoId].setAttribute('src','images/white.png');
    cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
    cardsWon.push(cardArray[optionOneId].name);
  }else{
    cards[optionOneId].setAttribute('src','images/blank.png');

    cards[optionTwoId].setAttribute('src','images/blank.png');
    alert('try again buddy!')
  }
  cardChosen= [];
  cardChosenId  =[];
  resultDisplay.textContent =cardsWon.length;
  if (cardsWon.length==cardArray.length/2){
    resultDisplay.textContent ='congrats you have won';
    clearInterval(countdownTimer);
    endGame();
  }
}
//flip your card
function flipCard(){
let cardId =this.getAttribute('data-id');
cardChosen.push(cardArray[cardId].name);
cardChosenId.push(cardId);
this.setAttribute('src',cardArray[cardId].img);
if (cardChosen.length===2){
  setTimeout(checkForMatch,500);
}
}
createBoard();
startCountdown();
})
