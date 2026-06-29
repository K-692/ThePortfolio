# 🌌 Krishnendu Pal — Interactive Portfolio Website

A premium, highly interactive, and futuristic portfolio website designed to present the professional experience, academic achievements, research publications, and core AI engineering projects of Krishnendu Pal.

🔗 **Live URL**: [https://k-692.github.io/ThePortfolio/](https://k-692.github.io/ThePortfolio/)

---

## 🚀 Key Features

- **Futuristic & Cyberpunk Aesthetics**: A sleek dark mode layout built using curated neon cyan (`#00f0ff`) and deep violet (`#9d4edd`) glow effects, clean glassmorphic components, and dynamic typography ('Outfit' & 'Share Tech Mono').
- **Neural Network Canvas Background**: A responsive HTML5 Canvas particle/graph network that tracks and dynamically reacts to mouse movements.
- **Custom Cursor & Hover Glows**: Custom radial cursor glow follow-state and relative mouse-tracking glows built directly into project cards.
- **Modern Animations**: Micro-animations, responsive layout transitions, and page shrink behaviors that support native CSS scroll-driven animations with automatic fallback support.
- **Interchangeable Admin Console**: An interactive terminal-inspired tab display representing proficiency in Deep Learning, Cloud, Tools, and Web Development.
- **Comms Transmission Console**: A simulated sci-fi command terminal form for secure contact connections that interfaces with standard email protocols.

---

## 🛠️ Tech Stack & Architecture

- **Core**: Semantic HTML5 & Modern Vanilla JavaScript (ES6+, Canvas API, IntersectionObserver)
- **Styling**: Vanilla CSS3 (Custom variables, glassmorphic filters, responsive Grid & Flexbox, custom clip-paths)
- **CI/CD**: Automating build and hosting releases via GitHub Actions
- **Icons**: FontAwesome Web Fonts

---

## 💻 Local Development

Since this portfolio is built entirely using standard frontend technologies without heavy dependencies or node build processes, you can launch it instantly:

1. Clone this repository:
   ```bash
   git clone https://github.com/K-692/ThePortfolio.git
   ```
2. Double-click the `index.html` file to open it in your browser, or spin up a local server in the directory:
   ```bash
   python -m http.server 8000
   ```
3. Navigate to `http://localhost:8000` in your web browser.

---

## 🔧 Activation Steps (For 404 Resolution)

If you have just initialized this repository, ensure that GitHub Actions is selected as the deployment source:
1. Navigate to your repository settings page: `https://github.com/K-692/ThePortfolio/settings`.
2. Click **Pages** in the left sidebar menu.
3. Under **Build and deployment** > **Source**, switch the selector dropdown from *Deploy from a branch* to **GitHub Actions**.
4. Push a new commit, or trigger the workflow manually under the **Actions** tab to build and deploy your site.
