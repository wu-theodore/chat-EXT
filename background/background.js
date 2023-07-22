
function runBackgroundProcess(selectedText) {
    // For demonstration purposes, let's simulate the process by setting a timeout.
    setTimeout(() => {
        return "Processed: " + selectedText;
    }, 3000); 
}
  
// Listen for the extension's message from the popup.
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "runBackgroundProcess") {
        const selectedText = message.selectedText

        const response = runBackgroundProcess(selectedText);
        // Send the result back to the popup script
        chrome.runtime.sendMessage({ action: "backgroundProcessCompleted", output: response });
    }
});
  