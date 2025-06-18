# Danylo Levych Profile Website

This is a modern responsive profile website created for testing GitHub Code Reviewer. The website showcases development skills and experience in creating web applications.

## 🚀 Features

- **Modern Design**: Minimalist and professional design with gradients and animations
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive**: Smooth animations, hover effects, and dynamic content
- **Fast**: Optimized images and CSS for quick loading
- **Accessibility**: Semantic HTML structure and screen reader accessibility

## 🛠️ Technologies

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, animations, custom properties
- **JavaScript (ES6+)**: Modern JavaScript with ES6+ features
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Inter)
- **Unsplash**: High-quality images

## 📁 Project Structure

```
github-test-code-review/
├── index.html          # Main HTML page
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🎨 Website Sections

1. **Navigation**: Fixed navigation bar with smooth scrolling
2. **Hero Section**: Introduction section with animation and CTA buttons
3. **About Me**: Information about experience and statistics
4. **Skills**: Technical skills divided by categories
5. **Projects**: Portfolio with recent projects
6. **Contact**: Contact form and contact information

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/danylevych/github-test-code-review.git
```

2. Navigate to the project folder:
```bash
cd github-test-code-review
```

3. Open `index.html` in browser or run a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if http-server is installed)
npx http-server

# Using PHP
php -S localhost:8000
```

4. Go to `http://localhost:8000`

## 🎯 Project Goal

This website was created specifically for testing GitHub Code Reviewer - a tool for automatic code quality analysis. The project includes:

- Different types of code (HTML, CSS, JavaScript)
- Modern web development practices
- Potential areas for code improvement
- Demonstration of different architectural approaches

## 📱 Responsiveness

The website is optimized for:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile devices**: up to 767px

## ⚡ Performance Optimization

- Minimized resources
- Optimized images
- Efficient use of CSS Grid and Flexbox
- Lazy loading for images
- Asynchronous script loading

## 🎨 Design System

### Colors
- **Primary**: #2563eb (blue)
- **Secondary**: #64748b (gray)
- **Accent**: #f59e0b (orange)
- **Background**: #ffffff (white)
- **Surface**: #f8fafc (light gray)

### Typography
- **Main font**: Inter (Google Fonts)
- **Sizes**: from 0.8rem to 3.5rem
- **Weights**: 300, 400, 500, 600, 700

## 🔧 Extension and Customization

### Adding new projects
Edit the `.projects-grid` section in `index.html` and add a new `.project-card`.

### Changing color scheme
Modify CSS variables in the `:root` selector in `styles.css`.

### Adding new sections
1. Add HTML section
2. Add corresponding styles in CSS
3. Update navigation

## 🎯 Dynamic Skills System

The website now features a dynamic skills management system that loads data from JSON instead of hardcoded HTML.

### Features:
- **📁 JSON-based data**: Skills are stored in `skills.json` for easy maintenance
- **🔍 Search functionality**: Filter skills by name in real-time
- **🔄 Refresh capability**: Reload skills data without page refresh
- **📊 Skill levels**: Automatic categorization (Expert, Advanced, Intermediate, Beginner)
- **💡 Tooltips**: Hover over skills to see detailed descriptions
- **⚡ Progressive loading**: Loading states and error handling
- **🎨 Enhanced animations**: Staggered progress bar animations

### Skills Management:

#### Using the Web Interface:
- **Search**: Use the search box to filter skills by name
- **Refresh**: Click the refresh button to reload data from JSON

#### Using the Command Line Tool:
```bash
# List all skills
node skills-manager.js list

# Add a new skill
node skills-manager.js add "Docker" 85 "DevOps & Tools" "Container orchestration"

# Update existing skill
node skills-manager.js update "JavaScript" 98 "Advanced ES6+, frameworks"

# Remove a skill
node skills-manager.js remove "Old Framework"

# Show help
node skills-manager.js help
```

#### Direct JSON Editing:
Edit `skills.json` directly to:
- Add new skill categories
- Modify skill levels and descriptions
- Update the last modified date

### JSON Structure:
```json
{
  "skillCategories": [
    {
      "name": "Frontend",
      "skills": [
        {
          "name": "JavaScript",
          "level": 95,
          "description": "Advanced ES6+, async programming, frameworks"
        }
      ]
    }
  ],
  "lastUpdated": "2025-06-12"
}
```

## 📞 Contact

- **Email**: danylo.levych@example.com
- **LinkedIn**: [linkedin.com/in/danylolevych](https://linkedin.com/in/danylolevych)
- **GitHub**: [github.com/danylevych](https://github.com/danylevych)

## 📄 License

This project was created for educational and testing purposes. Feel free to use the code for learning and development.

---

**Note**: This website was created specifically for testing GitHub Code Reviewer and demonstrating automated code analysis capabilities. All data is for testing purposes.
# github-test-code-review
