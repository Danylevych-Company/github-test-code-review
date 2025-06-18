// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const contactForm = document.querySelector('.contact-form');
const themeToggle = document.getElementById('theme-toggle');
const progressBar = document.getElementById('progress-bar');
const backToTopBtn = document.getElementById('back-to-top');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for navigation links
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

// Active navigation link highlighting
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Contact Form Handler
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');    // Basic validation
  if (!name || !email || !message) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email', 'error');
    return;
  }

  // Simulate form submission
  const submitButton = this.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  setTimeout(() => {
    showNotification('Message sent successfully!', 'success');
    this.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  // Close button functionality
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();

  // Load skills data first
  await renderSkills();

  // Initialize skills interactivity
  initSkillsInteractivity();

  const animateElements = document.querySelectorAll('.project-card, .stat, .contact-form');

  animateElements.forEach(el => {
    el.classList.add('animate-prepare');
    observer.observe(el);
  });

  // Animate skill bars when skills section comes into view
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add delay to ensure skills are rendered
          setTimeout(() => {
            animateSkillBars();
          }, 500);
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillsSection);
  }
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
  }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.setProperty('--parallax-offset', `${rate}px`);
    hero.classList.add('parallax');
  }
});

// Skills animation on hover
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.classList.add('hover');
  });

  tag.addEventListener('mouseleave', function () {
    this.classList.remove('hover');
  });
});

// Project cards hover effect enhancement
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.classList.add('hover');
  });

  card.addEventListener('mouseleave', function () {
    this.classList.remove('hover');
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Add cursor follow effect for interactive elements
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) {
    const newCursor = document.createElement('div');
    newCursor.className = 'custom-cursor';
    document.body.appendChild(newCursor);
  }

  const cursorElement = document.querySelector('.custom-cursor');
  cursorElement.style.left = e.clientX - 10 + 'px';
  cursorElement.style.top = e.clientY - 10 + 'px';
  cursorElement.classList.add('visible');
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  const cursor = document.querySelector('.custom-cursor');
  if (cursor) {
    cursor.classList.remove('visible');
  }
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

// Progress Bar
function updateProgressBar() {
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  progressBar.style.width = Math.min(scrolled, 100) + '%';
}

// Back to Top Button
function updateBackToTopBtn() {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Skills Data Management
async function loadSkillsData() {
  try {
    const response = await fetch('./skills.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading skills data:', error);
    // Fallback data if JSON fails to load
    return {
      skillCategories: [
        {
          name: "Frontend",
          skills: [
            { name: "JavaScript", level: 95, description: "Advanced ES6+, async programming" },
            { name: "TypeScript", level: 90, description: "Strong typing, interfaces" },
            { name: "React", level: 88, description: "Hooks, Context API, Redux" }
          ]
        }
      ]
    };
  }
}

function getSkillLevel(level) {
  if (level >= 90) return { class: 'expert', label: 'Expert' };
  if (level >= 75) return { class: 'advanced', label: 'Advanced' };
  if (level >= 60) return { class: 'intermediate', label: 'Intermediate' };
  return { class: 'beginner', label: 'Beginner' };
}

function createSkillElement(skill) {
  const skillLevel = getSkillLevel(skill.level);

  return `
        <div class="skill-item">
            <div class="skill-tooltip">${skill.description}</div>
            <div class="skill-name-container">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level-badge skill-level-${skillLevel.class}">${skillLevel.label}</span>
            </div>
            <div class="skill-progress">
                <div class="skill-progress-bar" data-skill="${skill.level}"></div>
            </div>
        </div>
    `;
}

function createSkillCategoryElement(category) {
  const skillsHTML = category.skills.map(skill => createSkillElement(skill)).join('');

  return `
        <div class="skill-category" data-category="${category.name.toLowerCase()}">
            <h3>${category.name}</h3>
            <div class="skill-items">
                ${skillsHTML}
            </div>
        </div>
    `;
}

async function renderSkills() {
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) return;

  try {
    // Show loading state
    skillsContainer.innerHTML = `
            <div class="skills-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading skills...</p>
            </div>
        `;

    // Load data
    const skillsData = await loadSkillsData();

    // Render skills
    const skillsHTML = skillsData.skillCategories
      .map(category => createSkillCategoryElement(category))
      .join('');

    skillsContainer.innerHTML = skillsHTML;

    // Add data attributes for potential filtering/searching
    skillsContainer.setAttribute('data-last-updated', skillsData.lastUpdated || new Date().toISOString().split('T')[0]);

    // Re-observe new elements for animations
    const newAnimateElements = skillsContainer.querySelectorAll('.skill-category');
    newAnimateElements.forEach(el => {
      el.classList.add('animate-prepare');
      observer.observe(el);
    });

    console.log('✅ Skills loaded successfully from JSON');

  } catch (error) {
    console.error('❌ Error rendering skills:', error);
    skillsContainer.innerHTML = `
            <div class="skills-loading">
                <i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>
                <p>Failed to load skills. Please try refreshing the page.</p>
            </div>
        `;
  }
}

// Enhanced skill progress animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress-bar');

  skillBars.forEach((bar, index) => {
    const skillLevel = bar.getAttribute('data-skill');
    bar.style.setProperty('--skill-width', skillLevel + '%');

    // Add staggered animation delay
    setTimeout(() => {
      bar.classList.add('animate');
      bar.style.width = skillLevel + '%';
    }, index * 100 + 200);
  });
}

// Skills filtering functionality (bonus feature)
function filterSkills(searchTerm) {
  const skillCategories = document.querySelectorAll('.skill-category');

  skillCategories.forEach(category => {
    const skills = category.querySelectorAll('.skill-item');
    let hasVisibleSkills = false;

    skills.forEach(skill => {
      const skillName = skill.querySelector('.skill-name').textContent.toLowerCase();
      const isMatch = skillName.includes(searchTerm.toLowerCase());

      skill.style.display = isMatch ? 'block' : 'none';
      if (isMatch) hasVisibleSkills = true;
    });

    category.style.display = hasVisibleSkills ? 'block' : 'none';
  });
}

// Initialize search and refresh functionality
function initSkillsInteractivity() {
  const searchInput = document.getElementById('skills-search');
  const refreshBtn = document.getElementById('skills-refresh');

  // Search functionality
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        filterSkills(e.target.value);
      }, 300);
    });
  }

  // Refresh functionality
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      refreshBtn.classList.add('loading');
      await renderSkills();
      refreshBtn.classList.remove('loading');

      // Clear search if any
      if (searchInput) {
        searchInput.value = '';
      }
    });
  }
}

// Event Listeners
themeToggle?.addEventListener('click', toggleTheme);
backToTopBtn?.addEventListener('click', scrollToTop);

// Enhanced scroll listener
window.addEventListener('scroll', () => {
  updateProgressBar();
  updateBackToTopBtn();

  // ...existing scroll code...
});

console.log('🚀 Profile website loaded successfully! Ready for GitHub Code Reviewer testing.');
