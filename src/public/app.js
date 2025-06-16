// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.md\\:hidden');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <div class="flex justify-end mb-8">
            <button class="text-2xl text-gray-600" id="close-menu">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="flex flex-col space-y-4">
            <a href="#home" class="text-xl text-gray-800">Home</a>
            <a href="#about" class="text-xl text-gray-800">About</a>
            <a href="#menu" class="text-xl text-gray-800">Menu</a>
            <a href="#location" class="text-xl text-gray-800">Location</a>
            <a href="#contact" class="text-xl text-gray-800">Contact</a>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
    }

    const closeMenuButton = document.getElementById('close-menu');
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // Close mobile menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
});

// Menu functionality
const menuItems = [
    {
        name: "Classic Mala Hot Pot",
        description: "Our signature dish featuring a perfect blend of Sichuan peppercorns and chili peppers",
        price: 24.99,
        category: "Hot Pot",
        image_url: "https://raw.githubusercontent.com/Isaac-Cheong/Webpage-Project/refs/heads/main/src/images/Mala%20hotpot.png"
    },
    {
        name: "Spicy Beef Noodles",
        description: "Hand-pulled noodles with tender beef in our special mala broth",
        price: 16.99,
        category: "Noodles",
        image_url: "https://raw.githubusercontent.com/Isaac-Cheong/Webpage-Project/refs/heads/main/src/images/Mala%20Noodle.png"
    },
    {
        name: "Kung Pao Chicken",
        description: "Diced chicken with peanuts, vegetables, and dried chili peppers",
        price: 18.99,
        category: "Signature Dishes",
        image_url: "https://raw.githubusercontent.com/Isaac-Cheong/Webpage-Project/refs/heads/main/src/images/kung%20pao%20chicken.png"
    },
    {
        name: "Vegetable Spring Rolls",
        description: "Crispy rolls filled with fresh vegetables and served with sweet chili sauce",
        price: 8.99,
        category: "Appetizers",
        image_url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3"
    },
    {
        name: "Mapo Tofu",
        description: "Silken tofu in a spicy sauce with minced meat and Sichuan peppercorns",
        price: 15.99,
        category: "Vegetarian",
        image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3"
    },
    {
        name: "Yangzhou Fried Rice",
        description: "Classic fried rice with eggs, vegetables, and your choice of protein",
        price: 14.99,
        category: "Rice Dishes",
        image_url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3"
    }
];

let currentCategory = 'All';

function displayMenuItems() {
    const menuContainer = document.getElementById('menu-items');
    if (!menuContainer) return;

    const filteredItems = currentCategory === 'All' 
        ? menuItems 
        : menuItems.filter(item => item.category === currentCategory);

    menuContainer.innerHTML = filteredItems.map(item => `
        <div class="card hover-scale bg-white rounded-lg overflow-hidden shadow-lg">
            <div class="relative">
                <img src="${item.image_url}" alt="${item.name}" class="w-full h-48 object-cover" loading="lazy">
                <div class="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    $${item.price.toFixed(2)}
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <span class="text-white text-sm font-semibold">${item.category}</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${item.name}</h3>
                <p class="text-gray-600">${item.description}</p>
            </div>
        </div>
    `).join('');
}

function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    if (!categoryButtons.length) return;

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gray-900', 'text-white');
                btn.classList.add('bg-white', 'text-gray-900');
            });
            button.classList.add('active', 'bg-gray-900', 'text-white');
            button.classList.remove('bg-white', 'text-gray-900');

            // Update current category and display items
            currentCategory = button.textContent;
            displayMenuItems();
        });
    });
}

// Contact form handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Basic form validation
        if (!formValues.name || !formValues.email || !formValues.message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValues.email)) {
            alert('Please enter a valid email address');
            return;
        }

        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    
    if (!slides.length || !indicators.length || !prevButton || !nextButton) return;

    let currentSlide = 0;
    let slideInterval;

    // Initialize carousel
    function initCarousel() {
        slides[0].classList.add('active');
        indicators[0].classList.add('active');
        startSlideInterval();
    }

    // Show specific slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    // Next slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }

    // Previous slide
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev);
    }

    // Start automatic slideshow
    function startSlideInterval() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Reset interval when manually changing slides
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    // Event listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    // Initialize carousel
    initCarousel();

    // Cleanup on page unload
    window.addEventListener('unload', () => {
        if (slideInterval) clearInterval(slideInterval);
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems();
    setupCategoryFilters();
}); 