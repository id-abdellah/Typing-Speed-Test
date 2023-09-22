/* element References */
const gameStarter = document.querySelector(".game-starter button");
const wordInput = document.querySelector(".word-input input");
const upcomingsWord = document.querySelector(".upcoming-words");
const timeLefting = document.querySelector(".time-left");
const score = document.querySelector(".score");
const scoreFrom = document.querySelector(".from");
const currentWordToType = document.querySelector(".current-word-to-type");


const infoLevel = document.querySelector(".level");
const infoLevelDuration = document.querySelector(".level-duration");



const loseModel = document.querySelector(".lose-model");
const loseModelRestartBtn = document.querySelector(".lose-model button");

const winModel = document.querySelector(".win-model");
const winModelbutton = document.querySelector(".win-model button");

const lvlRadios = document.querySelectorAll(".lvls input");
/* ---------------------- */

// all words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];
// levels
const levels = {
    "easy": 4,
    "medium": 3,
    "hard": 2
};

let choosedLevel = null;

lvlRadios.forEach(radio => {
    radio.oninput = () => {
        choosedLevel = levels[radio.value];
        timeLefting.innerHTML = choosedLevel || levels.easy;

        infoLevel.innerHTML = `[${radio.value}]`;
        infoLevelDuration.innerHTML = `[${choosedLevel}]`;
    }
})


scoreFrom.innerHTML = words.length;

gameStarter.addEventListener("click", () => {
    disabledRadio()
    showAllWord(words);
    showCurrentWordToType();

    let initialTypingWord = Math.floor(Math.random() * upcomingsWord.childElementCount);
    currentWordToType.innerHTML = upcomingsWord.children[initialTypingWord].textContent;
    document.querySelector(`[data-content="${upcomingsWord.children[initialTypingWord].textContent}"]`).remove()

    let sInterval = setInterval(() => {
        timeLefting.innerHTML -= 1;
        if (timeLefting.innerHTML == 0) {
            if (wordInput.value.toLowerCase() == currentWordToType.textContent.toLowerCase()) {

                score.innerHTML++;

                if (score.innerHTML == scoreFrom.innerHTML) {
                    whenWinning();
                    clearInterval(sInterval);
                    return
                }

                chooseRandomWordToDisplay();

                timeLefting.innerHTML = choosedLevel;


            } else {
                clearInterval(sInterval)
                whenLose()
            }
        }
    }, 1000)
});




function showAllWord(array) {
    upcomingsWord.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        upcomingsWord.innerHTML += `<span data-content="${array[i]}">${array[i]}</span>`;
    }
}

function showCurrentWordToType() {
    // hide game starter button
    gameStarter.style.display = "none";
    // show current word to type
    currentWordToType.style.display = "block";
    // input get focuse
    wordInput.focus()
}

function chooseRandomWordToDisplay() {
    let randomWord = Math.floor(Math.random() * upcomingsWord.childElementCount);
    wordInput.value = "";
    currentWordToType.innerHTML = upcomingsWord.children[randomWord].textContent;
    document.querySelector(`[data-content="${upcomingsWord.children[randomWord].textContent}"]`).remove();
}

function whenLose() {
    loseModel.style.scale = "1";
    loseModelRestartBtn.addEventListener("click", () => {
        window.location.reload()
    })
}

function whenWinning() {
    winModel.style.scale = "1";
    winModelbutton.addEventListener("click", () => {
        window.location.reload()
    })
}

function disabledRadio() {
    lvlRadios.forEach(radio => {
        radio.setAttribute("disabled", "true")
    })
}