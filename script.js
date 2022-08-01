// The currently selected collection of questions is loaded in the variable questions, initially the HTML questions.
let questions = questionsCSS;
let selectedQuiz = 1;
let currentQuestion = 0;
let correctnessOfAnswers = [];
let rightQuestions = 0;
let clicked = false;
let currentPlayingAudio;


// Sounds that are played after selecting the answer.
let success = new Audio('audio/success.mp3');
let fail = new Audio('audio/fail.mp3');
let bgMusic = new Audio('audio/backgroundMusicLoop.mp3');


/* The initial function: onload-event of the body element. 
This set the selected quiz to the HTML Quiz, 
shows its start screen, 
resets all game variables
and answer buttons by the means of the the function changeQuiz. 
This also loops and starts background music. */
function init() {
    questions = questionsCSS;
    changeQuiz(questionsHTML, 'HTML', 1);
}


/* This changes the quiz to the selected one (if it is a different than the current one), 
the style of the current selected quiz, 
the innerHTML content of the elements, which contain the name of the selected quiz.
This resets the game starting variables by means of function resetGame(). */
function changeQuiz(quiz, language, number) {
    if (questions != quiz) {
        bgMusic.pause();
        bgMusic.currentTime = 0;

        stopAudio();

        questions = quiz;

        changeNavLinksStates(number);

        setSelectedLanguage(language);

        resetGame();
    }
}


// This changes the state of the selected nav-link of the navbar to active.
function changeNavLinksStates(number) {
    document.getElementById(`nav-link${selectedQuiz}`).classList.remove('active');
    document.getElementById(`nav-link${selectedQuiz}`).removeAttribute('aria-current');

    selectedQuiz = number;
    document.getElementById(`nav-link${selectedQuiz}`).classList.add('active');
    document.getElementById(`nav-link${selectedQuiz}`).setAttribute('aria-current', 'page');
}


// This changes the innerHTML content of the elements, which contain the name of the selected quiz.
function setSelectedLanguage(language) {
    document.getElementById('selectedQuizTitle').innerHTML = language;
    document.getElementById('selectedQuizBtn').innerHTML = language;
    document.getElementById('completedSelectedQuiz').innerHTML = language;
}


// This stops the current playing audio and play (by means of load() funktion) the selected one.
function playAudio(audio) {
    stopAudio();
    audio.addEventListener("canplay", function onCanPlay() {
        audio.removeEventListener("canplay", onCanPlay);
        audio.play();
    });
    audio.load();
}


// This sets the current playing audio on puase state and currentTime on zero.
function stopAudio() {
    if (currentPlayingAudio !== undefined) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
    }
};


// Custom property for HTMLMediaElements which 
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function () {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})


/* This resets progress bar, 
the variables currentQuestion, rightQuestions, clicked, the array correctnessOfAnswers
 and all style of the answer buttons before the new game.
This shows the start screen. */
function resetGame() {
    setProgressBarToZero()

    showStartScreen();

    currentQuestion = 0;
    correctnessOfAnswers = [];
    rightQuestions = 0;
    clicked = false;
    resetAnswerButtons()
}


// This resets the progress bar to the 0%.
function setProgressBarToZero() {
    document.getElementById('progressBar').innerHTML = '0%';
    document.getElementById('progressBar').style.width = '0%';
}


// This makes questions content, end screen invisible and the start screen visible.
function showStartScreen() {
    document.getElementById('startScreen').classList.remove('d-none')
    document.getElementById('questions').classList.add('d-none');
    document.getElementById('endScreen').classList.add('d-none');
}


// This styles all answers back to the default ('unselected') state.
function resetAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        resetStyleOfRightAnswer(i);
        resetStyleOfWrongAnswers(i);
        makeSelectable();
    }
    makePreviousBtnVisible();
}


//This resets the style of the right answer.
function resetStyleOfRightAnswer(i) {
    document.getElementById(`answerBadge${i}`).classList.replace('badgeSuccess', 'badgeLight');
    document.getElementById(`answerContainer${i}`).classList.replace('alert-success', 'alert-light');
    document.getElementById(`rightAnswerSymbol${i}`).classList.add('d-none');
}


//This resets the style of the wrong answers.
function resetStyleOfWrongAnswers(i) {
    document.getElementById(`answerBadge${i}`).classList.replace('badgeDanger', 'badgeLight');
    document.getElementById(`answerContainer${i}`).classList.replace('alert-danger', 'alert-light');
    document.getElementById(`wrongAnswerSymbol${i}`).classList.add('d-none');
}


// This makes the previous button visible, if the variable currentQuestion is bigger than zero.
function makePreviousBtnVisible() {
    if (currentQuestion == 0) {
        document.getElementById('previous-btn').classList.add('invisible');
    } else {
        document.getElementById('previous-btn').classList.remove('invisible');
    }
}


// This shows the amount of questions for the selected quiz.
// This makes start screen, end screen invisible and the questions content visible.
// It shows a question by means of the function shoqQuestion().
function showQuestionsContent() {
    document.getElementById('allQuestions').innerHTML = questions.length;
    document.getElementById('startScreen').classList.add('d-none')
    document.getElementById('questions').classList.remove('d-none');
    document.getElementById('endScreen').classList.add('d-none');
    showQuestion();
    bgMusic.play();
}


