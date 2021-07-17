window.addEventListener('beforeunload', save);

let question = document.querySelector('.question');
let answers = document.querySelectorAll('.answer');
let moneyView = document.querySelector('.money');
let questionNumberCurrentView = document.querySelector('.questionNumberCurrent');
let congratsView = document.querySelector('.congrats');
let quizView = document.querySelector('.quizView');
let startQuizView = document.querySelector('.startQuiz');
let usersView = document.querySelector('.showList');
let customersView = document.querySelector('.customers');
let mainImgView = document.querySelector('#mainImg');

let helpBtns = document.querySelectorAll('.help > p');
let friendSay = document.querySelector('.friend-say');
let timer = document.querySelector('.timer');
let userName = document.querySelector('.username');
let startBtn = document.querySelector('.btn-start');
let usersBtn = document.querySelector('.showUsers');
let modal = document.querySelector("#modal");
let span = document.querySelector(".close");

let rand = Math.floor(Math.random()*questions.length);
let currentQuestion;
let easyQuestions;
let mediumQuestions;
let hardQuestions;
let expertQuestions;
let percent;
let currentMoney = `0 rsd`;
let finish = false;
let userBtnCounter = 0;

startBtn.addEventListener('click', function () {
    if(userName.value !== '') {
        startQuizView.style.display = 'none';
        quizView.style.display = 'flex';
        askUser();
    } else {
        alert("Molimo Vas unesite ime")
    }
})

usersBtn.addEventListener('click', function () {
    if(userBtnCounter === 0) {
        createViewUsers();
        usersBtn.innerHTML = `Nazad na kviz`;
        userBtnCounter++;
        usersView.style.display = 'flex';
        startQuizView.style.display = 'none';
        quizView.style.display = 'none';
    } else {
        usersBtn.innerHTML = `Prethodni takmicari`;
        userBtnCounter--;
        usersView.style.display = 'none';
        startQuizView.style.display = 'none';
        quizView.style.display = 'flex';
    }
})

function changeMainImg() {
    mainImgView.setAttribute('src', `img/${counter}.jpg`);
}
function filterQuestions() {
    easyQuestions = questions.filter(quest => {
        return quest.difficult === "easy";
    })
    mediumQuestions = questions.filter(quest => {
        return quest.difficult === "medium";
    })
    hardQuestions = questions.filter(quest => {
        return quest.difficult === "hard";
    })
    expertQuestions =  questions.filter(quest => {
        return quest.difficult === "expert";
    })    
}
filterQuestions();

let counter = 1;

