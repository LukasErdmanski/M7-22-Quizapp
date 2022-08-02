/**
 * The currently selected collection of questions is loaded in the variable questions, initially the HTML questions.
 */
let questions = questionsCSS;
let selectedQuiz = 1;
let currentQuestion = 0;
let correctnessOfAnswers = [];
let rightQuestions = 0;
let currentPlayingAudio;

/**
 * Sounds that are played after selecting the answer.
 */
let success = new Audio('audio/success.mp3');
let fail = new Audio('audio/fail.mp3');
let bgMusic = new Audio('audio/backgroundMusicLoop.mp3');


/**
 * The initial function: onload-event of the body element. 
 * Set the selected quiz to the HTML Quiz, 
 * show its start screen, 
 * reset all game variables
 * and answer buttons by the means of the the function changeQuiz. 
 * Loop and start background music.
 */
function init() {
    document.documentElement.classList.remove('d-none');
    questions = questionsCSS;
    changeQuiz(questionsHTML, 'HTML', 1);
}


/**
 * Change the quiz to the selected one (if it is a different than the current one), 
 * the style of the current selected quiz, 
 * the innerHTML content of the elements, which contain the name of the selected quiz.
 * Reset the game starting variables by means of function resetGame().
 * @param {JSON} quiz - This is the selected quiz question pool.
 * @param {string} language - This is the selected quiz language (quiz type).
 * @param {number} number - This is the number of the nav-link in the navbar.
 */
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


/**
 * Change the state of the selected nav-link of the navbar to active.
 * @param {number} number - This is the number of the nav-link in the navbar.
 */
function changeNavLinksStates(number) {
    document.getElementById(`nav-link${selectedQuiz}`).classList.remove('active');
    document.getElementById(`nav-link${selectedQuiz}`).removeAttribute('aria-current');
    selectedQuiz = number;
    document.getElementById(`nav-link${selectedQuiz}`).classList.add('active');
    document.getElementById(`nav-link${selectedQuiz}`).setAttribute('aria-current', 'page');
}


/**
 * Chnage the innerHTML content of the elements, which contain the name of the selected quiz.
 * @param {string} language -  This is the selected quiz language (quiz type).
 */
function setSelectedLanguage(language) {
    document.getElementById('selectedQuizTitle').innerHTML = language;
    document.getElementById('selectedQuizBtn').innerHTML = language;
    document.getElementById('completedSelectedQuiz').innerHTML = language;
}


/**
 * Stop the current playing audio and play (by means of load() funktion) the selected one.
 * @param {audioObjekt} audio - This is the audio which should be played.
 */
function playAudio(audio) {
    stopAudio();
    audio.addEventListener("canplay", function onCanPlay() {
        audio.removeEventListener("canplay", onCanPlay);
        audio.play();
    });
    audio.load();
}


/**
 * Set the current playing audio on puase state and currentTime on zero.
 */
function stopAudio() {
    if (currentPlayingAudio !== undefined) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
    }
}


/**
 * Custom property for HTMLMediaElements which returns as a boolean value if it is currently playing.
 */
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function () {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})


/**
 * Reset progress bar, 
 * the variables currentQuestion, rightQuestions, the array correctnessOfAnswers
 * and all style of the answer buttons before the new game.
 * Show the start screen. 
 */
function resetGame() {
    setProgressBarToZero()
    showStartScreen();
    currentQuestion = 0;
    correctnessOfAnswers = [];
    rightQuestions = 0;
    resetAnswerButtons()
}


/**
 * Reset the progress bar to the 0%.
 */
function setProgressBarToZero() {
    document.getElementById('progressBar').innerHTML = '0%';
    document.getElementById('progressBar').style.width = '0%';
}


/**
 * Make questions content, end screen invisible and the start screen visible.
 */
function showStartScreen() {
    document.getElementById('startScreen').classList.remove('d-none')
    document.getElementById('questions').classList.add('d-none');
    document.getElementById('endScreen').classList.add('d-none');
}


/**
 * Style all answers back to the default ('unselected') state.
 */
function resetAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        resetStyleOfRightAnswer(i);
        resetStyleOfWrongAnswers(i);
        enableAnswerBtn(i);
        enableHoverCp();
    }
    makePreviousBtnVisible();
}


