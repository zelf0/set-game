var setCount = 0;
var clicked = 0;
var cardsClicked = [];
var cardsArray = [];
var container = document.getElementById("container");
var timeAllotted = 150000;

function Card(shape, color, style, number) {
    this.shape = shape;
    this.color = color;
    this.style = style;
    this.number = number;
}
//create cards

function createCards() {
//create card object with each shape, color, style, and number combination, and make the backround image the corresponding image 
    // let objectCount = 0;
    for (let shape = 0; shape < 3; shape++) {
        for (let color = 0; color < 3; color++) {
            for (let style= 0; style < 3; style++) {
                for (let number = 0; number < 3; number++) {
                    let newCard = new Card(shape, color, style, number);
                    cardsArray.push(newCard);
                    //create dom element connected to card
                    let newElem = document.createElement("div");
                    newElem.classList.add("card");
                    newElem.setAttribute("object-id", cardsArray.length - 1);
                    // obectCount++;
                    document.getElementById("container").appendChild(newElem);
                    //draw shapes
                    for (let i = 0; i < number + 1; i++) {
                        let newShape = document.createElement("div");
                        newShape.classList.add("shape-" + shape);
                        newShape.classList.add("style-" + style);
                        newShape.classList.add("color-" + color);
                        newShape.addEventListener('click', clickShape);
                        newElem.appendChild(newShape);
                    }
                }
            }
        }
    }
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener('click', click)
      })
    console.log(document.querySelectorAll(".card"));
}

function clickShape(e) {
    console.log(e.target.classList + " is child of " + e.target.parentElement.classList);
    e.target.parentElement.click();

}

function click(e) {
    if (e.target.classList.contains("card")) {
        if (cardsClicked.indexOf(e.target) < 0)
        {
            console.log('click' + e.target);
            e.target.classList.add("clicked");
            cardsClicked.push(e.target);
            if (cardsClicked.length === 3) {
                check(cardsClicked);
            }
        }
        else {
            e.target.classList.remove("clicked");
            cardsClicked.splice(cardsClicked.indexOf(e.target), 1);
        }
    }
}



function check(cards) {
    //check same OR different shape, color, style, number
    
    if (checkProp(cards, "shape") && checkProp(cards, "color") && checkProp(cards, "style") && checkProp(cards, "number")) {
        for (let i = 0; i < cards.length; i++)
        {   
            cards[i].classList.remove("clicked");
            cards[i].classList.add("correct");
            setTimeout(function() { 
                cards[i].style.display = "none";
            }, 700)
        }
        //take cards off
        //get new cards
        setCount++;
        document.getElementById("sets").innerHTML = "Sets: " + setCount;
    }
    else {
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove("clicked");
            cards[i].classList.add("incorrect");
            setTimeout(function() { 
                cards[i].classList.remove("incorrect");
            }, 700)
        }
    }
    cardsClicked = [];
}

function checkProp(cards, prop) {
    if (cardsArray[cards[0].getAttribute("object-id")][prop] == cardsArray[cards[1].getAttribute("object-id")][prop] 
        && cardsArray[cards[1].getAttribute("object-id")][prop] == cardsArray[cards[2].getAttribute("object-id")][prop]) {
        console.log("same " + prop);
        return true;
    } 
    if (cardsArray[cards[0].getAttribute("object-id")][prop] != cardsArray[cards[1].getAttribute("object-id")][prop] 
        && cardsArray[cards[1].getAttribute("object-id")][prop] != cardsArray[cards[2].getAttribute("object-id")][prop] 
        && cardsArray[cards[2].getAttribute("object-id")][prop] != cardsArray[cards[0].getAttribute("object-id")][prop]) {
        console.log("different " + prop);
        return true;
    }
    return false;
}

function shuffle() {
    var ul = document.getElementById("container");
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }
    if (timeAllotted < 149900) {
        timeAllotted -= 10000;
        document.getElementById("timer").style.color = "red";
        setTimeout(function() { 
            document.getElementById("timer").style.color = "black";
        }, 1000)
    }

}

function gameOver() {
    var popup = document.getElementById("popup");
    popup.style.display = "flex";
    document.getElementById("message").innerHTML = "You found " + setCount + " sets!"
}

function reload() {

    document.location.reload();
}

var countdown = setInterval(function() {
    timeAllotted -= 1000;
    var minutes = Math.floor(timeAllotted / (1000 * 60));
    var seconds = Math.floor((timeAllotted % (1000 * 60)) / 1000);
    seconds = seconds.toLocaleString('en-US', {//this is the function that formats the numbers
        minimumIntegerDigits: 2, //change this to your minimum length
        useGrouping: false
      })
    document.getElementById("timer").innerHTML = minutes + ":" + seconds;
  

    if (timeAllotted <= 0) {
      clearInterval(countdown);
      document.getElementById("timer").style.color = "red";
      gameOver();
    }
}, 1000);

function init() {
    createCards();
    shuffle();
    document.getElementById("shuffle").addEventListener("click", shuffle);
    document.getElementById("replay").addEventListener("click", reload);

}




window.addEventListener("load", init, false);