function askUser() {
    questionNumberCurrentView.innerHTML = `${userName.value}, pitanje broj: ${counter}`;
    if(counter < 6) {
        rand = Math.floor(Math.random()*easyQuestions.length);
        currentQuestion = easyQuestions[rand];
        question.innerHTML = easyQuestions[rand].title;
        for (let i = 0; i < answers.length; i++) {
            answers[i].innerHTML = easyQuestions[rand].answers[i];
        }
        easyQuestions.splice(rand, 1);
        if(rand = easyQuestions.length) {
            rand = Math.floor(Math.random()*easyQuestions.length);
        }
    } else if (counter >= 6 && counter < 11) {
        rand = Math.floor(Math.random()*mediumQuestions.length);
        currentQuestion = mediumQuestions[rand];
        question.innerHTML = mediumQuestions[rand].title;
        for (let i = 0; i < answers.length; i++) {
            answers[i].innerHTML = mediumQuestions[rand].answers[i];
        }
        mediumQuestions.splice(rand, 1);
        if(rand = easyQuestions.length) {
            rand = Math.floor(Math.random()*mediumQuestions.length);
        }
    } else if (counter >= 11 && counter < 14) {
        rand = Math.floor(Math.random()*hardQuestions.length);
        currentQuestion = hardQuestions[rand];
        question.innerHTML = hardQuestions[rand].title;
        for (let i = 0; i < answers.length; i++) {
            answers[i].innerHTML = hardQuestions[rand].answers[i];
        }
        hardQuestions.splice(rand, 1);
        if(rand = easyQuestions.length) {
            rand = Math.floor(Math.random()*hardQuestions.length);
        }
    } else if (counter >= 14 && counter < 16) {
        rand = Math.floor(Math.random()*expertQuestions.length);
        currentQuestion = expertQuestions[rand];
        question.innerHTML = expertQuestions[rand].title;
        for (let i = 0; i < answers.length; i++) {
            answers[i].innerHTML = expertQuestions[rand].answers[i];
        }
        expertQuestions.splice(rand, 1);
        if(rand = easyQuestions.length) {
            rand = Math.floor(Math.random()*expertQuestions.length);
        }
    } else {
        currentMoney = money['15'];
        quizView.style.display = 'none';
        congratsView.style.display = 'flex';
    }

    if(counter === 6) {
        questionNumberCurrentView.classList.add('zagarantovana-suma')
        questionNumberCurrentView.innerHTML = `CESTITAMO! ${userName.value} Vasa zagarantovana suma je ${money['05']} `;
        currentMoney = money['05'];
        setTimeout(function () {
            questionNumberCurrentView.innerHTML = `Pitanje broj: ${counter}`;
            questionNumberCurrentView.classList.remove('zagarantovana-suma')
        },3000)
    } else if (counter === 11) {
        questionNumberCurrentView.classList.add('zagarantovana-suma')
        questionNumberCurrentView.innerHTML = `CESTITAMO! ${userName.value} Vasa zagarantovana suma je ${money['10']} `;
        currentMoney = money['10'];
        setTimeout(function () {
            questionNumberCurrentView.innerHTML = `${userName.value}, pitanje broj: ${counter}`;
            questionNumberCurrentView.classList.remove('zagarantovana-suma')
        },3000)
    } 

    for (let i = 0; i < questions.length; i++) {
        for (let k = 0; k < questions[i].answers.length; k++) {
           answers[k].addEventListener('click', checkAnswer);
        }
      }
}


function checkAnswer() {
    let answerOne = this;
    this.style.background = "#f90";
   setTimeout(function () {
    let sure = confirm(`${userName.value}, da li je to vas konacan odgovor?`);
    if(sure === true) {
        if(answerOne.innerHTML === currentQuestion.correctAnswer) {
            counter++;
            answerOne.style.background = "green";
            setTimeout(function () {
                askUser();
                answerOne.style.background = '#111';
                colorMoney();
                changeMainImg();
            },1000);
        } else {
            finish = true;
            helpFriend();
            usersBtn.style.display = 'flex';
            questionNumberCurrentView.innerHTML = `Nazalost, Vas odgovor nije tacan. ${userName.value}, Vasa osvojena suma ${currentMoney}`
            questionNumberCurrentView.style.background = 'red'; 
            questionNumberCurrentView.style.color = '#fff'; 
            counter = 0;
            answerOne.style.background = "red";
            for (let i = 0; i < answers.length; i++) {
                answers[i].removeEventListener('click', checkAnswer);
                if(answers[i].innerHTML === currentQuestion.correctAnswer) {
                    answers[i].style.background = 'green';
                }
            }
            setTimeout(function () {
                let newGameConfirm = confirm("Da li zelite novu igru?");
                if(newGameConfirm) {
                    reloadGame()
                } else {
                    quizView.style.display = 'none';
                }
            },3000);
            
        }
    } else {
        answerOne.style.background = "#111";
        return;
    }
   },200)
}

function reloadGame() {
    location.reload();
}


function showMoneyView() {
    let text = '';
    for (let i = 1; i < 16; i++) {
        if(i < 10) {
            i = `0${i}`
        }
        text+= `
            <p data-id="moneyOne">${i}: <span>${money[`${i}`]}</span></p>
        `
    }
    moneyView.innerHTML = text;
    colorMoney();
}
showMoneyView();

