let qs = [
    {
        question: "What does HTML stand for ?",
        answers: [
            {text: "Hyper Transfer Markup Language", correct: false},
            {text: "High Text Markup Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyperlink and Text Management Language", correct: false},
        ]
    },
    {
        question: "Which CSS property is used to change text color ?",
        answers: [
            {text: "text-color", correct: false},
            {text: "color", correct: true},
            {text: "font-color", correct: false},
            {text: "background-color", correct: false},
        ]
    },
    {
        question: "What does the JavaScript typeof operator return for an array ?",
        answers: [
            {text: `"array"`, correct: false},
            {text: `"object"`, correct: true},
            {text: `"list"`, correct: false},
            {text: `"collection"`, correct: false},
        ]
    },
    {
        question: "Which of the following is a programming language ?",
        answers: [
            {text: "HTML", correct: false},
            {text: "CSS", correct: false},
            {text: "JavaScript ", correct: true},
            {text: "XML", correct: false},
        ]
    },
    {
        question: "What does SQL stand for ?",
        answers: [
            {text: "Structured Question Language", correct: false},
            {text: "Standard Query Language", correct: false},
            {text: "Structured Query Language", correct: true},
            {text: "Simple Query Language", correct: false},
        ]
    },
    {
        question: "What is the correct way to write a function in JavaScript ?",
        answers: [
            {text: "function = myFunction()", correct: false},
            {text: "function myFunction()", correct: true},
            {text: "myFunction function()", correct: false},
            {text: "def myFunction()", correct: false},
        ]
    },
    {
        question: "Which of the following is a front-end JavaScript framework ?",
        answers: [
            {text: "Django", correct: false},
            {text: "Flask", correct: false},
            {text: "React ", correct: true},
            {text: "Laravel", correct: false},
        ]
    },
    {
        question: "Which symbol is used for comments in CSS ?",
        answers: [
            {text: "// comment", correct: false},
            {text: "# comment", correct: false},
            {text: "/* comment */", correct: true},
            {text: "-- comment", correct: false},
        ]
    },
    {
        question: `What is the output of 2 + "2" in JavaScript ?`,
        answers: [
            {text: "4", correct: false},
            {text: `"4"`, correct: false},
            {text: `"22" `, correct: true},
            {text: "Error", correct: false},
        ]
    },
    {
        question: "Which of the following is used to style web pages?",
        answers: [
            {text: "HTML", correct: false},
            {text: "CSS ", correct: true},
            {text: "JavaScript", correct: false},
            {text: "PHP", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.querySelector('.progress');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
    showQuestion();
    updateProgress();
}

function showQuestion() {
    resetState();
    let currentQuestion = qs[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `<span class="question-number">Question ${questionNo}/${qs.length}</span><br>${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    const percentage = (score / qs.length) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = 'Perfect Score! 🏆';
    } else if (percentage >= 80) {
        message = 'Excellent Work! 🌟';
    } else if (percentage >= 60) {
        message = 'Good Job! 👍';
    } else {
        message = 'Keep Practicing! 💪';
    }

    questionElement.innerHTML = `
        <h3 style="color: #1e3a8a; margin-bottom: 12px;">${message}</h3>
        <p style="font-size: 24px; margin-bottom: 8px;">You scored ${score} out of ${qs.length}</p>
        <p style="color: #6b7280;">${percentage}% correct answers</p>
    `;
    
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < qs.length) {
        showQuestion();
        updateProgress();
    } else {
        showScore();
        progressBar.style.width = '100%';
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex) / qs.length) * 100;
    progressBar.style.width = progress + '%';
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < qs.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();