# Shopify Clear Cart

<p align="center">
  <img src="images/icon128.png" alt="Shopify Clear Cart Logo" width="128" height="128">
</p>

<p align="center">
  <b>Clear your Shopify shopping cart with a single click</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/platform-Chrome-brightgreen?style=flat-square" alt="Platform">
</p>

## 🛒 About

**Shopify Clear Cart** is a lightweight Chrome extension that deletes the "cart" cookie from any Shopify store and automatically refreshes the page. It provides a quick and easy way to clear your shopping cart with just one click.

## ✨ Features

- **One-Click Deletion** - Remove the "cart" cookie instantly with a single click on any Shopify store
- **Auto Refresh** - Page automatically refreshes after deletion so you can see changes immediately
- **Visual Confirmation** - Shows a checkmark when the cart is successfully cleared
- **Privacy Focused** - No data collection or tracking. Works completely offline with minimal permissions

## 📥 Installation

### Chrome Web Store

_Coming soon!_

### Manual Installation

1. **Download the extension**:

   - Download the [latest release](https://github.com/jovisjoseph/shopify-clear-cart/releases) (or click the download button on our [website](https://jovisjoseph.github.io/shopify-clear-cart/))

2. **Install in Chrome**:

   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top-right corner)
   - Drag and drop the `shopify-clear-cart.zip` file directly onto the Chrome extensions page
   - Chrome will install the extension automatically

3. **Pin the extension** (optional):
   - Click the puzzle piece icon in Chrome's toolbar
   - Find "Shopify Clear Cart" and click the pin icon to make it always visible

## 🚀 How to Use

1. **Navigate** to any Shopify store
2. **Click** the Shopify Clear Cart icon in your browser toolbar
3. **Wait** for the page to refresh (happens automatically)
4. **Verify** your cart is now empty!

## 📋 Technical Details

The extension works by:

1. Identifying the "cart" cookie on Shopify stores
2. Deleting this cookie when you click the extension icon
3. Refreshing the page automatically so the changes take effect immediately

## 🔒 Privacy

This extension:

- Does not collect or share any user data
- Operates completely offline
- Only requests minimal permissions needed to function (cookies and active tab)
- Does not track your browsing or shopping habits

## 🛠️ Development

### Project Structure

```
shopify-clear-cart/
├── manifest.json        # Extension manifest file
├── background.js        # Main extension logic
├── images/              # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── LICENSE              # License file
└── README.md            # This file
```

### Building from Source

1. Clone this repository
2. Make your desired changes to the code
3. Load the extension in Chrome using "Load unpacked" in developer mode

## 👥 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔗 Related Projects

- [CornerCart](https://apps.shopify.com/cornercart) - Our Shopify app for enhanced cart management

## 📞 Contact

Have questions or feedback? Open an issue on GitHub.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/jovisjoseph">Jovis Joseph</a>
</p>
