/* ================== BASIC COUNTER ================== */

let count = 0;

const counter = document.getElementById("counter");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset");

const customInput = document.getElementById("customValue");
const setBtn = document.getElementById("setCounter");

/* ================== LIMIT SYSTEM ================== */

let minLimit = null;
let maxLimit = null;
let limitEnabled = false;

const minInput = document.getElementById("minValue");
const maxInput = document.getElementById("maxValue");
const applyLimitBtn = document.getElementById("applyLimit");
const removeLimitBtn = document.getElementById("removeLimit");
const limitToggle = document.getElementById("limitToggle");

/* ================== THEME & COLOR ================== */

const themeBtns = document.querySelectorAll(".theme-btn");
const colorBtns = document.querySelectorAll(".color-btn");

/* ================== INITIAL ================== */

counter.innerText = count;

/* ================== ANIMATION ================== */

function animate(type) {
    counter.classList.remove("up", "down");
    void counter.offsetWidth; // reset animation
    counter.classList.add(type);
}

/* ================== INCREASE ================== */

increaseBtn.addEventListener("click", () => {

    if (limitEnabled && maxLimit !== null && count >= maxLimit) return;

    count++;
    counter.innerText = count;
    animate("up");
});

/* ================== DECREASE ================== */

decreaseBtn.addEventListener("click", () => {

    if (limitEnabled && minLimit !== null && count <= minLimit) return;

    count--;
    counter.innerText = count;
    animate("down");
});

/* ================== RESET ================== */

resetBtn.addEventListener("click", () => {
    count = 0;
    counter.innerText = count;
});

/* ================== SET CUSTOM VALUE ================== */

setBtn.addEventListener("click", () => {

    if (customInput.value === "") {
        alert("Enter a number");
        return;
    }

    count = Number(customInput.value);
    counter.innerText = count;
    customInput.value = "";

    // agar limit ON hai to adjust ho jaye
    if (limitEnabled) {
        if (minLimit !== null && count < minLimit) count = minLimit;
        if (maxLimit !== null && count > maxLimit) count = maxLimit;
        counter.innerText = count;
    }
});

/* ================== APPLY LIMIT ================== */

applyLimitBtn.addEventListener("click", () => {

    if (minInput.value === "" || maxInput.value === "") {
        alert("Enter Min & Max");
        return;
    }

    const min = Number(minInput.value);
    const max = Number(maxInput.value);

    if (min >= max) {
        alert("Min must be less than Max");
        return;
    }

    minLimit = min;
    maxLimit = max;

    limitEnabled = true;
    limitToggle.checked = true;

    if (count < minLimit) count = minLimit;
    if (count > maxLimit) count = maxLimit;

    counter.innerText = count;
});

/* ================== UNLIMITED BUTTON ================== */

removeLimitBtn.addEventListener("click", () => {
    limitEnabled = false;
    minLimit = null;
    maxLimit = null;
    limitToggle.checked = false;
});

/* ================== TOGGLE SWITCH ================== */

limitToggle.addEventListener("change", () => {

    limitEnabled = limitToggle.checked;

    if (!limitEnabled) {
        minLimit = null;
        maxLimit = null;
    }
});

/* ================== THEMES ================== */

themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        const bg = btn.dataset.bg;

        if (bg === "dark") {
            document.body.style.background = "#121212";
        } 
        else if (bg === "light") {
            document.body.style.background = "#f1f1f1";
        } 
        else {
            document.body.style.background =
                "linear-gradient(135deg,#0f2027,#203a43,#2c5364)";
        }
    });
});

/* ================== COLORS ================== */

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        counter.style.color = btn.dataset.color;
    });
});