/* It shows a question, 
updates the progress bar and the nummber of the current question 
as long as the value of the current question is the same or bigger the questions array length (the number of all questions.) 
Otherise it shows the end screen with the quiz result. */
function showQuestion() {
    if (currentQuestion >= questions.length) {
        showEndScreen();
        // Set the progress bar to 100%, becuase the updateProgressBar funkction will not be executed any more  an the end.
        document.getElementById('progressBar').innerHTML = '100%';
        document.getElementById('progressBar').style.width = `100%`;
    } else {
        updateQuestion();
        updateProgressBar();
    }
}


// This makes questions content invisible and the end screen visible withe the result of the quiz game.
function showEndScreen() {
    countRightQuestionss();
    document.getElementById('startScreen').classList.add('d-none')
    document.getElementById('questions').classList.add('d-none');
    document.getElementById('endScreen').classList.remove('d-none');

    document.getElementById('rightQuestions').innerHTML = rightQuestions;
    document.getElementById('ofAllQuestions').innerHTML = questions.length;
}


// This counts the amount of right answered questions.
function countRightQuestionss() {
    correctnessOfAnswers.forEach(answerCorrectness => {
        if (answerCorrectness == true) {
            rightQuestions++;
        }
    });
}


// This loads a new question in the variable questions and the associated question text and answers. 
// The number of finished questionsis will be also increased.
function updateQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer1').innerHTML = question['answer1'];
    document.getElementById('answer2').innerHTML = question['answer2'];
    document.getElementById('answer3').innerHTML = question['answer3'];
    document.getElementById('answer4').innerHTML = question['answer4'];

    document.getElementById('completedQuestions').innerHTML = currentQuestion + 1;
}


/* This calculates the %-part of the all questions that have been completed
 and accordingly changes the %-number in the progress bar and its width. */
function updateProgressBar() {
    let percent = (currentQuestion) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progressBar').innerHTML = percent + '%';
    document.getElementById('progressBar').style.width = `${percent}%`;
}


/* This checks if selected answer is correct and accordingly signals the test result, 
if no answer war already clicked. */
function answer(selection) {
    if (!clicked) {
        stopAudio();
        // Setting of current question and its right answer
        let rightAnswer = questions[currentQuestion]['rightAnswer'];

        /* This styles the selected asnwer red or green, 
        plays success or fail sound according to the correctness of the answer, 
        save the correctness of the answered questions in the array correctnessOfAnswers to the check:
        if the selected answer is the right one. */
        if (selection == rightAnswer) {
            stylePlaySaveRightAnswer(selection);
            makeUnselectable();
        } else {
            stylePlaySaveWrongAnswer(selection, rightAnswer);
            makeUnselectable();
        }
        // This sets the state clicked on true.
        clicked = true;

        // This enables the next ans previus question button.
        enableBtn();
        console.log(correctnessOfAnswers);
    }
}


// This styles the selected answer to the right one.
function stylePlaySaveRightAnswer(selection) {
    document.getElementById(`answerBadge${selection}`).classList.replace('badgeLight', 'badgeSuccess');
    document.getElementById(`answerContainer${selection}`).classList.replace('alert-light', 'alert-success');
    document.getElementById(`rightAnswerSymbol${selection}`).classList.remove('d-none');

    playAudio(success);

    saveAnswer(currentQuestion, true);
}


// This styles the selected answer to the wrong one.
function stylePlaySaveWrongAnswer(selection, rightAnswer) {
    document.getElementById(`answerBadge${selection}`).classList.replace('badgeLight', 'badgeDanger');
    document.getElementById(`answerContainer${selection}`).classList.replace('alert-light', 'alert-danger');
    document.getElementById(`wrongAnswerSymbol${selection}`).classList.remove('d-none');

    document.getElementById(`answerBadge${rightAnswer}`).classList.replace('badgeLight', 'badgeSuccess');
    document.getElementById(`answerContainer${rightAnswer}`).classList.replace('alert-light', 'alert-success');
    document.getElementById(`rightAnswerSymbol${rightAnswer}`).classList.remove('d-none');

    playAudio(fail);

    saveAnswer(currentQuestion, false);
}


// This makes the rest of question unselectable.
function makeUnselectable() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answerContainer${i}`).classList.remove('answerBtnHover', 'cp');
    }
}


// This makes all question unselectable.
function makeSelectable() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answerContainer${i}`).classList.add('answerBtnHover', 'cp');
    }
}


function enableBtn() {
    document.getElementById('next-btn').disabled = false;
    document.getElementById('previous-btn').disabled = false;
}


// This saves the correctness of the answer for each answered question: if it was right or wrong.
function saveAnswer(currentQuestion, value) {
    if (value == true) {
        correctnessOfAnswers[currentQuestion] = true;
    } else {
        correctnessOfAnswers[currentQuestion] = false;
    }
}


// This increases the var currentQuestion and loaded the next question.
function nextQuestion() {
    currentQuestion++;
    loadQuestion()
}


// This reduces the var currentQuestion and loaded the previous question.
function previousQuestion() {
    currentQuestion--;
    loadQuestion()
}


/* This stop the currently playying audio,
reset the state clicked,
disables the next and previous question button, 
reset the styles of the answers, +
shows the question. */
function loadQuestion() {
    stopAudio();
    clicked = false;
    document.getElementById('next-btn').disabled = true;
    document.getElementById('previous-btn').disabled = true;
    resetAnswerButtons();
    showQuestion();
}