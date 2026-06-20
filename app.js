/**
 * @the.pallustories - Interactive Application Logic
 * Implements catalog filtering, lightbox interactions, form handling, and layout scroll effects.
 */

// Product Dataset
const sareeProducts = {
  "saree-001": {
    title: "The Terracotta Zari Saree",
    category: "Pure Mulberry Silk",
    price: "$540",
    image: "assets/hero_saree.png",
    craftTime: "140 Hours",
    origin: "Varanasi, India",
    yarn: "2/80s Mulberry Silk",
    weave: "Kadwa Handloom",
    desc: "A glorious masterpiece handcrafted over 140 artisan-hours. Features a vibrant, warm terracotta-toned body made of premium high-twist mulberry silk, paired with a gorgeous zari-infused heritage gold pallu showing traditional geometric handloom grids."
  },
  "saree-002": {
    title: "The Royal Jamdani Cotton",
    category: "Indigo Weave",
    price: "$380",
    image: "assets/jamdani_cotton.png",
    craftTime: "180 Hours",
    origin: "West Bengal, India",
    yarn: "100s Fine Cotton",
    weave: "Daccai Jamdani",
    desc: "Immerse in the light, airy grace of fine handloom cotton. Dyed with deep natural indigo, this saree features delicate floral leaf hand-woven patterns. Made by master artisans using traditional supplementary weft techniques."
  },
  "saree-003": {
    title: "The Sage Forest Linen",
    category: "Belgian Flax Linen",
    price: "$290",
    image: "assets/linen_saree.png",
    craftTime: "90 Hours",
    origin: "Bhagalpur, India",
    yarn: "60s Count Organic Linen",
    weave: "Plain Loom with Zari Border",
    desc: "Crafted with pure organic flax fibers, this sage-green linen saree displays a gorgeous soft textured fall. Complete with a subtle, narrow silver zari border, it is ideal for modern, mindful, understated luxury."
  },
  "saree-004": {
    title: "The Crimson Shlok Saree",
    category: "Kanchipuram Style Silk",
    price: "$490",
    image: "assets/hero_saree.png",
    imageStyle: "filter: hue-rotate(340deg);",
    craftTime: "160 Hours",
    origin: "Tamil Nadu, India",
    yarn: "3-Ply Mulberry Silk",
    weave: "Kanjivaram Handloom",
    desc: "An opulent deep crimson saree featuring authentic gold thread detailing. The heavy body weight and solid zari pallu make this piece a magnificent heritage bridal choice that can be passed down as an heirloom."
  },
  "saree-005": {
    title: "The Neelambari Motif Saree",
    category: "Dhaka Handloom",
    price: "$420",
    image: "assets/jamdani_cotton.png",
    imageStyle: "filter: brightness(0.9) contrast(1.1);",
    craftTime: "220 Hours",
    origin: "Dhaka Region",
    yarn: "120s Superfine Cotton",
    weave: "Traditional Jamdani",
    desc: "A museum-worthy design featuring intricate geometric star motifs woven across a deep indigo night sky cotton field. This gossamer-thin fabric is incredibly light and represents the pinnacle of supplementary-weft handlooms."
  },
  "saree-006": {
    title: "The Meadow Mist Linen",
    category: "Loom Woven Flax",
    price: "$310",
    image: "assets/linen_saree.png",
    imageStyle: "filter: saturate(0.8) sepia(0.2);",
    craftTime: "110 Hours",
    origin: "Bhagalpur, India",
    yarn: "80s Organic Flax Linen",
    weave: "Interspersed Zari Loom",
    desc: "Reflecting the serene hues of morning dew on grass, this sage-infused linen saree integrates subtle gold and copper threads into the linen body. Breathable, durable, and highlighting natural irregular slub texture."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // --- Navigation & Scroll Interactions ---
  const header = document.getElementById("main-header");
  const menuToggle = document.getElementById("menu-toggle-btn");
  const navLinks = document.getElementById("primary-nav-links");
  const allNavItems = navLinks.querySelectorAll("a");

  // Sticky navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  // Close mobile menu on clicking links and set active state
  allNavItems.forEach(link => {
    link.addEventListener("click", (e) => {
      // Highlight active nav item
      allNavItems.forEach(item => item.classList.remove("active"));
      link.classList.add("active");

      // Close mobile drawer
      navLinks.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    });
  });


  // --- Catalog Filtering Logic ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active from all buttons
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      productCards.forEach(card => {
        const category = card.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          // Fade in/show
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1) translateY(0)";
          }, 50);
        } else {
          // Fade out/hide
          card.style.opacity = "0";
          card.style.transform = "scale(0.95) translateY(10px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });


  // --- Lightbox / Quick View Modal Logic ---
  const lightbox = document.getElementById("product-detail-lightbox");
  const closeLightboxBtn = document.getElementById("modal-close-btn");
  const modalImg = document.getElementById("modal-saree-img");
  const modalCategory = document.getElementById("modal-saree-category");
  const modalTitle = document.getElementById("modal-title");
  const modalPrice = document.getElementById("modal-price");
  const modalDesc = document.getElementById("modal-description");
  const modalCraft = document.getElementById("modal-craft-time");
  const modalOrigin = document.getElementById("modal-origin");
  const modalYarn = document.getElementById("modal-yarn");
  const modalWeave = document.getElementById("modal-weave");

  // Form elements in Modal
  const inquiryForm = document.getElementById("artisan-inquiry-form");
  const inquirySubmitBtn = document.getElementById("inquiry-submit-btn");
  const inquirySuccess = document.getElementById("inquiry-success-notification");

  // Open modal handler
  const openModal = (productId) => {
    const data = sareeProducts[productId];
    if (!data) return;

    // Reset Form & Success states
    inquiryForm.reset();
    inquiryForm.style.display = "block";
    inquirySuccess.style.display = "none";
    inquirySubmitBtn.disabled = false;
    inquirySubmitBtn.innerText = "Send Inquiry";

    // Populate Modal Content
    modalImg.src = data.image;
    modalImg.alt = data.title;
    if (data.imageStyle) {
      modalImg.style = data.imageStyle;
    } else {
      modalImg.removeAttribute("style");
    }

    modalCategory.innerText = data.category;
    modalTitle.innerText = data.title;
    modalPrice.innerText = data.price;
    modalDesc.innerText = data.desc;
    modalCraft.innerText = data.craftTime;
    modalOrigin.innerText = data.origin;
    modalYarn.innerText = data.yarn;
    modalWeave.innerText = data.weave;

    // Open Modal Visuals
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Disable scroll
  };

  // Close modal handler
  const closeModal = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable scroll
  };

  // Bind clicks on quick view buttons and detail links
  document.addEventListener("click", (e) => {
    const quickviewBtn = e.target.closest(".btn-quickview");
    const detailLink = e.target.closest(".product-detail-link");
    
    if (quickviewBtn) {
      e.preventDefault();
      const productId = quickviewBtn.getAttribute("data-product-id");
      openModal(productId);
    } else if (detailLink) {
      e.preventDefault();
      const productId = detailLink.getAttribute("data-product-id");
      openModal(productId);
    }
  });

  // Bind close buttons
  closeLightboxBtn.addEventListener("click", closeModal);

  // Close on clicking backdrop
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeModal();
    }
  });

  // Close on ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeModal();
    }
  });


  // --- Inquiry Form Submission Handling ---
  inquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Disable inputs and button
    inquirySubmitBtn.disabled = true;
    inquirySubmitBtn.innerText = "Submitting...";

    // Simulate Server Request (e.g. 1000ms delay)
    setTimeout(() => {
      // Fade out form and fade in success notification
      inquiryForm.style.transition = "opacity 0.3s ease";
      inquiryForm.style.opacity = "0";

      setTimeout(() => {
        inquiryForm.style.display = "none";
        inquiryForm.style.opacity = "1"; // Reset opacity for next open
        
        inquirySuccess.style.display = "block";
        inquirySuccess.style.opacity = "0";
        inquirySuccess.style.transition = "opacity 0.3s ease";
        
        // Trigger reflow
        inquirySuccess.offsetHeight;
        inquirySuccess.style.opacity = "1";
      }, 300);

      // Increment Bag/Curator inquiry count as an interactive visual cue
      const cartBadge = document.querySelector("#cart-trigger .badge");
      if (cartBadge) {
        let currentCount = parseInt(cartBadge.innerText) || 0;
        cartBadge.innerText = currentCount + 1;
        cartBadge.style.transform = "scale(1.3)";
        setTimeout(() => {
          cartBadge.style.transform = "scale(1)";
          cartBadge.style.transition = "transform 0.3s ease";
        }, 300);
      }
    }, 1000);
  });


  // --- Simple Newsletter Subscription Mock ---
  const newsletterForm = document.getElementById("footer-newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector(".newsletter-input");
      const subBtn = document.getElementById("newsletter-submit-btn");

      if (emailInput && emailInput.value) {
        subBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        subBtn.style.backgroundColor = "var(--color-sage)";
        subBtn.style.color = "white";
        emailInput.value = "";
        emailInput.disabled = true;
        emailInput.placeholder = "Subscription successful!";

        setTimeout(() => {
          emailInput.disabled = false;
          emailInput.placeholder = "Your Email Address";
          subBtn.innerHTML = '<i class="fa-solid fa-arrow-right-long"></i>';
          subBtn.style.backgroundColor = "";
          subBtn.style.color = "";
        }, 4000);
      }
    });
  }

  // --- Dynamic Search Trigger Alert (UX) ---
  const searchBtn = document.getElementById("search-trigger");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = prompt("What type of handloom are you looking for? (e.g. Silk, Jamdani, Linen)");
      if (query) {
        const filterLower = query.toLowerCase();
        let found = false;
        
        filterButtons.forEach(btn => {
          const filterVal = btn.getAttribute("data-filter");
          if (filterLower.includes(filterVal) || filterVal.includes(filterLower)) {
            btn.click();
            found = true;
          }
        });

        if (!found) {
          alert(`Searching for details on "${query}"... Under construction.`);
        }
      }
    });
  }

  // Wishlist Interaction (UX toggle)
  const wishlistBtn = document.getElementById("wishlist-trigger");
  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
      const heartIcon = wishlistBtn.querySelector("i");
      if (heartIcon.classList.contains("fa-regular")) {
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa-solid");
        heartIcon.style.color = "var(--color-terracotta)";
        alert("Atelier piece bookmarked to wishlist.");
      } else {
        heartIcon.classList.remove("fa-solid");
        heartIcon.classList.add("fa-regular");
        heartIcon.style.color = "";
      }
    });
  }
});
