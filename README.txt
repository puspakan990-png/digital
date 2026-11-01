# DigitalNep website

A responsive, static HTML/CSS/JavaScript storefront.

## Preview locally
1. Extract the ZIP.
2. Open the `DigitalNep` folder.
3. Double-click `index.html` (or use VS Code Live Server).

## Publish on Netlify
1. Open Netlify and choose **Add new site** > **Deploy manually**.
2. Drag the extracted `DigitalNep` folder into the deploy area.
   Alternatively, upload these files to a GitHub repository and connect that repository to Netlify.

## Change products and details
- Edit product names, descriptions, prices and cards in `index.html`. Current prices: Minecraft Android Rs. 200, Minecraft iOS Rs. 200, Canva Rs. 299/month.
- Edit the WhatsApp number in `script.js` (`whatsappNumber`).
- Replace `images/minecraft.svg` and `images/canva.svg` with your own product images, keeping the same filenames, or update the image paths in `index.html`.
- Update the contact WhatsApp link in `index.html` if you change the number.

The current Purchase buttons open WhatsApp at +977 9709486638 with a product-specific message. Prices are shown as “Ask for price” until you set your actual prices.
