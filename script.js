const WHATSAPP = "918303085804";

const products = [
  { 
    name: "Long Cotton Chikankari Kurti", 
    price: 2499, 
    category: "Long", 
    fabric: "Cotton", 
    image: "images/long-cotton.jpg",
    description: "Pure cotton with intricate hand embroidery",
    badge: "Bestseller"
  },
  { 
    name: "Long Mulmul Chikankari Kurti", 
    price: 2499, 
    category: "Long", 
    fabric: "Mulmul", 
    image: "images/long-mulmul.jpg",
    description: "Soft mulmul fabric with delicate chikankari work",
    badge: "New"
  },
  { 
    name: "Short Modal Chikankari Kurti", 
    price: 1899, 
    category: "Short", 
    fabric: "Modal", 
    image: "images/short-modal.jpg",
    description: "Comfortable modal fabric with traditional embroidery",
    badge: "Sale"
  },
  // Add more products as needed
];

let activeCategory = "All";
let activeFabric = "All";

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Animate hamburger to X
      const spans = this.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.querySelectorAll('span')[0].style.transform = 'none';
        navToggle.querySelectorAll('span')[1].style.opacity = '1';
        navToggle.querySelectorAll('span')[2].style.transform = 'none';
      });
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll to top button functionality
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Initial render
  renderProducts();
});

function renderProducts() {
  const container = document.getElementById("products-container");
  const filteredProducts = products.filter(p => 
    (activeCategory === "All" || p.category === activeCategory) &&
    (activeFabric === "All" || p.fabric === activeFabric)
  );
  
  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="no-products">
        <h3>No products found</h3>
        <p>Try selecting different filters</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filteredProducts.map(p => {
    const msg = encodeURIComponent(`Hi, I'm interested in your "${p.name}" - ₹${p.price}`);
    return `
    <div class="card">
      <div class="card-img-container">
        ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <span class="fabric">${p.fabric}</span>
        <p class="description">${p.description || 'Traditional Lucknowi chikankari work'}</p>
        <p class="price">₹${p.price}</p>
        <a class="whatsapp-btn" href="https://wa.me/${WHATSAPP}?text=${msg}" target="_blank">
          <i class="fab fa-whatsapp"></i>
          Order on WhatsApp
        </a>
      </div>
    </div>
    `;
  }).join('');
}

function filterCategory(c, btn) {
  activeCategory = c;
  document.querySelectorAll(".filter-btn").forEach(x => x.classList.remove("active"));
  btn.classList.add("active");
  renderProducts();
  
  // Scroll to products section on mobile
  if (window.innerWidth < 768) {
    document.getElementById('products-container').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function filterFabric(f, btn) {
  activeFabric = f;
  document.querySelectorAll(".fabric-btn").forEach(x => x.classList.remove("active"));
  btn.classList.add("active");
  renderProducts();
}

// Optional: Add image loading error handling
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
      e.target.src = 'images/placeholder.jpg'; // Add a placeholder image
      e.target.alt = 'Image not available';
    }
  }, true);
});