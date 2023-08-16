const optionList = document.querySelector(".option-list"),
quesText = document.querySelector(".que-text"),
nextBtn = document.querySelector(".next-btn"),
totalQue = document.querySelector(".total-que"),
timeSec = document.querySelector(".time-sec"),
timeLine = document.querySelector(".time-line"),
resultBox = document.querySelector(".result-box"),
scoreText = document.querySelector(".score-text");

let queCount = 0,
totalCount = 1,
timer,
newTimer = 15,
line,
newTimeLine = 0,
score = 0;

function timeCounter(time){
    console.log(time)
    timer = setInterval(counter, 1000);
    function counter(){
        timeSec.textContent = time;
        time--;
        if(time < 9){
            timeSec.textContent = `0${time}`;
        }
        if(time < 0){
            clearInterval(timer);
            timeSec.textContent = "00";
        }
    }
}

function timeLineCounter(time){
    line = setInterval(counter, 33);
    function counter(){
        time++;
        timeLine.style.width = time + "px";
        if(time == 350){
            clearInterval(line)
        }
    }
    console.log(time)
}
timeLineCounter(0);
nextBtn.addEventListener("click", () => {
    if(queCount < question.length - 1){
        queCount++;
        showQuestion(queCount);
        totalCount++;
        totalQuesCounter(totalCount);
        clearInterval(timer);
        timeCounter(newTimer);
        clearInterval(line);
        timeLineCounter(newTimeLine);
    }else{
        console.log("question fished")
        showResult();
    }
});

function showQuestion(index){
    quesText.innerHTML = `<span>${question[index].num}. ${question[index].question}</span>`;
    optionList.innerHTML = `<div class="option"><span>${question[index].options[0]}</span></div>`
                           +`<div class="option"><span>${question[index].options[1]}</span></div>`
                            +`<div class="option"><span>${question[index].options[2]}</span></div>`
                            +`<div class="option"><span>${question[index].options[3]}</span></div>`;
    let allOption = optionList.querySelectorAll(".option");
    for(let i = 0; i < allOption.length; i++){
        allOption[i].setAttribute("onclick", "clickedOption(this)");
    }                        
}

function totalQuesCounter(index){
    totalQue.innerHTML = `<span><p>${index}</p> of <p>${question.length}</p> questions</span>`
}

let tickIcon = `<div class="icon"><i class="bx bx-check"></i></div>`,
crossIcon = `<div class="icon"><i class="bx bx-x"></i></div>`;

function clickedOption(e){
    clearInterval(timer);
    clearInterval(line);
    let correctAns = question[queCount].answer;
    let userAns = e.textContent;
    let allOptions = e.parentElement.querySelectorAll(".option");
    if(userAns == correctAns){
        score++;
        console.log(score)
        console.log("hi")
        e.classList.add("correct");
        e.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        console.log("fuk")
        e.classList.add("incorrect");
        e.insertAdjacentHTML("beforeend", crossIcon);
        for(let i = 0; i < allOptions.length; i++){
            if(correctAns == allOptions[i].textContent){
                console.log("hi")
                allOptions[i].classList.add("correct");
                allOptions[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    for(let i = 0; i < allOptions.length; i++){
        allOptions[i].style.pointerEvents = "none";
    }
}

function showResult(){
    document.querySelector(".quiz-box").style.display = "none";
    resultBox.classList.add("active");
    if(score > 3){
        scoreText.innerHTML = `<span>very good, you got only <p>${score}</p> out of <p>${question.length}</p></span>`
    }else if(score > 1){
        scoreText.innerHTML = `<span>good, you got only <p>${score}</p> out of <p>${question.length}</p></span>`
    }else{
        scoreText.innerHTML = `<span>sorry, you got only <p>${score}</p> out of <p>${question.length}</p></span>`

    }
}

totalQuesCounter(1)
showQuestion(0);
timeCounter(15);