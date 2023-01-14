const submit = document.getElementById('submit');
const close = document.getElementById('close');
const popup_container = document.getElementById('popupContainer');
const popup_content = document.getElementById('popupContent');
const foodPlaceholder = document.getElementById('foodPlaceholder');
const foodDetailsPlaceholder = document.getElementById('foodDetailsPlaceholder');

close.addEventListener('click', () => {
    popup_container.classList.remove('show');
});

submit.addEventListener('click', () => {
    getFood();
});

function showFoodDetails(foodId, foodName) {
    return async function () {
        const clone = foodPlaceholder.cloneNode(true);
        const data = await getFoodDetailsById(foodId, foodName);
        const foodData = data.hints[0].food;
        clone.querySelector("#foodName").append(foodName);
        clone.querySelector("#foodPlaceholderContent").append(makeFoodDetailsPlaceholder(foodData));
        clone.classList.add("show");
        console.log({data});
        updatePopUp(clone);
    }
}

function makeFoodDetailsPlaceholder(foodData) {
    const clone = foodDetailsPlaceholder.cloneNode(true);
    
    if (foodData.nutrients.ENERC_KCAL != undefined) {
        clone.querySelector("#foodKcals").textContent = "Energy: " + parseFloat(foodData.nutrients.ENERC_KCAL).toFixed(2) + "kcal";
    }
    if (foodData.nutrients.CHOCDF != undefined) {
        clone.querySelector("#foodCarbs").textContent = "Carbs: " + parseFloat(foodData.nutrients.CHOCDF).toFixed(2) + "gr";
    }

    if (foodData.nutrients.PROCNT != undefined) {
        clone.querySelector("#foodProtein").textContent = "Protein: " + parseFloat(foodData.nutrients.PROCNT).toFixed(2) + "gr";
    }

    if (foodData.nutrients.FAT != undefined) {
        clone.querySelector("#foodFat").textContent = "Fat: " + parseFloat(foodData.nutrients.FAT).toFixed(2) + "gr";
    }
    
    if (foodData.image != undefined) {
        clone.querySelector("#foodImage").src = foodData.image;
    }
    // TODO: Add content

    return clone;
}

async function getFoodDetailsById(foodId) {
    console.log(foodId);
    const result = await fetch(`/api/food/?ingr=${foodId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await result.json();
    return data;
}

function createFoodObjectContainer(data) {
    const container = document.createElement('div');
    container.classList.add("food-container");
    container.id = data.food.foodId;
    container.addEventListener("click", showFoodDetails(data.food.foodId, data.food.label), false);
    const foodName = createFoodObjectLabel(data.food.label);
    // const calories = parseInt(data.food.nutrients.ENERC_KCAL) + " kcal"
    // const foodCalories = createFoodObjectLabel(calories);

    container.append(foodName);
    if (data.food.brand != undefined) {
        const foodBrand = createFoodObjectLabel("" + data.food.brand);
        container.append(foodBrand);
    }
    return container;
}

function createFoodObjectLabel(data) {
    const label = document.createElement('div');
    label.classList.add("food-label");
    label.textContent = data;

    return label;
}

function updateFoodTable(data) {
    const table = document.getElementById("foodTable");
    table.classList.remove("show");
    table.innerHTML = "";
    data.forEach(element => {
        const cell = createFoodObjectContainer(element);
        table.append(cell);
    })
    table.classList.add("show");
}

function updatePopUp(element) {
    popup_container.classList.remove("show");
    popup_content.innerHTML = "";
    popup_content.append(element);
    popup_container.classList.add("show");
}

//         0:food:
// foodId:"food_a1gb9ubb72c7snbuxr3weagwv0dd"
// uri:"http://www.edamam.com/ontologies/edamam.owl#Food_apple"
// label:"Apple"
// nutrients:
// ENERC_KCAL:52
// PROCNT:0.26
// FAT:0.17
// CHOCDF:13.81
// FIBTG:2.4
// category:"Generic foods"
// categoryLabel:"food"
// image:"https://www.edamam.com/food-img/42c/42c006401027d35add93113548eeaae6.jpg"0:food:
// foodId:"food_a1gb9ubb72c7snbuxr3weagwv0dd"
// uri:"http://www.edamam.com/ontologies/edamam.owl#Food_apple"
// label:"Apple"
// nutrients:
// ENERC_KCAL:52
// PROCNT:0.26
// FAT:0.17
// CHOCDF:13.81
// FIBTG:2.4
// category:"Generic foods"
// categoryLabel:"food"
// image:"https://www.edamam.com/food-img/42c/42c006401027d35add93113548eeaae6.jpg"
// popup_container.classList.add('show');

async function getFood() {
    const foodName = document.getElementById("foodSearchInput").value;

    const result = await fetch(`/api/food/search/?ingr=${foodName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const data = await result.json();

    console.log({ data });

    if (data?.hints.length > 0) {
        const foodList = data.hints;
        updateFoodTable(foodList);

    } else {
        //
        const title = "Something went wrong"
        const paragraph = processErrorMessage(data.error.message)

        document.getElementById("resultH4").innerHTML = title
        document.getElementById("resultP").innerHTML = paragraph

        popup_container.classList.add('show');
    }
}


    