/**
 * Reset the style of the right answer.
 * @param {number} i - This is the index of the for-loop of the resetAnswerButtons() function (here the number of answer button and its components).
 */
function resetStyleOfRightAnswer(i) {
    document.getElementById(`answerBadge${i}`).classList.replace('badgeSuccess', 'badgeLight');
    document.getElementById(`answerButton${i}`).classList.replace('alert-success', 'alert-light');
    document.getElementById(`rightAnswerSymbol${i}`).classList.add('d-none');
}


/**
 * Reset the style of the wrong answers.
 * @param {number} i - This is the index of the for-loop of the resetAnswerButtons() function (here the number of answer button and its components).
 */
function resetStyleOfWrongAnswers(i) {
    document.getElementById(`answerBadge${i}`).classList.replace('badgeDanger', 'badgeLight');
    document.getElementById(`answerButton${i}`).classList.replace('alert-danger', 'alert-light');
    document.getElementById(`wrongAnswerSymbol${i}`).classList.add('d-none');
}


/**
 * Enable all answer buttons.
 * @param {*} i - This is the index of the for-loop of the resetAnswerButtons() function (here the number of answer button9).
 */
function enableAnswerBtn(i) {
    document.getElementById(`answerButton${i}`).disabled = false;
}


/**
 * Enable the hover effect over the answer buttons.
 */
function enableHoverCp() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answerButton${i}`).classList.add('answerBtnHover', 'cp');
    }
}


/**
 * Make the previous button visible, if the variable currentQuestion is bigger than zero.
 */
function makePreviousBtnVisible() {
    if (currentQuestion == 0) {
        document.getElementById('previous-btn').classList.add('invisible');
    } else {
        document.getElementById('previous-btn').classList.remove('invisible');
    }
}


/**
 * Show the amount of questions for the selected quiz.
 * Make start screen, end screen invisible and the questions content visible.
 * Show a question by means of the function shoqQuestion().
 */
function showQuestionsContent() {
    document.getElementById('allQuestions').innerHTML = questions.length;
    document.getElementById('startScreen').classList.add('d-none')
    document.getElementById('questions').classList.remove('d-none');
    document.getElementById('endScreen').classList.add('d-none');
    showQuestion();
    bgMusic.play();
    bgMusic.loop = true;
}


/**
 * Show a question, 
 * update the progress bar and the nummber of the current question 
 * as long as the value of the current question is the same or bigger the questions array length (the number of all questions.) 
 * Otherise show the end screen with the quiz result. 
 */
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


/**
 * Make the questions content invisible and the end screen visible withe the result of the quiz game.
 */
function showEndScreen() {
    countRightQuestionss();
    document.getElementById('startScreen').classList.add('d-none')
    document.getElementById('questions').classList.add('d-none');
    document.getElementById('endScreen').classList.remove('d-none');
    document.getElementById('rightQuestions').innerHTML = rightQuestions;
    document.getElementById('ofAllQuestions').innerHTML = questions.length;
}


/**
 * Count the amount of right answered questions.
 */
function countRightQuestionss() {
    correctnessOfAnswers.forEach(answerCorrectness => {
        if (answerCorrectness == true) {
            rightQuestions++;
        }
    });
}


/**
 * Load a new question in the variable questions and the associated question text and answers. 
 * Increase also the number of finished questionsis.
 */
function updateQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer1').innerHTML = question['answer1'];
    document.getElementById('answer2').innerHTML = question['answer2'];
    document.getElementById('answer3').innerHTML = question['answer3'];
    document.getElementById('answer4').innerHTML = question['answer4'];
    document.getElementById('completedQuestions').innerHTML = currentQuestion + 1;
}


/**
 * Calculate the %-part of the all questions that have been completed
 * and accordingly changes the %-number in the progress bar and its width.
 */
function updateProgressBar() {
    let percent = (currentQuestion) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressBar').innerHTML = percent + '%';
    document.getElementById('progressBar').style.width = `${percent}%`;
}


/**
 * Check if selected answer is correct and accordingly signals the test result.
 * Disable / Enable in the question content window.
 * @param {number} selection - This is the number of the selected answer.
 */
function answer(selection) {
    stopAudio();
    // Setting of current question and its right answer
    let rightAnswer = questions[currentQuestion]['rightAnswer'];

    checkRightAnswerToStyle(selection, rightAnswer)
    disableEnableBtns();
}


/**
 * Style the selected asnwer red or green, plays success or fail sound according to the correctness of the answer, 
 * save the correctness of the answered questions in the array correctnessOfAnswers to the check: if the selected answer is the right one. 
 * @param {number} selection - This is the number of the selected answer.
 * @param {number} rightAnswer - This is the right answer for the current question.
 */
function checkRightAnswerToStyle(selection, rightAnswer) {
    if (selection == rightAnswer) {
        stylePlaySaveRightAnswer(selection);

    } else {
        stylePlaySaveWrongAnswer(selection, rightAnswer);
    }
}


/**
 * Style the selected answer to the right one.
 * @param {number} selection - This is the number of the selected answer.
 */
function stylePlaySaveRightAnswer(selection) {
    document.getElementById(`answerBadge${selection}`).classList.replace('badgeLight', 'badgeSuccess');
    document.getElementById(`answerButton${selection}`).classList.replace('alert-light', 'alert-success');
    document.getElementById(`rightAnswerSymbol${selection}`).classList.remove('d-none');
    playAudio(success);
    saveAnswer(currentQuestion, true);
}


/**
 * Style the selected answer to the wrong one.
 * @param {number} selection - This is the number of the selected answer.
 * @param {number} rightAnswer - This is the right answer for the current question.
 */
function stylePlaySaveWrongAnswer(selection, rightAnswer) {
    document.getElementById(`answerBadge${selection}`).classList.replace('badgeLight', 'badgeDanger');
    document.getElementById(`answerButton${selection}`).classList.replace('alert-light', 'alert-danger');
    document.getElementById(`wrongAnswerSymbol${selection}`).classList.remove('d-none');
    document.getElementById(`answerBadge${rightAnswer}`).classList.replace('badgeLight', 'badgeSuccess');
    document.getElementById(`answerButton${rightAnswer}`).classList.replace('alert-light', 'alert-success');
    document.getElementById(`rightAnswerSymbol${rightAnswer}`).classList.remove('d-none');
    playAudio(fail);
    saveAnswer(currentQuestion, false);
}


/**
 * Collection of functions, which disable or enable buttons after the selecton of an answer.
 */
function disableEnableBtns() {
    // This disables the answer buttons and the hover effect.
    disableAnswerBtn();
    disableHoverCp();

    // This enables the next ans previus question button.
    enableArrowBtn();
}


/**
 * Disable all answer buttons.
 */
function disableAnswerBtn() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answerButton${i}`).disabled = true;
    }
}


