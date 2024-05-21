const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const commands = [
    "next",
    "back",
    "exit",
    "three"
];
const grammar = `#JSGF V1.0; grammar commands; public <command> = ${commands.join(
    " | ",
)};`;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();


speechRecognitionList.addFromString(grammar, 0);

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 0;


const testText = document.getElementById("testing");
const text = document.getElementById("TT");
recognition.onresult = (event) => {
    const lastResultIndex = event.results.length - 1;
    let userCommand = event.results[lastResultIndex][0].transcript;
    
    console.log(typeof userCommand);
    userCommand = userCommand.split("");
    console.log(typeof userCommand);
    console.log(userCommand);
    
    if (userCommand[0] == " ") {
        userCommand.splice(0, 1);
    }
    userCommand = userCommand.join("");
    
    console.log(userCommand);
    testText.textContent = `Result received: ${userCommand}`;
    console.log(`Confidence: ${event.results[lastResultIndex][0].confidence}`);
    console.log(`Recognized: ${userCommand}`);
    
    if (userCommand == "Back." || userCommand == "Next.") {
        instruct(userCommand);
    }
    if (userCommand == "exit") {
        exitProgram();
    }
};

recognition.onspeechend = () => {
    recognition.stop();
  };
  
  recognition.onend = () => {
    setTimeout(() => recognition.start(), 500);
  };
  
recognition.onerror = (event) => {
    console.error('Speech recognition error detected: ' + event.error);
    testText.textContent = 'Error occurred in recognition: ' + event.error;
    recognition.start(); 
};

const theCount = document.getElementById("theCount");
let AP = 0;
let StepCounter = 0;
function instruct(x) {
    console.log("hit");
    let OAP = AP;
    if (x == "Next." && StepCounter != chosenOne.length){
        AP++;
        text.textContent = chosenOne[AP];
    } else if (x == "Back."  && AP > 0){
        AP--;
        text.textContent = chosenOne[AP];
    }
    if (OAP != AP){
        StepCounter = AP;
        theCount.textContent = `${StepCounter}/${chosenOne.length}`
    }

    if (StepCounter == chosenOne.length){
        text.textContent = "finished round.";
        testText.textContent = "";

    }
}

class newStitch {
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }
}

class data {
    constructor(id, content, reps, name) {
        this.id = id;
        this.content = content;
        this.reps = reps;
        this.name = name;
    }
}
let selectedButton;
let selectedButtonID;

customChains = [];
const content = document.getElementById("content");
let idCounter = 0
let buttons = []
function add(event){
    let newButton = document.createElement('button');
    let buttonObj = new data(idCounter, event.target.name, 1, event.target.name);
    if (event.target.class = "arr"){
        //add thing where it looks through customchains and the name to find the content, and then put the content from it into a new object
        for (let i = 0; i < customChains.length; i++){
            if (customChains[i].name == event.target.name) {
                buttonObj.content = customChains[i].content;
                
            }
        }
    } 
        
    buttons.push(buttonObj);
    
    newButton.id = idCounter;
    idCounter++;
    console.log(event.target.name);
    newButton.textContent = event.target.name;
    newButton.addEventListener('click', function(){
        console.log(newButton);
        colourchange(newButton.id);
        selectedButton = newButton.id;
        
    })
    content.appendChild(newButton);
}
const selbut = document.getElementById("selected");

function colourchange(x){
    let newButton = document.getElementById(x);
    if (selectedButton){
        let oldButton = document.getElementById(selectedButton);
        oldButton.style.backgroundColor = '';
    }
    newButton.style.backgroundColor = '#218838';
    console.log(buttons[x]);
    selbut.textContent = `Selected Button Reps: ${buttons[x].reps}`
}
const numIn = document.getElementById("numberinput");
function confirm(){
    let value = numIn.value;
    buttons[selectedButton].reps = value;
    selbut.textContent = `Selected Button Reps: ${buttons[selectedButton].reps}`;
    numIn.value = "";
}

const buttonsDiv = document.getElementById("buttons");
function custom(){
    let nameStitch = prompt("Please enter the name of your stitch");
    let newButton = document.createElement('button');
    newButton.name = nameStitch;
    newButton.textContent = nameStitch;
    newButton.addEventListener('click', function(){
        add(event);
    })
    buttonsDiv.appendChild(newButton);
}

function addNew(){
    let nameStitch = prompt("Please enter the name of your stitch");
    let newButton = document.createElement('button');
    newButton.name = nameStitch;
    newButton.textContent = nameStitch;
    newButton.class = "arr";
    newButton.addEventListener('click', function(){
        add(event);
    })
    buttonsDiv.appendChild(newButton);
    let theContent = getter();
    let customChain = new newStitch(nameStitch, theContent);
    customChains.push(customChain);
}

function getter(){
    let con = [];
    for (let i = 0; i < buttons.length; i++){
        let num = buttons[i].reps;
        for (let j = 0; j < num; j++){
            con.push(buttons[i].content);
        }
    }
    console.log(buttons);
    console.log(con);
    con = con.flat(Infinity);
    console.log(con);
    buttons = [];
    content.innerHTML = "";
    selectedButton = 0;
    idCounter = 0;
    console.log(con);
    return con;
}
chosenOne = [];
function finish(){
    let finalArray = [];
    for (let i = 0; i < buttons.length; i++){
        for (let j = 0; j < buttons[i].reps; j++){
            finalArray.push(buttons[i].content);
        }
    }
    console.log(finalArray);
    finalArray = finalArray.flat(Infinity);
    chosenOne = finalArray;
    startup();
}
const stuff = document.getElementById("stuff");
const builder = document.getElementById("builder");
stuff.style.display = "none";

function startup(){
    builder.style.display = "none";
    stuff.style.display = "block";
    recognition.start();
    text.textContent = chosenOne[AP];
    theCount.textContent = `${StepCounter}/${chosenOne.length}`
    testText.textContent = "say next to go to the next step, say back to go back"
}