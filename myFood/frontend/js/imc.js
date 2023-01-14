const submit = document.getElementById('submit');
const displayResult = document.getElementById('displayResult');

submit.addEventListener('click', () => {
    imc();
});

async function imc() {

    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const age = document.getElementById('age').value;
    const sex = document.querySelector('input[name="sex"]:checked').value;

    console.log(height, weight, age, sex);

    const result = await fetch("/api/calories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            age: age,
            weight: weight,
            height: height,
            gender: sex,
        })
    })

    const data = await result.json();
    const total = parseFloat(data.total).toFixed(2);
    console.log(total);
    var totalCategory = undefined;

    switch (true) {
        case (total < 18.50):
            totalCategory = "Under weight"
            displayResult.classList.remove("green");
            displayResult.classList.remove("red");
            displayResult.classList.remove("blue");
            displayResult.classList.remove("yellow");
            displayResult.classList.add("blue");
            break;
        case ((total >= 18.50) && (total < 24.99)):
            totalCategory = "Normal"
            displayResult.classList.remove("green");
            displayResult.classList.remove("red");
            displayResult.classList.remove("blue");
            displayResult.classList.remove("yellow");
            displayResult.classList.add("green");
            break;
        case ((total >= 24.99) && (total < 29.99)):
            totalCategory = "Over weight"
            displayResult.classList.remove("green");
            displayResult.classList.remove("red");
            displayResult.classList.remove("blue");
            displayResult.classList.remove("yellow");
            displayResult.classList.add("yellow");
            break;
        case ((total >= 29.99) && (total < 34.99)):
            totalCategory = "Obesity I"
            displayResult.classList.remove("green");
            displayResult.classList.remove("red");
            displayResult.classList.remove("blue");
            displayResult.classList.remove("yellow");
            displayResult.classList.add("red");
            break;
        case ((total >= 34.99) && (total < 39.99)):
            totalCategory = "Obesity II"
            displayResult.classList.remove("green");
            displayResult.classList.remove("red");
            displayResult.classList.remove("blue");
            displayResult.classList.remove("yellow");
            displayResult.classList.add("red");
            break;
        case (total >= 39.99):
            totalCategory = "Obesity III"
            displayResult.classList.remove("green");
            displayResult.classList.remove("red");
            displayResult.classList.remove("blue");
            displayResult.classList.remove("yellow");
            displayResult.classList.add("red");
            break;
        default:
            totalCategory = "Error"
            displayResult.classList.remove("green");
            displayResult.classList.remove("red");
            displayResult.classList.remove("blue");
            displayResult.classList.remove("yellow");
            displayResult.classList.add("red");
    }
    document.getElementById("imcNumber").innerHTML = total
    document.getElementById("imcString").innerHTML = totalCategory
}