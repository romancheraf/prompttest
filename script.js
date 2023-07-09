var generateButton = document.getElementById('generate-button');
var userInput = document.getElementById('user-input');
var outputContainer = document.getElementById('output-container');

generateButton.addEventListener('click', function() {
    var thoughts = userInput.value;

    var apiKey = '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'; 

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
    };

    var requestData = {
        model: 'text-davinci-003',
        prompt: thoughts,
        max_tokens: 50 
    };

    fetch('https://api.openai.com/v1/completions', {
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
        var generatedPrompts = data.choices.map(function(choice) {
            return choice.text.trim();
        });

        outputContainer.innerHTML = generatedPrompts.join('<br>');
    })
    .catch(function(error) {
        console.error('Error:', error);
        outputContainer.innerHTML = 'An error occurred. Please try again.';
    });
});
