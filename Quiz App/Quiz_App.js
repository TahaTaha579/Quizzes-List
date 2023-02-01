let quizInfo = document.querySelector(".quiz-info")
let countQ = document.querySelector(".quiz-info .count span");
let quizArea = document.querySelector(".quiz-area")
let answersArea = document.querySelector(".answers-area")
let submit = document.querySelector(".submit-button")
let bullets = document.querySelector(".bullets")
let spans = document.querySelector(".bullets .spans")
let countdown = document.querySelector(".countdown");
let results = document.querySelector(".results");
let again = document.querySelector(".results .again");

let jsonObject;
let counter = 0;
let counterInterval;

fetch("Quiz_App.json").then((data) => {

    return data.json()

}).then((result) => {

    jsonObject = result;

    let lengthJsonObject = jsonObject.length;

    countQ.innerHTML = lengthJsonObject;

    createBullets(lengthJsonObject);

    fun(jsonObject);

    submit.onclick = function () {
        fun2(jsonObject);

    }

    cdown();
})

function createBullets(lengthJsonObject) {

    for (let i = 0; i < lengthJsonObject; i++) {

        let span = document.createElement("span");
        if (i == 0) {
            span.classList.add("on")
        }
        spans.appendChild(span);
    }
}

function fun(jsonObject) {

    quizArea.innerHTML = '';
    answersArea.innerHTML = '';

    let index = Math.floor(Math.random() * jsonObject.length);

    let nameQuestion = document.createElement("h2");
    nameQuestion.setAttribute("numOfQuestion", index);
    nameQuestion.textContent = jsonObject[index][`title`] + ' ?!'

    quizArea.appendChild(nameQuestion);

    for (let i = 0; i < 4; i++) {

        let div = document.createElement("div");
        div.classList.add("answer")

        let input = document.createElement("input")
        input.setAttribute("type", "radio")
        input.setAttribute("id", i);
        input.setAttribute("name", "question")
        input.setAttribute("answer", jsonObject[index][`answer_${i + 1}`])
        // if (i==0) {
        //     input.checked = true;
        // }

        let label = document.createElement("label");
        label.textContent = jsonObject[index][`answer_${i + 1}`];
        label.setAttribute("for", i)
        // label.htmlFor = i;

        div.append(input, label);
        // The order is important

        answersArea.append(div)
    }


}

function fun2(jsonObject) {

    let inputs = Array.from(document.querySelectorAll("input"))
    let arrayBullets = Array.from(document.querySelectorAll(".bullets .spans span"))

    let nameQuestion = document.querySelector(".quiz-area h2")
    let check = true;

    for (let i = 0; i < jsonObject.length; i++) {

        if (i == nameQuestion.getAttribute("numOfQuestion")) {

            let rightAnswer = jsonObject[i][`right_answer`];

            inputs.forEach((input) => {

                if (input.checked) {
                    check = false;
                    if (!(input.getAttribute("answer") == rightAnswer)) {

                        counter++;

                    }
                    console.log(counter)
                }
            })

            if (check) {

                counter++;

            }

            jsonObject.splice(i, 1)

        }
    }

    if (jsonObject.length != 0) {

        arrayBullets.forEach((span) => {

            // span.classList.remove("on")
            arrayBullets[9 - jsonObject.length].classList.add("on")

        })

        fun(jsonObject);

        cdown();

    }

    else {

        quizInfo.remove();
        quizArea.remove();
        answersArea.remove();
        submit.remove();
        bullets.remove();

        createResults();

    }


}

function createResults() {

    let title = document.createElement("h3");
    let span = document.createElement("span");
    let result;

    if (counter >= 7) {
        result = 'Bad'
    }
    else if (counter >= 5) {
        result = 'good'
    }
    else {
        result = 'perfect';
    }

    span.innerHTML = counter;
    span.classList.add(`${result.toLowerCase()}`)
    
    let textTitle = document.createTextNode(`Your Worgns : `)
    title.append(textTitle, span)

    results.prepend(title);
    results.classList.add("show")
}

function cdown() {

    clearInterval(counterInterval);

    let duration = 31;

    createMinutesAndSeconds(duration);

    counterInterval = setInterval(() => {

        createMinutesAndSeconds(duration);

        if (--duration == 0) {

            clearTimeout(counterInterval)

            if (jsonObject.length != 0) {

                fun2(jsonObject);
                // submit.click();
            }
        }
    }, 900);

}

function createMinutesAndSeconds(duration) {

    let minutes = parseInt(duration / 60);
    let seconds = parseInt(duration % 60);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    countdown.innerHTML = `${minutes}:${seconds}`
}

again.onclick = function () {

    location.reload();

}