function colorMoney() {
    let moneyOne = document.querySelectorAll('[data-id="moneyOne"]');
    for (let i = 0; i < moneyOne.length; i++) {
        moneyOne[counter-1].className = 'orange';
        if(counter > 1) {
            moneyOne[counter-2].className = 'gray';
        }
    }
    if(counter === 5) {
       moneyOne[counter-1].style.background = 'greenyellow';
    }  else if (counter === 10) {
       moneyOne[counter-1].style.background = 'greenyellow';
    }

}

// helps:
function btnsGetClicks() {
    helpBtns.forEach(btn => {
        btn.addEventListener('click', helpFriend);
    })
}
btnsGetClicks();
function helpFriend() {
   if(finish !== true) {
    let sure = confirm(`${userName.value}, da li ste sigurni da izelite da iskoristite pomoc?`)
    if(sure) {
        this.removeEventListener('click', helpFriend);
        this.style.opacity = '0.2';
        let current = this.getAttribute('class');
        if(current === 'half-half') {
            halfHalf();
        } else if (current === 'call-friend') {
            callFriend();
        } else {
            callAudience();
        }
    } else {
        return;
    }
   } else {
       return;
   }
}

// helps:
function halfHalf() {
    let selectTwo = 0;
    answers.forEach(answer => {
        if(answer.innerHTML !== currentQuestion.correctAnswer) {
            if(selectTwo < 2) {
                answer.innerHTML = '';
                answer.removeEventListener('click', checkAnswer);
                selectTwo++
            } 
        }
    })
}
function callFriend() {
    modal.style.display = "flex";
    timer.innerHTML = '';
    friendSay.innerHTML = '';
    span.style.display = 'none';

    if(counter < 5) {
        percent = Math.floor(Math.random()*(100-90)+90);
    } else if (counter > 5 && counter < 10) {
        percent = Math.floor(Math.random()*(85-60)+60);
    } else if (counter > 10 && counter < 13) {
        percent = Math.floor(Math.random()*(65-30)+30);
    } else {
        percent = Math.floor(Math.random()*(30-5)+5);
    }
    let indexNum = 30;
    let text = ``;
    let loop2;
    loop2 = setTimeout(function () {
        text += `<p><span class="bold">Ja</span>: Cao</p>`;
        friendSay.innerHTML = text;
    },1000);
    loop2 = setTimeout(function () {
        text += `<p><span class="bold red">Drug</span>: Cao</p>`;
        friendSay.innerHTML = text;
    },2000);
    loop2 = setTimeout(function () {
        text += `<p><span class="bold">Ja</span>: Trenutno se nalazim u kvizu Zelite li da postanete Milioner i treba mi pomoc</p>`;
        friendSay.innerHTML = text;
    },3000);
    loop2 = setTimeout(function () {
        text += `<p><span class="bold red">Drug</span>: Odlicno! Dacu sve od sebe, procitaj mi pitanje</p>`;
        friendSay.innerHTML = text;
    },7000);
    loop2 = setTimeout(function () {
        text += `<p><span class="bold">Ja</span>: <span class="bold">${currentQuestion.title}</span> Ponudjeni ogovori su: <span class="bold">${currentQuestion.answers}</span></p>`;
        friendSay.innerHTML = text;
    },12000);
    loop2 = setTimeout(function () {
        text += `<p><span class="bold red">Drug</span>: Ja mislim da je <span class="bold">${currentQuestion.correctAnswer}</span>. Siguran sam nekih <span class="bold">${percent}%</span></p>`;
        friendSay.innerHTML = text;
    },18000);
    loop2 = setTimeout(function () {
        text += `<p><span class="bold">Ja</span>: Hvala ti puno! Pozdrav</p>`;
        friendSay.innerHTML = text;
    },23000);
    loop2 = setTimeout(function () {
        text += `<p><span class="bold red">Drug</span>: Srecno! Pozdrav</p>`;
        friendSay.innerHTML = text;
        span.style.display = 'block';
    },25000);

    timer.innerHTML = `Ostalo Vam je jos <span class="timer-bgd">30</span> sekundi`;
    let loop = setInterval(function () {
        indexNum--;
        timer.innerHTML = `Ostalo Vam je jos <span class="timer-bgd">${indexNum}</span> sekundi`;
        if (indexNum === 0) {
            clearInterval(loop);
            modal.style.display = "none";
        } 
    }, 1000);

    
    span.addEventListener('click', function () {
        modal.style.display = 'none';
        clearInterval(loop);
        friendSay.innerHTML = '';
    });
    
}
function callAudience() {
    modal.style.display = "flex";
    timer.innerHTML = '';
    friendSay.innerHTML = '';
    span.style.display = 'none';

    let text;
    let indexNum = 10;
    
    let rand1;
    let rand2;
    let rand3;
    let rand4; 
    let randCorrect;

    if(counter < 5) {
         rand1 = Math.floor(Math.random()*(40-10)+10);
         rand2 = Math.floor(Math.random()*(40-10)+10);
         rand3 = Math.floor(Math.random()*(40-10)+10);
         rand4 = Math.floor(Math.random()*(40-10)+10);
         randCorrect = Math.floor(Math.random()*(100-90)+90);
    } else if (counter > 5 && counter < 10) {
        rand1 = Math.floor(Math.random()*(70-10)+10);
        rand2 = Math.floor(Math.random()*(70-10)+10);
        rand3 = Math.floor(Math.random()*(70-10)+10);
        rand4 = Math.floor(Math.random()*(70-10)+10);
        randCorrect = Math.floor(Math.random()*(90-70)+70);
    } else if (counter > 10 && counter < 13) {
        rand1 = Math.floor(Math.random()*(70-10)+10);
        rand2 = Math.floor(Math.random()*(70-10)+10);
        rand3 = Math.floor(Math.random()*(70-10)+10);
        rand4 = Math.floor(Math.random()*(70-10)+10);
        randCorrect = Math.floor(Math.random()*(80-40)+40);
    } else {
        rand1 = Math.floor(Math.random()*(50-5)+5);
        rand2 = Math.floor(Math.random()*(50-5)+5);
        rand3 = Math.floor(Math.random()*(50-5)+5);
        rand4 = Math.floor(Math.random()*(50-5)+5);
        randCorrect = Math.floor(Math.random()*(60-10)+10);
    }

    let rand = [rand1, rand2, rand3, rand4];

    timer.innerHTML = `Publika glasa jos <span class="timer-bgd">${indexNum}</span> sekundi`;
    text = `<p>Pitanje: <span class="bold">${currentQuestion.title}</span></p>`;

    let loop = setInterval(function () {
        friendSay.innerHTML = '';
        indexNum--;   
        timer.innerHTML = `Publika glasa jos <span class="timer-bgd">${indexNum}</span> sekundi`;  
        if(indexNum === 0) {
            timer.innerHTML = 'Rezultati glasanja publike:';
            answers.forEach((answer, index) => {
                let i = index+1;
                if(answer.innerHTML !== currentQuestion.correctAnswer) {
                    text += `<p>Odgovor ${i}: <span class="bold ml20">${answer.innerHTML}</span> -> <span class="bold red">${rand[index]}</span></p>`;
                } else {
                    text += `<p>Odgovor ${i}: <span class="bold ml20">${answer.innerHTML}</span> -> <span class="bold red">${randCorrect}</span></p>`;
                }
            })
            clearInterval(loop);
        } 
    },1000); 

    let loop2 = setTimeout(function () {
        friendSay.innerHTML = text;
        span.style.display = 'block';
    }, 10500)
    
    span.addEventListener('click', function () {
        modal.style.display = 'none';
        friendSay.innerHTML = '';
        clearInterval(loop);
        clearInterval(loop2);
    });
}


function createViewUsers() {
    let text = '';
    users.forEach(user => {
        text += `
            <tr>
                <td>${user.name}</td>
                <td>${user.sum}</td>
            </tr>
        `
    })
    customersView.innerHTML = text;
}

function save() {
    if(userName.value !== ''){
        users.push({
            name: userName.value,
            sum: currentMoney
        })
        localStorage.users = JSON.stringify(users);
    }
    // localStorage.clear();
}
