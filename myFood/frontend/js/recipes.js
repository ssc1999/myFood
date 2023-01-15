const submit = document.getElementById('submit');
const close = document.getElementById('close');
const popup_container = document.getElementById('popupContainer');
const popup_content = document.getElementById('popupContent');
const closeError = document.getElementById('closeError');
const popup_container_error = document.getElementById('popupContainerError');
const popup_content_error = document.getElementById('popupContentError');
const recipePlaceholder = document.getElementById('recipePlaceholder');
const recipeDetailsPlaceholder = document.getElementById('recipeDetailsPlaceholder');
const addRecipeButton = document.getElementById('addRecipeButton');
const submitRecipe = document.getElementById('submitRecipe');

getRecipes();

addRecipeButton.addEventListener('click', () => {
    popup_container.classList.add('show');
})

submitRecipe.addEventListener('click', () => {
    postRecipe();
})

close.addEventListener('click', () => {
    popup_container.innerHTML = "";
    popup_container.classList.remove('show');
});

closeError.addEventListener('click', () => {
    popup_container_error.classList.remove('show');
});

function showRecipeDetails(recipeId) {
    return async function () {
        const clone = recipePlaceholder.cloneNode(true);
        const data = await getRecipeDetailsById(recipeId);
        clone.querySelector("#recipeName").append(data.title);
        data.ingredients.forEach(ingredient => {
            clone.querySelector("#recipePlaceholderContent").append(makeRecipeIngredientsPlaceholder(ingredient));
        })
        //clone.querySelector("#recipePlaceholderContent").append(makeRecipeDetailsPlaceholder(data));
        clone.classList.add("show");
        console.log(data.title)
        console.log({data});
        updatePopUp(clone);
    }
}

function makeRecipeDetailsPlaceholder(data) {
    const clone = recipeDetailsPlaceholder.cloneNode(true);
    // clone.querySelector("#foodKcals").textContent = "Energy: " + parseFloat(foodData.nutrients.ENERC_KCAL).toFixed(2) + "kcal";
    clone.querySelector("#recipeIngredientsTitle").textContent = "Ingredients:"
    clone.querySelector("#recipeDescriptionTitle").textContent = "Description:"
    clone.querySelector("#recipeDescription").textContent = data.description
    
    return clone;
}

function makeRecipeIngredientsPlaceholder(data) {
    const clone = recipeDetailsPlaceholder.cloneNode(true);

    // clone.querySelector("#foodKcals").textContent = "Energy: " + parseFloat(foodData.nutrients.ENERC_KCAL).toFixed(2) + "kcal";
    clone.querySelector("#recipeIngredients").textContent = data
    
    return clone;
}

async function getRecipeDetailsById(recipeId) {
    console.log(recipeId);
    const result = await fetch(`/api/recipe/${recipeId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await result.json();
    return data;
}

function createRecipeObjectContainer(data) {
    const container = document.createElement('div');
    container.classList.add("recipe-container");
    container.id = data.id;
    container.addEventListener("click", showRecipeDetails(data.id), false);
    const recipeName = createRecipeObjectLabel(data.title);
    const recipeDate = createRecipeObjectLabel(data.date);
    container.append(recipeName)
    container.append(recipeDate)
    return container;
}

function createRecipeObjectLabel(data) {
    const label = document.createElement('div');
    label.classList.add("recipe-label");
    label.textContent = data;

    return label;
}

function updateRecipeTable(data) {
    const table = document.getElementById("recipeTable");
    table.classList.remove("show");
    table.innerHTML = "";
    data.forEach(element => {
        const cell = createRecipeObjectContainer(element);
        console.log(element)
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

async function getRecipes() {
    const result = await fetch('/api/recipes/', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "user": localStorage.getItem("token")
        }
    })

    const data = await result.json();

    console.log({ data });

    if (data != undefined) {
        updateRecipeTable(data);

    } else {
        //
        const title = "Something went wrong"
        const paragraph = processErrorMessage(data.error.message)

        document.getElementById("resultH4").innerHTML = title
        document.getElementById("resultP").innerHTML = paragraph

        popup_container.classList.add('show');
    }
}

async function postRecipe() {
    console.log("Post Recipe")
    const token = localStorage.token;
    const title = document.getElementById("recipeTitle").value
    const description = document.getElementById("recipeDescription").value
    let ingredients = []
    console.log({ ingredients})
    for (let i = 0; i < 10; i++) {
        let ingredientTitle = document.getElementById(`ingredientTitle${i}`).value
        console.log(`ingredientQuantity${i}`)
        
        if (ingredientTitle != "") {
            let ingredientQuantity = document.getElementById(`ingredientQuantity${i}`).value
            ingredients.push([ingredientTitle]);
            ingredients[i].push(parseFloat(ingredientQuantity).toFixed(2))
        } else {
            i = 10;
        }
    }
    console.log({ ingredients });
    
    const result = await fetch('/api/recipes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "User": token
        },
        body: JSON.stringify({
            "user": token,
            "title": title,
            "date": "",
            "description": description,
            "ingredients": ingredients
        })
    })

    const data = await result.json()

    if (data.status === "ok") {
        location.href = 'recipes.html';
    } else {
        popup_container_error.classList.add("show")

    }
}


    