chrome.action.onClicked.addListener((tab) => {
  // Get the domain from the current tab URL
  const url = new URL(tab.url);
  const domain = url.hostname;

  // Delete the "cart" cookie for the current domain
  chrome.cookies.remove(
    {
      url: tab.url,
      name: "cart",
    },
    (cookie) => {
      if (cookie) {
        // Show notification or update badge to indicate success
        chrome.action.setBadgeText({ text: "✓" });
        chrome.action.setBadgeBackgroundColor({ color: "#4CAF50" });

        // Refresh the current page
        chrome.tabs.reload(tab.id);

        // Clear the badge after 2 seconds
        setTimeout(() => {
          chrome.action.setBadgeText({ text: "" });
        }, 2000);

        console.log("Cart cookie deleted successfully");
      } else {
        // Show notification or update badge to indicate failure or cookie not found
        chrome.action.setBadgeText({ text: "✗" });
        chrome.action.setBadgeBackgroundColor({ color: "#F44336" });

        // Clear the badge after 2 seconds
        setTimeout(() => {
          chrome.action.setBadgeText({ text: "" });
        }, 2000);

        console.log("Could not find 'cart' cookie or it was already deleted");
      }
    }
  );
});
