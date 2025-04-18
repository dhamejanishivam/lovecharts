// Mobile Navigation
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Carousel Logic
const carouselWrapper = document.getElementById('carousel-wrapper');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const carouselItems = document.querySelectorAll('.carousel-item');

let currentIndex = 0;
const totalItems = carouselItems.length;

function showSlide(index) {
    // Hide all slides
    carouselItems.forEach(item => item.classList.remove('active'));

    // Ensure index is within bounds
    if (index >= totalItems) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalItems - 1;
    } else {
        currentIndex = index;
    }

    // Show current slide
    carouselItems[currentIndex].classList.add('active');
}

// Initialize carousel
showSlide(currentIndex);

// Event listeners for carousel buttons
prevButton.addEventListener('click', () => {
    showSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
    showSlide(currentIndex + 1);
});

// Selector Section Logic
const selectorItems = document.querySelectorAll('.selector-item');
// const instructionSets = document.querySelectorAll('.instruction-set');

selectorItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all selector items
        selectorItems.forEach(item => item.classList.remove('active'));

        // Add active class to the clicked item
        item.classList.add('active');

        // Show the corresponding instructions
        const instructionId = item.getAttribute('data-instruction');

        // Hide all instruction sets
        document.querySelectorAll('.instruction-set').forEach(set => {
            set.classList.remove('active');
        });

        // Show the selected instruction set
        document.getElementById(`${instructionId}-instructions`).classList.add('active');
    });
});

// Product Details Logic
const themeButtons = document.querySelectorAll('#theme-selector .selector-btn');
const typeButtons = document.querySelectorAll('#type-selector .selector-btn');
const productImage = document.getElementById('product-image');
const productPrice = document.getElementById('product-price');

// Images for different themes (placeholder paths for now)
const productImages = {
    'azure-bloom': {
        'digital': 'assests/images/Theme1/1.png',
        'framed': 'https://via.placeholder.com/400x500?text=Azure+Bloom+Framed'
    },
    'linen-blue': {
        'digital': 'assests/images/Theme1/2.png',
        'framed': 'https://via.placeholder.com/400x500?text=Linen+Blue+Framed'
    },
    'rose-essence': {
        'digital': 'assests/images/Theme1/3.png',
        'framed': 'https://via.placeholder.com/400x500?text=Rose+Essence+Framed'
    },
    'linen-pink': {
        'digital': 'assests/images/Theme1/4.png',
        'framed': 'https://via.placeholder.com/400x500?text=Linen+Pink+Framed'
    }
};

// Prices for different product types
const prices = {
    'digital': '₹499',
    'framed': '₹1199'
};

// Function to update the product display
function updateProductDisplay() {
    const selectedTheme = document.querySelector('#theme-selector .selector-btn.active').getAttribute('data-theme');
    const selectedType = document.querySelector('#type-selector .selector-btn.active').getAttribute('data-type');

    // Update image
    productImage.src = productImages[selectedTheme][selectedType];

    // Update price
    productPrice.textContent = prices[selectedType];
}

// Add event listeners to theme buttons
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        themeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        updateProductDisplay();
    });
});

// Add event listeners to type buttons
typeButtons.forEach(button => {
    button.addEventListener('click', () => {
        typeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        updateProductDisplay();
    });
});

// Initialize product display
updateProductDisplay();



// Fixed instruction selector functionality
const platformOptions = document.querySelectorAll('.platform-selector .selector-option');
const deviceOptions = document.querySelectorAll('.device-selector .selector-option');
const instructionSets = document.querySelectorAll('.instruction-set');

function updateInstructions() {
    const activePlatform = document.querySelector('.platform-selector .selector-option.active').dataset.platform;
    const activeDevice = document.querySelector('.device-selector .selector-option.active').dataset.device;

    // Hide all instruction sets first
    instructionSets.forEach(set => {
        set.style.display = 'none';
        set.classList.remove('active');
    });

    // Show the active instruction set
    const activeSet = document.getElementById(`${activePlatform}-${activeDevice}`);
    if (activeSet) {
        activeSet.style.display = 'block';
        activeSet.classList.add('active');
    }
}

platformOptions.forEach(option => {
    option.addEventListener('click', () => {
        platformOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        updateInstructions();
    });
});

deviceOptions.forEach(option => {
    option.addEventListener('click', () => {
        deviceOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        updateInstructions();
    });
});

// Initialize with correct instructions
updateInstructions();







document.addEventListener('DOMContentLoaded', function() {
    // Add parallax layers to header
    const header = document.querySelector('header');
    const headerContent = header.innerHTML;
    header.innerHTML = `
        <div class="parallax-layer parallax-layer-1"></div>
        <div class="parallax-layer parallax-layer-2"></div>
        <div class="parallax-content">${headerContent}</div>
    `;
    
    // Initialize scroll animation
    const scrollRevealElements = document.querySelectorAll('.feature-card, .section h3, .carousel-item, .product-container, .instruction-set.active');
    scrollRevealElements.forEach(element => {
        element.classList.add('scroll-reveal');
    });
    
    // Handle scroll animations
    function handleScrollAnimations() {
        const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check for elements in viewport
    handleScrollAnimations();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Implement smooth scroll effect
    function smoothScrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Update function for buttons that use smooth scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo('chatInstruction1');
        });
    }
    
    // Implement 3D tilt effect for cards
    const tiltElements = document.querySelectorAll('.feature-card, .carousel-item img, .product-image img');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            if (window.innerWidth <= 768) return; // Only apply on desktop
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `perspective(1000px) rotateX(${-deltaY * 5}deg) rotateY(${deltaX * 5}deg)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        // Move parallax layers at different speeds
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        parallaxLayers.forEach((layer, index) => {
            const speed = (index + 1) * 0.2;
            layer.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Add subtle movement to other elements
        document.querySelectorAll('.feature-card, .carousel-item.active img').forEach((element, index) => {
            const speed = 0.03 + (index * 0.01);
            element.style.transform = `translateY(${scrolled * -speed}px)`;
        });
    });
});







// My own js code ________________________________________________________

function smoothScrollTo(id) {  // Changed function name
    const element = document.getElementById(id);
    if (element) {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    } else {
        console.error('Element not found:', id);
    }
}



// Override default scroll behavior
window.scrollTo = function(options) {
    if (typeof options === 'object') {
        window.scroll({
            top: options.top,
            left: options.left,
            behavior: 'smooth'
        });
    } else {
        window.scroll({
            top: options,
            left: arguments[1],
            behavior: 'smooth'
        });
    }
};

// Make all anchor links smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});




document.getElementById("fileInput").addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const base64Data = reader.result.split(",")[1]; // remove "data:*/*;base64," part

    fetch("https://script.google.com/macros/s/AKfycbyFKyVYWxmn-FVHAItfuDGo7n-cl0OCtf6TcGWTs-5x1kfQdZv9B5OBpvq4VWrQZyPt/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        file: base64Data,
        mimeType: file.type,
        fileName: file.name
      })
    })
    .then((res) => res.text())
    .then((resText) => {
      alert("✅ " + resText);
    })
    .catch((err) => {
      alert("❌ Upload failed: " + err);
    });
  };

  reader.readAsDataURL(file);
});
