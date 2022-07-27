// The currently selected collection of questions is loaded in the variable questions, initially the HTML questions.
let questions = questionsCSS;
let selectedQuiz = 1;
currentQuestion = 0;
correctnessOfAnswers = [];
rightQuestions = 0;

// Tones that are played after selecting the answer.
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');
let bgMusic = new Audio('audio/backgroundMusicLoop.mp3');


/* The initial function: onload-event of the body element. 
This set the selected quiz to the HTML Quiz, 
shows its start screen, 
resets all game variables
and answer buttons by the means of the the function changeQuiz. 
This also loops and starts background music. */
function init() {
    bgMusic.loop = true;
    bgMusic.play();
    questions = questionsCSS;
    changeQuiz(questionsHTML, 'HTML', 1)
}


/* This changes the quiz to the selected one (if it is a different than the current one), 
the style of the current selected quiz, 
the innerHTML content of the elements, which contain the name of the selected quiz.
This resets the game starting variables by means of function resetGame(). */
function changeQuiz(quiz, language, number) {
    if (questions != quiz) {
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


// This resets the current playing audio.
function stopAudio() {
    AUDIO_SUCCESS.pause();
    AUDIO_SUCCESS.currentTime = 0;

    AUDIO_FAIL.pause();
    AUDIO_FAIL.currentTime = 0;
}


/* This resets progress bar, 
the variables currentQuestion, rightQuestions , the array correctnessOfAnswers
 and all style of the answer buttons before the new game.
This shows the start screen. */
function resetGame() {
    setProgressBarToZero()

    showStartScreen();

    currentQuestion = 0;
    correctnessOfAnswers = [];
    rightQuestions = 0;
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
    }
    makePreviousBtnVisible();
}


//This resets the style of the right answer.
function resetStyleOfRightAnswer(i) {
    document.getElementById(`answerBadge${i}`).classList.replace('badgeSuccess', 'badgeLight');
    document.getElementById(`answerContainer${i}`).classList.replace('alert-success', 'alert-light');
    document.getElementById(`rightAnswerSymbol${i}`).classList.add('d-none');
    document.getElementById(`answerContainer${i}`).classList.add('answerBtnHover');
}


//This resets the style of the wrong answers.
function resetStyleOfWrongAnswers(i) {
    document.getElementById(`answerBadge${i}`).classList.replace('badgeDanger', 'badgeLight');
    document.getElementById(`answerContainer${i}`).classList.replace('alert-danger', 'alert-light');
    document.getElementById(`wrongAnswerSymbol${i}`).classList.add('d-none');
    document.getElementById(`answerContainer${i}`).classList.add('answerBtnHover');
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
}


/* It shows a question, 
updates the progress bar and the nummber of the current question 
as long as the value of the current question is the same or bigger the questions array length (the number of all questions.) 
Otherise it shows the end screen with the quiz result. */
function showQuestion() {
    if (currentQuestion >= questions.length) {
        showEndScreen();
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
    /* The question numbering for the correct presentation should not start with question No. 0 for the percentage calculation, but at No. 1. 
    On the other hand currentQuestion = 0 / Array.lenght gives 0% for the width of the prograss bar, 
    which would display the wrong % progress bar. */
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progressBar').innerHTML = percent + '%';
    document.getElementById('progressBar').style.width = `${percent}%`;
}


// This checks if selected answer is correct and accordingly signals the test result.
function answer(selection) {
    stopAudio();
    // Setting of current question and its right answer
    let rightAnswer = questions[currentQuestion]['rightAnswer'];

    /* This styles the selected asnwer red or green, 
    plays success or fail sound according to the correctness of the answer, 
    save the correctness of the answered questions in the array correctnessOfAnswers to the check:
    if the selected answer is the right one. */
    if (selection == rightAnswer) {
        stylePlaySaveRightAnswer(selection);
    } else {
        stylePlaySaveWrongAnswer(selection, rightAnswer);
    }

    // This enables the next ans previus question button.
    enableBtn();
    console.log(correctnessOfAnswers);
}


// This styles the selected answer to the right one.
function stylePlaySaveRightAnswer(selection) {
    document.getElementById(`answerBadge${selection}`).classList.replace('badgeLight', 'badgeSuccess');
    document.getElementById(`answerContainer${selection}`).classList.replace('alert-light', 'alert-success');
    document.getElementById(`rightAnswerSymbol${selection}`).classList.remove('d-none');
    document.getElementById(`answerContainer${selection}`).classList.remove('answerBtnHover');

    AUDIO_SUCCESS.play();

    saveAnswer(currentQuestion, true);
}


// This styles the selected answer to the wrong one.
function stylePlaySaveWrongAnswer(selection, rightAnswer) {
    document.getElementById(`answerBadge${selection}`).classList.replace('badgeLight', 'badgeDanger');
    document.getElementById(`answerContainer${selection}`).classList.replace('alert-light', 'alert-danger');
    document.getElementById(`wrongAnswerSymbol${selection}`).classList.remove('d-none');
    document.getElementById(`answerContainer${selection}`).classList.remove('answerBtnHover');

    document.getElementById(`answerBadge${rightAnswer}`).classList.replace('badgeLight', 'badgeSuccess');
    document.getElementById(`answerContainer${rightAnswer}`).classList.replace('alert-light', 'alert-success');
    document.getElementById(`rightAnswerSymbol${rightAnswer}`).classList.remove('d-none');
    document.getElementById(`answerContainer${rightAnswer}`).classList.remove('answerBtnHover');

    AUDIO_FAIL.play();

    saveAnswer(currentQuestion, false);
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
disables the next and previous question button, 
reset the styles of the answers, +
shows the question. */
function loadQuestion() {
    stopAudio();
    document.getElementById('next-btn').disabled = true;
    document.getElementById('previous-btn').disabled = true;
    resetAnswerButtons();
    showQuestion();
}