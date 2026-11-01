
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Supabase connection
const config = window.DIGITALNEP_CONFIG;

const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_KEY
);

const whatsappNumber = "9779709486638";

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Load products from Supabase
async function loadProducts() {
  const productGrid = document.getElementById("productGrid");
  const productCount = document.getElementById("productCount");

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    productGrid.innerHTML = "";

    productCount.textContent =
      String(products.length).padStart(2, "0") + " PRODUCTS";

    if (products.length === 0) {
      productGrid.textContent = "No products available right now.";
      return;
    }

    products.forEach(product => {
      const card = document.createElement("article");
      card.className = "product-card";

      const image = document.createElement("img");
      image.src = product.image_url || "images/canva.svg";
      image.alt = product.name;
      image.onerror = () => {
        image.src = "images/canva.svg";
      };

      const imageBox = document.createElement("div");
      imageBox.className = "product-image";
      imageBox.appendChild(image);

      const label = document.createElement("span");
      label.className = "product-label";
      label.textContent = "DIGITAL";
      imageBox.appendChild(label);

      const caption = document.createElement("span");
      caption.className = "image-caption";
      caption.textContent = "AVAILABLE NOW";
      imageBox.appendChild(caption);

      const info = document.createElement("div");
      info.className = "product-info";

      const category = document.createElement("div");
      category.className = "product-category";
      category.textContent = "DIGITAL SERVICE";

      const title = document.createElement("h3");
      title.textContent = product.name;

      const description = document.createElement("p");
      description.textContent =
        product.description || "Message us for more details.";

      const bottom = document.createElement("div");
      bottom.className = "product-bottom";

      const price = document.createElement("span");
      price.className = "price";
      price.textContent =
        "Rs. " + Number(product.price).toLocaleString("en-IN");

      const buyButton = document.createElement("button");
      buyButton.className = "buy-btn";
      buyButton.innerHTML = 'Purchase <span>↗</span>';

      buyButton.addEventListener("click", () => {
        const message =
          `Hi DigitalNep! I want to purchase ${product.name}. Price: Rs. ${product.price}. Please share payment and delivery details.`;

        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
          "_blank"
        );
      });

      bottom.append(price, buyButton);
      info.append(category, title, description, bottom);
      card.append(imageBox, info);

      productGrid.appendChild(card);
    });

  } catch (error) {
    console.error("Product loading error:", error);
    productGrid.textContent =
      "Unable to load products. Please check your Supabase settings.";
  }
}

loadProducts();
