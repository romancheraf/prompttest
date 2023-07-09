import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: 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,
});

const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

var generateButton = document.getElementById('generate-button');
var userInput = document.getElementById('user-input');
var outputContainer = document.getElementById('output-container');

generateButton.addEventListener('click', function() {
  var thoughts = userInput.value;

  var requestData = {
    model: 'text-davinci-003',
    prompt: thoughts,
    max_tokens: 50 
  };

  openai.complete(requestData)
    .then(function(response) {
      var generatedPrompts = response.choices.map(function(choice) {
        return choice.text.trim();
      });

      outputContainer.innerHTML = generatedPrompts.join('<br>');
    })
    .catch(function(error) {
      console.error('Error:', error);
      outputContainer.innerHTML = 'An error occurred. Please try again.';
    });
});
