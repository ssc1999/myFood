const modal = document.querySelector('#modal')
const submit = document.getElementById('submit');
const close = document.getElementById('close');
const popup_container = document.getElementById('popupContainer');
// const popup_content = document.getElementById('popupContent');
const closeError = document.getElementById('closeError');
const popup_container_error = document.getElementById('popupContainerError');
const popup_content_error = document.getElementById('popupContentError');
const recipePlaceholder = document.getElementById('recipePlaceholder');
const recipeDetailsPlaceholder = document.getElementById('recipeDetailsPlaceholder');
const addRecipeButton = document.getElementById('addRecipeButton');
const submitRecipe = document.getElementById('submitRecipe');

getRecipes();

// addRecipeButton.addEventListener('click', () => {
//     popup_container.classList.add('show');
// })

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

function showRecipeDetails(data) {
    return function () {
        // console.log(`showRecipeDetails: ${JSON.stringify(data, null, 4)}`)
        const recipeDetails = recipeDetailsPlaceholder.cloneNode(true);
        const title = recipeDetails.querySelector("#recipeName").cloneNode(true);
        const recipeIngredientsTitle = recipeDetails.querySelector("#recipeIngredientsTitle").cloneNode(true);
        const recipeDescriptionTitle = recipeDetails.querySelector("#recipeDescriptionTitle").cloneNode(true);
        const recipeIngredients = recipeDetails.querySelector('#recipeIngredients').cloneNode(true)
        const ingredientContainer = recipeIngredients.querySelector('.ingredient-container')
        const recipeDescription = recipeDetails.querySelector("#recipeDescription").cloneNode(true);   
        
        title.textContent = data.title;
        recipeIngredientsTitle.textContent = "Ingredients:"
        recipeDescriptionTitle.textContent = "Description:"
        recipeDescription.textContent = data.description;
        
        recipeIngredients.innerHTML = ''
        data.ingredients.forEach(([name, grams]) => {
            const clone = ingredientContainer.cloneNode(true)
            clone.querySelector('.ingredient-name').textContent = name
            clone.querySelector('.ingredient-grams').textContent = grams + 'grams'
            recipeIngredients.append(clone)
        })

        recipeDetails.id = data.id
        recipeDetails.innerHTML = ''
        recipeDetails.append(title)
        recipeDetails.append(recipeIngredientsTitle)
        recipeDetails.append(recipeIngredients)
        recipeDetails.append(recipeDescriptionTitle)
        recipeDetails.append(recipeDescription)

        updateModal(recipeDetails);
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
    // console.log(`createRecipeObjectContainer: ${JSON.stringify(data, null, 4)}`)
    const container = document.createElement('div');
    container.classList.add("recipe-container");
    container.id = data.id;
    // container.dataset.recipe = JSON.stringify(data);
    container.addEventListener("click", showRecipeDetails(data), false);
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
    data.forEach(recipeData => {
        const cell = createRecipeObjectContainer(recipeData);
        // console.log(element)
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
    const title = document.forms['add-recipe-form'].title.value
    const description = document.forms['add-recipe-form'].description.value
    let ingredients = [[document.forms['add-recipe-form'].ingredient.value, parseFloat(document.forms['add-recipe-form'].grams.value).toFixed(2)]]
    // ingredients.append()
    console.log({ ingredients})
    // for (let i = 0; i < 10; i++) {
    //     let ingredientTitle = document.getElementById(`ingredientTitle${i}`).value
    //     console.log(`ingredientQuantity${i}`)
        
    //     if (ingredientTitle != "") {
    //         let ingredientQuantity = document.getElementById(`ingredientQuantity${i}`).value
    //         ingredients.push([ingredientTitle]);
    //         ingredients[i].push(parseFloat(ingredientQuantity).toFixed(2))
    //     } else {
    //         i = 10;
    //     }
    // }
    // console.log({ ingredients });
    
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

// Modal controls
const modalContent = modal.querySelector('#modal-content')

const showModal = () => modal.classList.add('modal-show')
const hideModal = () => modal.classList.remove('modal-show')
const clearModal = () => modalContent.innerHTML = '';

const updateModal = (updatedContentElement) => {
    hideModal()
    clearModal()
    modalContent.append(updatedContentElement)
    showModal()
}
const modalCloseButton = document.querySelector('#modal-close')
modalCloseButton.addEventListener('click', hideModal, false)

// Add recipe
const addRecipe = document.querySelector('#add-recipe')
const addRecipeForm = addRecipe.querySelector('#add-recipe-form');
const ingredientRowClone = addRecipeForm.querySelector('.ingredient-row').cloneNode(true)
const addIngredientButton = document.querySelector('#add-recipe-add-ingredient')
const addRecipeSubmitButton = document.querySelector('#add-recipe-form-submit')

const closeAddRecipeForm = () => {
    addRecipeForm.reset()
    clearModal()
}

const openRecipeModal = () => {
    updateModal(addRecipe)
    addRecipe.classList.add('add-recipe-show')
}

const addIngredientRow = () => {
    const newRow = ingredientRowClone.cloneNode(true)
    addRecipeForm.querySelector('.add-recipe-ingredients').prepend(newRow)
}

addRecipeButton.addEventListener('click', openRecipeModal, false)
modalCloseButton.addEventListener('click', closeAddRecipeForm, false)
addIngredientButton.addEventListener('click', addIngredientRow, false)
// TODO: seguir
addRecipeSubmitButton.addEventListener('click', postRecipe, false)

