const my_name = document.getElementById("name");
const my_focus = document.getElementById("focus");
const my_time = document.getElementById("time");
const my_greet = document.getElementById("greet");
my_name.addEventListener("keypress", setName);
my_name.addEventListener("blur", setName);
my_focus.addEventListener("keypress", setFocus);
my_focus.addEventListener("blur", setFocus);
my_time.addEventListener("click", toggleTimeSize);
let toggleTimeCounter = 0;

function updateTime() {
    let date = new Date();
    let hours = date.getHours();
    if(hours === 0) hours = 23
    else hours--
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let amPm = hours < 12 ? "AM" : "PM";
    hours = hours % 12 || 12;
    my_time.innerHTML = `${addZero(hours)}<span>:</span>${addZero(mins)}<span>:</span>${addZero(secs)}&nbsp;${amPm}`;
    if (mins && secs == 0) updateGreetAndBack();
    setTimeout(updateTime, 1000);
}

function updateGreetAndBack() {
    console.log("updated greet");
    let date = new Date();
    let hours = date.getHours();

    document.body.style.color = "black";

    if (hours > 18 || hours < 5) {
        my_greet.textContent = "Good Evening,";
        document.body.style.background = "url('../images/night.jpg') no-repeat center center/cover";
        document.body.style.color = "white";
    } else if (hours < 12) {
        my_greet.textContent = "Good Morning,";
        document.body.style.background = "url('../images/morning.jpg')no-repeat center center/cover";
    } else {
        my_greet.textContent = "Good Afternoon,";
        document.body.style.background = "url('../images/afternoon.jpg')no-repeat center center/cover";
    }
}

function updateText() {
    let nameText = localStorage.getItem("name") === null ? "[Enter Name]" : localStorage.getItem("name");
    let focusText = localStorage.getItem("focus") === null ? "[Enter Focus]" : localStorage.getItem("focus");
    my_name.innerHTML = nameText;
    my_focus.innerHTML = focusText;
}

function addZero(nbString) {
    return parseInt(nbString, 10) < 10 ? `0${nbString}` : nbString;
}

function setName(e) {
    if (e.type === "keypress") {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem("name", e.target.innerText);
            my_name.blur();
        }
    } else {
        localStorage.setItem("name", e.target.innerText);
    }
}

function setFocus(e) {
    if (e.type === "keypress") {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem("focus", e.target.innerText);
            my_focus.blur();
        }
    } else {
        localStorage.setItem("focus", e.target.innerText);
    }
}

function toggleTimeSize() {
    toggleTimeCounter++;
    if (toggleTimeCounter % 2 == 0) {
        my_time.style.fontSize = "8rem";
    } else {
        my_time.style.fontSize = "14rem";
    }
}

updateTime();
updateGreetAndBack();
updateText();
