/*
 * js file for quiz
*/

// variable declarations
let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let seasons = ["Spring", "Summer", "Winter", "Fall"];

// building questions
// response types
let responseType = { // an object with distinct types
    yesNo: [{text: "Yes", score: 1}, {text: "No", score: 0}],
    weekday: weekdays,
    frequency: [
        {text: "Not at all", score: 0},
        {text: "Not frequently", score: 1},
        {text: "A couple times a month", score: 2},
        {text: "A couple times a week", score: 3},
        {text: "Every Day", score: 4}],
    userInput: [],
    season: seasons
}
/*  Questions in this format
    {question: "",
    response: responseType.frequency},
*/
let depressionQuestions = [ // an array of objects depressionQuestions[0].question, depressionQuestions[1].response PHQ-9
    {question: "Are you having thoughts that you would be better off dead, or of hurting yourself?",
        response: responseType.yesNo},
    {question: "Are you moving or speaking so slowly that other people have noticed",
        response: responseType.yesNo},
    {question: "Are you having trouble concentrating on things such as reading the newspaper or watching TV?",
        response: responseType.yesNo},
    {question: "Are you feeling bad about yourself (feel like a failure or let your family down)",
        response: responseType.yesNo},
    {question: "Do you have a poor appetite or are you overeating?",
        response: responseType.yesNo},
    {question: "Are you feeling tired or having little energy?",
        response: responseType.yesNo},
    {question: "Are you having trouble falling or staying asleep, or sleeping too much?",
        response: responseType.yesNo},
    {question: "Are you feeling down, depressed, or hopeless?",
        response: responseType.yesNo},
    {question: "Do you have little interest or pleasure in doing things?",
        response: responseType.yesNo},
]

let ptsdQuestions = [
    {question: "Are you having nightmares about a distressing event(s) or thought about the event(s) when you did not want to?", response: responseType.yesNo},
    {question: "Are you trying hard not to think about a distressing event(s) or went out of your way to avoid situations that reminded you of the event(s)?", response: responseType.yesNo},
    {question: "Do you feel constantly on guard, watchful, or easily startled?", response: responseType.yesNo},
    {question: "Do you feel numb or detached from people, activities, or your surroundings?", response: responseType.yesNo},
    {question: "Do you feel guilty or unable to stop blaming yourself or others for a distressing events(s) or any problems the event(s) may have caused?", response: responseType.yesNo},
]

let schizophreniaQuestions = [ // an array of objects
    {question: "Are the happy thoughts speeding up your thought process?", response: responseType.yesNo},
    {question: "Are the sad thoughts slowing down your thought process?", response: responseType.yesNo},
    {question: "How much brain fog are you experiencing?", response: responseType.frequency},
    {question: "Have you had any grandiose thoughts?", response: responseType.frequency}
];

let impairmentQuestions = [ // an array of objects - these questions have right or wrong answers
    {question: "What is the Weekday?", response: responseType.weekday},
    {question: "Type in the first three things you see", response: responseType.userInput},
    {question: "What is the year?", response: responseType.userInput},
    {question: "What is the season?", response: responseType.season},
    {question: "Spell 'WORLD' backwards", response: responseType.userInput},
];

let addictionQuestions = [
    {question: "Are you using substances to numb any physical or emotional pain?", response: responseType.yesNo},
    {question: "Do you feel like you should cut down on your substance use?", response: responseType.yesNo},
    {question: "Are you feeling guilty about using substances?", response: responseType.yesNo},
    {question: "Is anyone annoying you by criticizing your substance use?", response: responseType.yesNo},
    {question: "Do you feel that your substance use significantly decreases your ability to function?", response: responseType.yesNo},
    {question: "Are you using substances as soon as you wake up in the morning?", response: responseType.yesNo}
]

