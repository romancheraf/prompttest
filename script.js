const API_KEY = "YOUR_OPENAI_API_KEY";

var generateButton = document.getElementById('generate-button');
var mealTypeInput = document.getElementById('meal-type');
var targetCaloriesInput = document.getElementById('target-calories');
var dietTypeInput = document.getElementById('diet-type');
var prepTimeInput = document.getElementById('prep-time');
var outputContainer = document.getElementById('output-container');

generateButton.addEventListener('click', function() {
    var mealType = mealTypeInput.value;
    var targetCalories = targetCaloriesInput.value;
    var dietType = dietTypeInput.value;
    var prepTime = prepTimeInput.value;

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
    };

    var prompt = "I want a [" + mealType + "] meal. My target Calories are [" + targetCalories + " cal] from this meal. My type of diet is [" + dietType + "]. Time to prep is [" + prepTime + " minutes].";

    var requestData = {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100 
    };

    fetch('https://api.openai.com/v1/text-davinci-003/completions', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not OK');
        }
    })
    .then(function(data) {
        var mealPrepIdea = data.choices[0].text.trim();

        outputContainer.innerHTML = '<h2>Generated Meal Prep Idea:</h2><p>' + mealPrepIdea + '</p>';
    })
    .catch(function(error) {
        console.error('Error:', error);
        outputContainer.innerHTML = 'An error occurred. Please try again.';
    });
});