/**
 * Disable the hover effect over the answer buttons.
 */
function disableHoverCp() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answerButton${i}`).classList.remove('answerBtnHover', 'cp');
    }
}


/**
 * Enable the arrow buttons (next and previous).
 */
function enableArrowBtn() {
    document.getElementById('next-btn').disabled = false;
    document.getElementById('previous-btn').disabled = false;
}


/**
 * Save the correctness of the answer for each answered question: if it was right or wrong.
 * @param {number} currentQuestion - This is the number of the current question
 * @param {boolean} valueOfCorrectnessOfAnswers - This is the boolean value of the correctness of the answer for the current question.
 */
function saveAnswer(currentQuestion, valueOfCorrectnessOfAnswers) {
    if (valueOfCorrectnessOfAnswers == true) {
        correctnessOfAnswers[currentQuestion] = true;
    } else {
        correctnessOfAnswers[currentQuestion] = false;
    }
}


/**
 * Increase the variable currentQuestion and load the next question. 
 */
function nextQuestion() {
    currentQuestion++;
    loadQuestion()
}


/**
 * Reduce the variable currentQuestion and load the previous question.
 */
function previousQuestion() {
    currentQuestion--;
    loadQuestion()
}


/**
 * Stop the currently playying audio,
 * disable the next and previous question button, 
 * reset the styles of the answers, +
 * show the question. 
 */
function loadQuestion() {
    stopAudio();
    document.getElementById('next-btn').disabled = true;
    document.getElementById('previous-btn').disabled = true;
    resetAnswerButtons();
    showQuestion();
}