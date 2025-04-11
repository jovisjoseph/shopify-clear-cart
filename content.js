(function () {
  // Check if this is a Shopify site by looking for cdn.shopify in the HTML
  function isShopifySite() {
    const htmlContent = document.documentElement.innerHTML;
    return htmlContent.includes("cdn.shopify");
  }

  // Create and inject the floating button
  function createFloatingButton() {
    // Create button element
    const button = document.createElement("div");
    button.id = "shopify-clear-cart-button";
    button.innerHTML = "\u00A0";

    // Get the icon URL from extension
    const iconUrl = chrome.runtime.getURL("images/icon48.png");

    // Style the button
    button.style.cssText = `
          position: fixed;
          top: 20px;
          left: 20px;
          width: 50px;
          height: 50px;
          min-height: 50px;
          border-radius: 50%;
          background-color: rgb(255, 207, 207);
          background-image: url('${iconUrl}');
          background-size: 30px;
          background-position: center;
          background-repeat: no-repeat;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          z-index: 9999;
          cursor: grab;
          transition: all 0.3s;
          touch-action: none;
        `;

    // Add hover effect
    button.onmouseover = function () {
      this.style.transform = "scale(1.1)";
    };

    button.onmouseout = function () {
      this.style.transform = "scale(1)";
    };

    // Variables to track dragging
    let isDragging = false;
    let dragStartX, dragStartY;
    let buttonStartX, buttonStartY;

    // Save button position to localStorage
    function savePosition(left, top) {
      const domain = window.location.hostname;
      localStorage.setItem(
        `shopifyClearCart_${domain}_position`,
        JSON.stringify({ left, top })
      );
    }

    // Load button position from localStorage
    function loadPosition() {
      const domain = window.location.hostname;
      const savedPosition = localStorage.getItem(
        `shopifyClearCart_${domain}_position`
      );
      if (savedPosition) {
        try {
          const { left, top } = JSON.parse(savedPosition);
          button.style.left = left + "px";
          button.style.top = top + "px";
        } catch (e) {
          console.error("Error loading saved position", e);
        }
      }
    }

    // Mousedown event for dragging
    button.addEventListener("mousedown", function (e) {
      // Only allow dragging with left mouse button
      if (e.button !== 0) return;

      // Prevent any default action
      e.preventDefault();

      // Indicate we're dragging
      isDragging = true;
      button.style.cursor = "grabbing";
      button.style.transition = "none"; // Disable transition during drag

      // Get starting positions
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      buttonStartX = parseInt(button.style.left) || 20;
      buttonStartY = parseInt(button.style.top) || 20;
    });

    // Document mousemove event for dragging
    document.addEventListener("mousemove", function (e) {
      if (!isDragging) return;

      // Calculate new position
      const newLeft = buttonStartX + (e.clientX - dragStartX);
      const newTop = buttonStartY + (e.clientY - dragStartY);

      // Update button position
      button.style.left = newLeft + "px";
      button.style.top = newTop + "px";
    });

    // Document mouseup event to end dragging
    document.addEventListener("mouseup", function () {
      if (!isDragging) return;

      // End dragging
      isDragging = false;
      button.style.cursor = "grab";
      button.style.transition = "all 0.3s"; // Re-enable transition

      // Save the final position
      savePosition(parseInt(button.style.left), parseInt(button.style.top));
    });

    // Touch events for mobile dragging
    button.addEventListener("touchstart", function (e) {
      e.preventDefault();

      isDragging = true;
      button.style.transition = "none";

      const touch = e.touches[0];
      dragStartX = touch.clientX;
      dragStartY = touch.clientY;
      buttonStartX = parseInt(button.style.left) || 20;
      buttonStartY = parseInt(button.style.top) || 20;
    });

    document.addEventListener("touchmove", function (e) {
      if (!isDragging) return;

      const touch = e.touches[0];
      const newLeft = buttonStartX + (touch.clientX - dragStartX);
      const newTop = buttonStartY + (touch.clientY - dragStartY);

      button.style.left = newLeft + "px";
      button.style.top = newTop + "px";
    });

    document.addEventListener("touchend", function () {
      if (!isDragging) return;

      isDragging = false;
      button.style.transition = "all 0.3s";

      savePosition(parseInt(button.style.left), parseInt(button.style.top));
    });

    // Add click listener (separate from drag)
    button.addEventListener("click", function (e) {
      // If we were dragging, don't trigger the click
      if (
        isDragging ||
        Math.abs(e.clientX - dragStartX) > 5 ||
        Math.abs(e.clientY - dragStartY) > 5
      ) {
        return;
      }

      // Send message to background script to clear the cart cookie
      chrome.runtime.sendMessage({ action: "clearCart" });

      // Visual feedback
      button.style.backgroundColor = "#FF4D4D";
      button.style.transform = "scale(0.9)";
      setTimeout(() => {
        button.style.backgroundColor = "rgb(255, 207, 207)";
        button.style.transform = "scale(1)";
      }, 150);
    });

    // Add button to page
    document.body.appendChild(button);

    // Load saved position
    loadPosition();
  }

  // Wait for the page to fully load
  if (document.readyState === "complete") {
    if (isShopifySite()) {
      createFloatingButton();
    }
  } else {
    window.addEventListener("load", function () {
      // Add a slight delay to ensure page is fully loaded
      setTimeout(() => {
        if (isShopifySite()) {
          createFloatingButton();
        }
      }, 1000);
    });
  }
})();