let anxietyQuestions = [  // an array of objects GAD-7
    {question: "Are you feeling nervous, anxious, or on edge?",
        response: responseType.yesNo},
    {question: "Are you feeling unable to stop or control worrying?",
        response: responseType.yesNo},
    {question: "Are you worrying too much about different things?",
        response: responseType.yesNo},
    {question: "Are you having trouble relaxing?",
        response: responseType.yesNo},
    {question: "Are you so restless that it is hard to sit still?",
        response: responseType.yesNo},
    {question: "Are you feeling easily annoyed or irritable?",
        response: responseType.yesNo},
    {question: "Are you feeling as if something awful might happen?",
        response: responseType.yesNo},
];










function radioQuestion(questionObj) { // takes {question, response}
    let contentDivEl = document.querySelector("#content");
    let questionTextDivEl = document.createElement("div")
    // let questionSpanEl = document.createElement("span") todo span element
    // questionSpanEl.className = "radio-wrapper";
    let questionTextEl = document.createElement("h3")
    questionTextEl.textContent = questionObj.question;
    questionTextDivEl.appendChild(questionTextEl)
    contentDivEl.appendChild(questionTextDivEl)

    let questionResponseDivEl = document.createElement("div")
    for (let i = 0; i < questionObj.response.length; i++) {
        let questionResponseInputEl = document.createElement("input")
        questionResponseInputEl.setAttribute("type", "radio")
        questionResponseInputEl.setAttribute("name", questionObj.question)
        // questionResponseInputEl.setAttribute()

        let questionResponseLabelEl = document.createElement("label")
        questionResponseLabelEl.setAttribute("for", questionObj.response[i])
        questionResponseLabelEl.textContent = questionObj.response[i].text

        questionResponseDivEl.appendChild(questionResponseInputEl)
        questionResponseDivEl.appendChild(questionResponseLabelEl)
    }
    contentDivEl.appendChild(questionResponseDivEl)


} // displays single radio question and answers

function textAreaQuestion(questionObj) {
    let contentDivEl = document.querySelector("#content");
    let questionTextDivEl = document.createElement("div")
    let questionTextEl = document.createElement("h3")
    questionTextEl.textContent = questionObj.question;
    questionTextDivEl.appendChild(questionTextEl)
    contentDivEl.appendChild(questionTextDivEl)

    let questionResponseDivEl = document.createElement("div")
    let questionResponseTextAreaEl = document.createElement("textarea")
    questionResponseDivEl.appendChild(questionResponseTextAreaEl)
    contentDivEl.appendChild(questionResponseDivEl)
} // displays single textarea question and answers

function questionParser(questionObj) {
    if(questionObj.response === responseType.userInput) {
        textAreaQuestion(questionObj)
    } else {
        radioQuestion(questionObj)
    }

} // takes a question object and parses its response type

function displayAll() {
    for (let i = 0; i < impairmentQuestions.length; i++) {
        questionParser(impairmentQuestions[i])
    }
    for (let i = 0; i < schizophreniaQuestions.length; i++) {
        questionParser(schizophreniaQuestions[i])
    }
    for (let i = 0; i < depressionQuestions.length; i++) {
        questionParser(depressionQuestions[i])
    }
    for (let i = 0; i < anxietyQuestions.length; i++) {
        questionParser(anxietyQuestions[i])
    }
    for (let i = 0; i < ptsdQuestions.length; i++) {
        questionParser(ptsdQuestions[i])
    }
    for (let i = 0; i < addictionQuestions.length; i++) {
        questionParser(addictionQuestions[i])
    }


} // TEST FUNCTION displays all questions TODO remove

function questionDisplay(questionObj) {
    let contentDivEl = document.querySelector("#content");
    for (let i = 0; i < questionObj.length; i++) {
        let questionDivEl = document.createElement("div")
        let questionSpanEl = document.createElement("span")
        questionSpanEl.className = "checkbox-wrapper"
        let questionInputEl = document.createElement("input")
        questionInputEl.setAttribute("type", "checkbox")
        questionInputEl.setAttribute("name", questionObj[i].question)
        let questionLabelEl = document.createElement("label")
        questionLabelEl.setAttribute("for", questionObj[i].question)
        questionLabelEl.textContent = questionObj[i].question
        questionSpanEl.appendChild(questionInputEl)
        questionSpanEl.appendChild(questionLabelEl)
        questionDivEl.appendChild(questionSpanEl)
        contentDivEl.appendChild(questionDivEl)
    }
}

