# Solar System 3D Visualization

A beautiful interactive 3D model of the Solar System built with [Three.js](https://threejs.org/). Explore the planets, view their orbits, and learn interesting facts about each planet. Includes smooth camera controls, animated orbits, and a pause/start feature.

## Features

- **3D Solar System**: Realistic rendering of the Sun and 8 planets, each with unique textures and orbits.
- **Planet Info**: Hover over a planet to see its name and a short description in a bottom-center info box.
- **Camera Focus**: Click any planet to smoothly zoom and center the camera on it.
- **Pause/Start Animation**: Use the button at the bottom right to pause or resume the planetary motion.
- **Responsive Controls**: Zoom, pan, and rotate the view with your mouse (OrbitControls).
- **Customizable**: Easily add more planets, change textures, or update planet info.

## Getting Started



### Installation & Running

1. **Clone or Download** this repository to your computer.
2. **Start the server** in the project directory:
   ```sh
   http-server .
   ```
4. **Open your browser** and go to `http://localhost:5500` (or the port acc to local server).



## Project Structure

```
index.html         # Main HTML file
index.js           # Main JavaScript (Three.js logic)
textures/          # Planet and skybox textures
  earth.jpg
  jupiter.jpg
  ...
  sky/
    space_bk.png
    ...
```

## Controls
- **Orbit**: Left mouse drag
- **Zoom**: Mouse wheel
- **Pan**: Right mouse drag
- **Pause/Start**: Button at bottom right
- **Focus on Planet**: Click any planet
- **Planet Info**: Hover over a planet

## Customization
- **Add/Edit Planets**: Update the `planetData` array in `index.js`.
- **Change Info Text**: Edit the `planetInfo` object in `index.js`.
- **Textures**: Replace or add images in the `textures/` folder.

## Dependencies
- [Three.js](https://threejs.org/) (via CDN or npm)
- [dat.GUI](https://github.com/dataarts/dat.gui) (for optional GUI controls)
- [GSAP](https://greensock.com/gsap/) (for smooth camera animation)

## License

This project is for educational and demonstration purposes. Textures are sourced from public domain or NASA imagery.

---

Enjoy exploring the Solar System! 🚀
