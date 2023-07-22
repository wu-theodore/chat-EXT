
document.addEventListener("DOMContentLoaded", function () {
    // Get references to the option and the text box
    const textBox1 = document.getElementById("text-box1");
    const textBox2 = document.getElementById("text-box2");

    // Add click event listeners to each option button in the first row
    const firstRowOptions = document.querySelectorAll(".options")[0];
    firstRowOptions.addEventListener("click", function (event) {
        const clickedButton = event.target.closest(".option-button");
        if (!clickedButton) return;

        // Remove the "selected" class from all buttons in the first row
        firstRowOptions.querySelectorAll(".option-button").forEach((btn) => btn.classList.remove("selected"));
        // Add the "selected" class to the clicked button in the first row
        clickedButton.classList.add("selected");

        // Check if the "None/Manual" option was selected in the first row
        if (clickedButton.id === "none-manual") {
            // Show the text box if the "None/Manual" option is selected
            textBox1.style.display = "block";
        } else {
            // Hide the text box if any other option is selected in the first row
            textBox1.style.display = "none";
        }
    });

    // Add click event listeners to each option button in the second row
    const secondRowOptions = document.querySelectorAll(".options")[1];
    secondRowOptions.addEventListener("click", function (event) {
        const clickedButton = event.target.closest(".option-button");
        if (!clickedButton) return;

        // Remove the "selected" class from all buttons in the second row
        secondRowOptions.querySelectorAll(".option-button").forEach((btn) => btn.classList.remove("selected"));
        // Add the "selected" class to the clicked button in the second row
        clickedButton.classList.add("selected");

        // Check if the "Custom Prompt" option was selected in the first row
        if (clickedButton.id === "custom-prompt") {
            // Show the text box if the "None/Manual" option is selected
            textBox2.style.display = "block";
        } else {
            // Hide the text box if any other option is selected in the first row
            textBox2.style.display = "none";
        }
    });

    // Add a click event listener to the "Highlighted Text" option
    document.getElementById("highlighted-text").addEventListener("click", function () {
        // Get the currently highlighted text using window.getSelection()
        const selectedText = window.getSelection().toString();

        // Do something with the extracted text (e.g., store it in a variable, display it, etc.)
        console.log("Highlighted Text:", selectedText);
    });

    // Get references to the "Generate Response" button and the output textbox
    const generateResponseBtn = document.getElementById("generate-response-btn");
    const responseOutput = document.getElementById("response-output");

    // Add a click event listener to the "Generate Response" button
    generateResponseBtn.addEventListener("click", function () {
        // Clear any previous output
        responseOutput.innerHTML = "Generating response...";

        let selectedText;
        const firstRowOptions = document.querySelectorAll(".options")[0];
        const selectedOption = firstRowOptions.querySelector(".selected");

        if (selectedOption) {
            // Check which option was selected and set the corresponding text
            if (selectedOption.id === "entire-webpage") {
                selectedText = "Text from the entire webpage.";
            } else if (selectedOption.id === "highlighted-text") {
                selectedText = "Text from the highlighted portion.";
            } else if (selectedOption.id === "none-manual") {
                // Get the text from the manual-text input if "None/Manual" option is selected
                const manualTextInput = document.getElementById("manual-text");
                selectedText = manualTextInput.value;
            }
        }

        // Send a message to the background script to run the background process
        chrome.runtime.sendMessage({ action: "runBackgroundProcess", selectedText: selectedText });
    });

    // Listen for the background process completion message from background.js
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action === "runBackgroundCompleted") {
            // Set the output value to the received background process output
            responseOutput.innerHTML = message.output;
        }
    });
});
  
