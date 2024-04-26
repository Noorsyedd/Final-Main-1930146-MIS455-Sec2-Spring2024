async function searchMeal() {
    const searchInput = document.getElementById('searchInput').value;
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayResults(data.meals);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(meals) {
    const mealResults = document.getElementById('mealResults');
    mealResults.innerHTML = '';

    if (meals) {
        for (let i = 0; i < meals.length; i++) {
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
            showAllBtn.onclick = () => showAllMeals(meals.slice(5));
        } else {
            showAllBtn.style.display = 'none';
        }
    }
}

async function showAllMeals(restOfMeals) {
    const searchInput = document.getElementById('searchInput').value;
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const allMeals = restOfMeals ? restOfMeals.concat(data.meals) : data.meals;
        displayResults(allMeals);
        document.getElementById('showAllBtn').style.display = 'none';
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}