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
        prompt: thoughts,
        max_tokens: 100 
    };

    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
    })
    .then(function(response) {
        return response.json();
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
