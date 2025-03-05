const percBtn = document.querySelectorAll(".percentage-window")
const billAmount = document.getElementById("bill-input")
const resetBtn = document.getElementById("reset-button")
const personTotal = document.getElementById("tot-var")
const tipTotal = document.getElementById("per-var")
const numberOfPeople = document.getElementById('number-people')
const fivePercent = document.getElementById('five-percent')
const tenPercent = document.getElementById('ten-percent')
const fifteenPercent = document.getElementById('fifteen-percent')
const twentyfivePercent = document.getElementById('twentyfive-percent')
const fiftyPercent = document.getElementById('fifty-percent')
const customPercent = document.getElementById('custom-percent')
const errorMsg = document.getElementById('error-message')



/*choses active percentage*/

const activeBtn = (button) => {
    percBtn.forEach(b => b.classList.remove('active'))
    customPercent.classList.remove('active')
    customPercent.value = 0;
    button.classList.add('active')

    if (billAmount.value === "") {
        errorMsg.classList.remove('hidden')
    }
    else if (billAmount.value > 0) {
        errorMsg.classList.add('hidden')
    }
}

percBtn.forEach(button => {
    button.addEventListener('click', () => {
        activeBtn(button);
        updateTotal();
        tipCalc()
    })
})

customPercent.addEventListener('input', () => {
    if (customPercent.value.trim() !== '' && !isNaN(customPercent.value)) {
        percBtn.forEach(b => b.classList.remove('active'));
        customPercent.classList.add('active');
        updateTotal();
        tipCalc();
    } else {
        customPercent.classList.remove('active');
    }
});

// tip calculations

let tipValue = 0;

function tipCalc() {
    if (fivePercent.classList.contains('active')) {
       tipValue = ((billAmount.value / 100 * 5) / numberOfPeople.value).toFixed(2);
    }
    else if (tenPercent.classList.contains('active')) {
        tipValue = ((billAmount.value / 10) / numberOfPeople.value).toFixed(2);
    }

    else if (fifteenPercent.classList.contains('active')) {
        tipValue = ((billAmount.value / 100 * 15) / numberOfPeople.value).toFixed(2);
    }
    else if (twentyfivePercent.classList.contains('active')) {
        tipValue = ((billAmount.value / 100 * 25) / numberOfPeople.value).toFixed(2);
    }
    else if (fiftyPercent.classList.contains('active')) {
        tipValue = ((billAmount.value / 2) / numberOfPeople.value).toFixed(2);
    }
    else if (customPercent.classList.contains('active')) {
        tipValue = ((billAmount.value / 100 * customPercent.value) / numberOfPeople.value).toFixed(2);
    }

    tipTotal.innerHTML = tipValue;
    tipAmount = tipValue
    return tipValue;
}





/*total bill value*/

let billValue = 0;


billAmount.addEventListener('input', function() {
    billValue = parseFloat(billAmount.value);
    if (billAmount.value < 0.01) {
        billAmount.value = "£ 0"
        tipTotal.innerHTML = (0.00).toFixed(2);
        personTotal.innerHTML = (0.00).toFixed(2);
    }
    else if (billAmount.value > 9999.99) {
        billAmount.value = 9999.99; 
        updateTotal();
    tipCalc();
    fontSizeTip();
    fontSizeTot();
    }

    else {
    errorMsg.classList.add('hidden')
    updateTotal();
    tipCalc();
    fontSizeTip();
    fontSizeTot();
}
})
numberOfPeople.addEventListener('input', function() {
    if (numberOfPeople.value <= 1) {
        numberOfPeople.value = 1; 
    updateTotal();
    tipCalc();
    fontSizeTip();
    fontSizeTot();
    }
    else if (numberOfPeople.value > 99) {
        numberOfPeople.value = 99;
        updateTotal();
        tipCalc();
        fontSizeTip();
        fontSizeTot()
    }

    else {
    updateTotal();
    tipCalc();
    fontSizeTip();
    fontSizeTot();
}
})

function bugFix() {
    if (billAmount.value < 0.01 && numberOfPeople.value > 1) {
        tipTotal.innerHTML = (0.00).toFixed(2);
        personTotal.innerHTML = (0.00).toFixed(2);
     }
}

function updateTotal() {
    tipCalc()
    if (billValue < 1 || numberOfPeople.value < 1) {
        personTotal.innerHTML = (0.00).toFixed(2);
    } else {
           let totalPerPerson = (billValue / numberOfPeople.value) + parseFloat(tipValue);
        personTotal.innerHTML = totalPerPerson.toFixed(2);
        
    
}}



/*reset button*/

resetBtn.addEventListener('click', function () {
    numberOfPeople.value = 1;
    billAmount.value = "£ 0";
    customPercent.value = 0;
    billValue = 0;
    errorMsg.classList.add('hidden')
    updateTotal()
    tipCalc()
    fontSizeTip();
    fontSizeTot();
    
})


//alters total and tip calculation font size when number exceends 10

function fontSizeTip() {
    if (tipTotal.innerHTML > 9.99 && tipTotal.innerHTML < 999.99) {
        tipTotal.style.fontSize = '2rem'
    }

    else if (tipTotal.innerHTML > 999.99) {
        tipTotal.style.fontSize = '1.5rem'
    }

    else if (tipTotal.innerHTML < 9.99) {
        tipTotal.style.fontSize = '3rem'
    }   
}

function fontSizeTot() {
     
   if (personTotal.innerHTML > 9.99 && personTotal.innerHTML < 999.99) {
        personTotal.style.fontSize = '2rem'
    }
    else if (personTotal.innerHTML > 999.99) {
        personTotal.style.fontSize = '1.5rem'
    }

    else if (personTotal.innerHTML < 9.99) {
         personTotal.style.fontSize = '3rem'
    }
    
    

}

