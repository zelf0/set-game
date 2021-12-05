var setCount = 0;
var clicked = 0;
var cardsClicked = [];
var cardsArray = [];
var container = document.getElementById("container");


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
                        newElem.appendChild(newShape);
                    }
                }
            }
        }
    }
    document.querySelectorAll(".card").forEach(item => {
        item.addEventListener('click', click, false)
      })
}

function click(e) {
    if (cardsClicked.indexOf(e.target.id) < 0)
    {
        console.log('click');
        e.target.classList.add("clicked");
        cardsClicked.push(e.target);
        if (cardsClicked.length === 3) {
            check(cardsClicked);
        }
    }
    else {
        unclick(e.target);
    }
}

function unclick(card) {
    card.classList.remove("clicked");
    cardsClicked.splice(cardsClicked.indexOf(card.id), 1)
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
        document.getElementById("sets").innerHTML = "sets: " + setCount;
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

function init() {
    createCards();
    var ul = document.getElementById("container");
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }

}




window.addEventListener("load", init, false);