questionOptions = [];
function questionChooserButtonHandler (userQuestions) {
    let contentDivEl = document.querySelector("#content");

    // need to compare names with objects and create quiz questions
    // compare userQuestions[] with impairment
    for (let i = 0; i < userQuestions.length; i++) { // loop through selected questions
        for (let j = 0; j < impairmentQuestions.length; j++) {
            if (userQuestions[i] === impairmentQuestions[j].question) {
                questionOptions.push(impairmentQuestions[j])
            }
        }
    }
    for (let i = 0; i < userQuestions.length; i++) { // loop through selected questions
        for (let j = 0; j < depressionQuestions.length; j++) {
            if (userQuestions[i] === depressionQuestions[j].question) {
                questionOptions.push(depressionQuestions[j])
            }
        }
    }
    for (let i = 0; i < userQuestions.length; i++) { // loop through selected questions
        for (let j = 0; j < otherQuestions.length; j++) {
            if (userQuestions[i] === otherQuestions[j].question) {
                questionOptions.push(otherQuestions[j])
            }
        }
    }
    // console.log(questionOptions)

    // loop through selected questions and display them
    for (let i = 0; i < questionOptions.length; i++) {
        // console.log(questionOptions[i])
        questionParser(questionOptions[i])
    }

    // create button for end of quiz
    let submitButtonEl = document.createElement("button")
    submitButtonEl.id = "quizSubmitButton"
    submitButtonEl.textContent = "Submit"
    contentDivEl.appendChild(submitButtonEl)
    submitButtonEl.addEventListener("click", function() {
        // grade quiz todo
        // direct to resources based on grade
        quizSubmitButtonHandler();

    })
}

function quizSubmitButtonHandler() {
    // grade quiz
    // capture quiz responses
        // grade based on illness
        // link to content generator function
    let quizResults = [];
    let quizSubmitButtonEl = document.querySelector("#quizSubmitButton")
    quizSubmitButtonEl.addEventListener("click", function() {
        // loop through questions and get selected
        console.log("click")
        let quizAnswers = document.querySelector("input[type=radio]")
        console.log(quizAnswers.length)
        for (let i = 0; i < quizAnswers.length; i++) {
            console.log(quizAnswers)
            if (quizAnswers[i].checked) {
                quizResults.push(quizAnswers[i])
                console.log(quizResults)
            }
        }

        // Depression 10 questions
        // if 1-4 minimal depression
        // if 5-9 mild depression
        // if 10-14 moderate depression
        // if 15-19 moderately severe depression
        // if 20-27 severe depression

        // Anxiety 7 questions




    });
}

function questionChooser() {
    let contentDivEl = document.querySelector("#content");
    questionDisplay(impairmentQuestions)
    questionDisplay(depressionQuestions)
    questionDisplay(schizophreniaQuestions)
    questionDisplay(ptsdQuestions)
    questionDisplay(addictionQuestions)

    // add checked object to array
    let questionChooserSubmitButton = document.createElement("button")
    questionChooserSubmitButton.textContent = "submit"
    let userQuestions = [];
    questionChooserSubmitButton.addEventListener("click", function() {
        let checkbox = document.querySelectorAll("input[type=checkbox]")
        // loop through all checkboxes
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {  // if input element is selected on button click, then save object into questions array
                userQuestions.push(checkbox[i].name)  // save checked boxes into array
            }
        }
        // console.log(userQuestions)
        questionChooserButtonHandler(userQuestions);
    })
    contentDivEl.appendChild(questionChooserSubmitButton)
} // user picks and stores relevant questions

function main() {
    // displayAll()


    questionChooser();
    // console.log(questionOptions)
    /*
    for (let i = 0; i < questionOptions.length; i++) {
        questionParser(questionOptions[i])
    }*/



}

main();