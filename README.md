# 🏕️ Cloud Nine Content - Interactive 3D Basecamp

An immersive, interactive 3D portfolio website built for a modern social media content agency. This project blends a **"Cozy-Tech"** aesthetic (low-poly retro visuals, pixel art filters) with **"San Fran Modern"** UI (clean typography, glassmorphism).

The website functions as an interactive diorama where the 3D scene serves as the navigation menu.

![Project Screenshot](https://i.imgur.com/YXMuuhA.png)
<!-- Replace the link above with a screenshot of your actual site later -->

## ✨ Features

*   **Interactive 3D Scene:** A procedural campfire basecamp featuring a custom-coded RV, logs, and vegetation.
*   **Retro Aesthetic:** Custom post-processing pipeline including **God Rays**, **Outline Selection**, and a **Pixelation Filter** for a PS1-style look.
*   **Procedural Assets:** Lightweight, code-generated 3D assets (`Camper.jsx`, `Log.jsx`, `Debris.jsx`) that load instantly.
*   **Interactive Guide:** Animated 3D character (`.glb`) that serves as the scene anchor.
*   **Glassmorphism UI:** A clean, frosted-glass overlay system for displaying agency content without leaving the immersion.
*   **Performance Optimized:** Built with React Three Fiber and Vite for fast loading and smooth 60fps rendering.

## 🛠️ Tech Stack

*   **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
*   **3D Engine:** [Three.js](https://threejs.org/)
*   **React Bindings:** [React Three Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber)
*   **Helpers:** [@react-three/drei](https://github.com/pmndrs/drei)
*   **Effects:** [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/agency-portfolio-3d.git
cd agency-portfolio-3d
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Local Server
```bash
npm run dev
```
Open `http://localhost:5173` to view the project.

## 📂 Project Structure

*   **`src/App.jsx`**: The main scene controller. Handles Lighting (Moon/Fire), Atmosphere (Fog), and Post-Processing Effects.
*   **`src/Basecamp.jsx`**: The interactive layer. Contains the clickable items (Guide, Compass, Backpack, Radio).
*   **`src/data.js`**: **EDIT THIS FILE** to change the text content (About Us, Services, Strategy, Contact).
*   **`src/Overlay.jsx`**: The 2D glass UI modal component.
*   **`src/Camper.jsx` / `Log.jsx` / `Debris.jsx`**: Custom procedural 3D models.
*   **`public/`**: Stores static assets like the `Guide.glb` character file.

## 🎨 Customization Guide

### Changing Content (Text)
To update the Agency Name, Services list, or "About Us" story, simply edit **`src/data.js`**.
*   *You do not need to touch the 3D code to change text.*

### Adjusting the Atmosphere
Go to **`src/App.jsx`** to tweak the visuals:
*   **Fog:** Adjust `fog color` or `near/far` distance args.
*   **God Rays:** Modify `exposure`, `density`, and `weight` inside the `<GodRays>` component.
*   **Moonlight:** Adjust the intensity of the `<SpotLight>`.

### Adding New Assets
1.  Place `.glb` files in the `public/` folder.
2.  Update `src/Basecamp.jsx` to include a new `<Prop />` referencing that file.
3.  Or, build new procedural components like `Camper.jsx` using Three.js primitives.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with 💻 code and 🔥 campfire vibes.*
