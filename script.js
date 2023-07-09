const fetch = require('node-fetch');
const API_KEY = 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;

async function generateMealPrepIdea(typeOfMeal, targetCalories, typeOfDiet, timeToPrep) {
  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: `I want a ${typeOfMeal} meal. My target calories are ${targetCalories} cal from this meal. My type of diet is ${typeOfDiet}. Time to prep is ${timeToPrep} minutes.` }
    ],
    temperature: 0.7
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify(requestData)
  });

  const data = await response.json();
  if (data.choices && data.choices.length > 0) {
    const generatedPrompt = data.choices[0].message.content;
    return generatedPrompt;
  } else {
    throw new Error('Failed to generate meal prep idea.');
  }
}

// Example usage
const typeOfMeal = "lunch";
const targetCalories = 700;
const typeOfDiet = "none";
const timeToPrep = 15;

generateMealPrepIdea(typeOfMeal, targetCalories, typeOfDiet, timeToPrep)
  .then(prompt => console.log(prompt))
  .catch(error => console.error(error));
