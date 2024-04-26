
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
        const mealCount = meals.length > 5 ? 5 : meals.length;

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
                    <p>${meal.strInstructions}</p>
                </div>
            `;
            mealResults.appendChild(mealDiv);
        }

        if (meals.length > 5) {
            document.getElementById('showAllBtn').style.display = 'block';
        } else {
            document.getElementById('showAllBtn').style.display = 'none';
        }
    }
}

async function showAllMeals() {
    const searchInput = document.getElementById('searchInput').value;
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayResults(data.meals);
        document.getElementById('showAllBtn').style.display = 'none';
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}