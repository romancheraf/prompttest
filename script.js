const generateMealPrepIdea = async () => {
  // Get user inputs
  const mealType = document.getElementById('meal-type').value;
  const targetCalories = document.getElementById('target-calories').value;
  const dietType = document.getElementById('diet-type').value;
  const prepTime = document.getElementById('prep-time').value;

  // Generate prompt based on user inputs
  const prompt = `I want a [${mealType}] meal. My target Calories are [${targetCalories} cal] from this meal. My type of diet is [${dietType}]. Time to prep is [${prepTime} minutes].`;

  // Set up OpenAI API configuration
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/completions';

  // Set up request data
  const requestData = {
    prompt,
    max_tokens: 100,
  };

  // Make API request to OpenAI
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestData)
  });

  if (response.ok) {
    const data = await response.json();
    const mealPrepIdea = data.choices[0].text.trim();

    // Display the generated meal prep idea
    console.log('Generated Meal Prep Idea:');
    console.log(mealPrepIdea);
  } else {
    console.error('Failed to generate meal prep idea.');
  }
};

// Event listener for the generate button
const generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', generateMealPrepIdea);
