function goToHome() {
            window.location.href = "index.html"; // Change "index.html" to your home screen URL
        }

        function searchMeal() {
            // Perform the search operation here

            // Clear the search input after displaying the meal results
            document.getElementById("searchInput").value = "";
        }
const suggestionsList = ['beef', 'chicken', 'soup', 'burger', 'pizza', 'curry', 'biryani', 'pasta', 'rice', 'seafood', 'vegetables', 'sandwich', 'dessert', 'breakfast', 'appetizer', 'steak', 'sushi', 'tacos', 'noodles'];

async function searchMeal() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.meals) {
            displayResults(data.meals);
            hideSuggestions();
            hideErrorMessage();
            hideTrySuggestion();
            document.getElementById('searchInput').value = "";
        } else {
            displayErrorMessage();
            displaySuggestions();
            showTrySuggestion();
            clearPreviousResults();
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(meals) {
    const mealResults = document.getElementById('mealResults');
    mealResults.innerHTML = '';

    const mealCount = Math.min(meals.length, 5); // Show only the first 5 meals

    for (let i = 0; i < mealCount; i++) {
        const meal = meals[i];
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal');

        mealDiv.innerHTML = `
            <div>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div>
                <h3>${meal.strMeal}</h3>
                <p>Meal ID: ${meal.idMeal}</p>
                <p>Meal Title: ${meal.strMeal}</p>
                <p>Instructions: ${meal.strInstructions}</p>
            </div>
        `;
        mealResults.appendChild(mealDiv);
    }

    const showAllBtn = document.getElementById('showAllBtn');
    if (meals.length > 5) {
        showAllBtn.style.display = 'block';
        showAllBtn.onclick = () => showAllMeals(meals);
    } else {
        showAllBtn.style.display = 'none';
    }
}

function showAllMeals(meals) {
    const mealResults = document.getElementById('mealResults');
    mealResults.innerHTML = '';

    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal');

        mealDiv.innerHTML = `
            <div>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div>
                <h3>${meal.strMeal}</h3>
                <p>Meal ID: ${meal.idMeal}</p>
                <p>Meal Title: ${meal.strMeal}</p>
                <p>Instructions: ${meal.strInstructions}</p>
            </div>
        `;
        mealResults.appendChild(mealDiv);
    });

    document.getElementById('showAllBtn').style.display = 'none';
}

function displaySuggestions() {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    suggestionsList.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = suggestion;
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.onclick = () => {
            document.getElementById('searchInput').value = suggestion;
            searchMeal();
        };
        suggestions.appendChild(suggestionItem);
    });

    suggestions.style.display = 'block';
}

function hideSuggestions() {
    document.getElementById('suggestions').style.display = 'none';
}

function displayErrorMessage() {
    document.getElementById('errorMessage').style.display = 'block';
}

function hideErrorMessage() {
    document.getElementById('errorMessage').style.display = 'none';
}

function showTrySuggestion() {
    document.getElementById('trySuggestion').style.display = 'block';
}

function hideTrySuggestion() {
    document.getElementById('trySuggestion').style.display = 'none';
}

function clearPreviousResults() {
    document.getElementById('mealResults').innerHTML = '';
}
