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
        'digital': 'https://via.placeholder.com/400x500?text=Azure+Bloom+Digital',
        'framed': 'https://via.placeholder.com/400x500?text=Azure+Bloom+Framed'
    },
    'linen-blue': {
        'digital': 'https://via.placeholder.com/400x500?text=Linen+Blue+Digital',
        'framed': 'https://via.placeholder.com/400x500?text=Linen+Blue+Framed'
    },
    'rose-essence': {
        'digital': 'https://via.placeholder.com/400x500?text=Rose+Essence+Digital',
        'framed': 'https://via.placeholder.com/400x500?text=Rose+Essence+Framed'
    },
    'linen-pink': {
        'digital': 'https://via.placeholder.com/400x500?text=Linen+Pink+Digital',
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