import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

let planetData = [];
let scene, camera, renderer, controls, gui;
let textures, planets;
const Clock = new THREE.Clock();
// Handle window resize




window.addEventListener("resize", () => {
  if (!camera || !renderer) return; // Ensure camera and renderer are initialized
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// function to create rings for path and orbits of planets,or around planets
const createRings = (radius, space = 0.01) => {
  const ringGeometry = new THREE.RingGeometry(
    radius,
    radius + space,
    100,
    100,
    100
  );
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa,
    side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2; // Rotate to lie flat
  ring.position.y = 0.01; // Slightly above the plane of the planets
  return ring;
};


// function to create planet with their texture
const createPlanets = () => {
  planetData = [
    {
      name: "Sun",
      radius: 1,
      texture: textures.sun,
      position: { x: 0, y: 0, z: 0 },
      orbitRadius: 0,
      speed: {
        value: 0.0
      }
    },
    {
      name: "Mercury",
      radius: 0.1,
      texture: textures.mercury,
      position: { x: 1.5, y: 0, z: 0 },
      orbitRadius: 1.5,
      speed: {
        value: 0.2
      }
    },
    {
      name: "Venus",
      radius: 0.2,
      texture: textures.venus,
      position: { x: 2.5, y: 0, z: 0 },
      orbitRadius: 2.5,
      speed: {
        value: 0.3
      }
    },
    {
      name: "Earth",
      radius: 0.2,
      texture: textures.earth,
      position: { x: 3.5, y: 0, z: 0 },
      orbitRadius: 3.5,
      speed: {
        value: 0.4
      }
    },
    {
      name: "Mars",
      radius: 0.15,
      texture: textures.mars,
      position: { x: 4.5, y: 0, z: 0 },
      orbitRadius: 4.5,
      speed: {
        value: 0.5
      }
    },
    {
      name: "Jupiter",
      radius: 0.5,
      texture: textures.jupiter,
      position: { x: 6.5, y: 0, z: 0 },
      orbitRadius: 6.5,
      speed: {
        value: 0.7
      },
    },
    {
      name: "Saturn",
      radius: 0.4,
      texture: textures.saturn,
      position: { x: 8.5, y: 0, z: 0 },
      orbitRadius: 8.5,
      speed: {
        value: 0.8
      },
    },
    {
      name: "Uranus",
      radius: 0.3,
      texture: textures.uranus,
      position: { x: 10.5, y: 0, z: 0 },
      orbitRadius: 10.5,
      speed: {
        value: 0.9
      },
    },
    {
      name: "Neptune",
      radius: 0.3,
      texture: textures.neptune,
      position: { x: 12.5, y: 0, z: 0 },
      orbitRadius: 12.5,
      speed: {
        value: 0.95
      },
    },
  ];
  return planetData.map((data) => {
    //to add speed folder in gui

    addGuiFolder(data.name);

    const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
    const material =
      data.name === "Sun"
        ? new THREE.MeshBasicMaterial({ map: data.texture })
        : new THREE.MeshStandardMaterial({ map: data.texture });
    const planet = new THREE.Mesh(geometry, material);
    const ring = createRings(data.orbitRadius);
    scene.add(ring);
    if (data.name === "Saturn") {
      Array.from({ length: 7 }).forEach((_, i) => {
        const ring = createRings(0.04 * i + 0.4, 0.01);
        planet.add(ring);
      });
    }
    planet.name = data.name;
    if (data.name === "Earth") {
      const moonGeometry = new THREE.SphereGeometry(0.08, 32, 32);
      const moonMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("textures/moon.jpg"),
      });
      const moon = new THREE.Mesh(moonGeometry, moonMaterial);
      moon.position.set(0.3, -0.1, 0);

      planet.add(moon);
    }
    planet.position.set(data.position.x, data.position.y, data.position.z);
    return planet;
  });
};


// function to add  controls to gui for each planet
const addGuiFolder = (name) => {
  if (!gui.__folders[name]) {
    const folder = gui.addFolder(name);
    const currentPlanet = planetData.find((p) => p.name === name);
    folder.add(currentPlanet.speed, 'value', 0.0, 3.0, 0.003).name('Orbit Speed');
  }
};
const createUniverseMaterial=() => {
  const skyboxImagepaths = ['textures/sky/space_dn.png', 'textures/sky/space_up.png',  'textures/sky/space_bk.png', 'textures/sky/space_rt.png', 'textures/sky/space_lf.png','textures/sky/space.png'];
  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshStandardMaterial({ map: texture, side: THREE.BackSide });
  });
  return materialArray;
}

const setUniverseBox=()=> {
const materialArray = createUniverseMaterial();
let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
const skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);
}



// Info passages for each planet
const planetInfo = {
  Sun: "The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma.",
  Mercury: "Mercury is the closest planet to the Sun and the smallest in the Solar System.",
  Venus: "Venus is the second planet from the Sun and has a thick, toxic atmosphere.",
  Earth: "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
  Mars: "Mars is the fourth planet from the Sun and is often called the 'Red Planet'.",
  Jupiter: "Jupiter is the largest planet in the Solar System and is known for its Great Red Spot.",
  Saturn: "Saturn is the sixth planet from the Sun and is famous for its prominent ring system.",
  Uranus: "Uranus is the seventh planet from the Sun and has a unique sideways rotation.",
  Neptune: "Neptune is the eighth and farthest known planet from the Sun in the Solar System."
};

// Create a bottom-center info div
const planetInfoDiv = document.createElement('div');
planetInfoDiv.style.position = 'fixed';
planetInfoDiv.style.left = '50%';
planetInfoDiv.style.bottom = '32px';
planetInfoDiv.style.transform = 'translateX(-50%)';
planetInfoDiv.style.background = 'rgba(0,0,0,0.85)';
planetInfoDiv.style.color = '#fff';
planetInfoDiv.style.padding = '12px 24px';
planetInfoDiv.style.paddingBottom = '60px';
planetInfoDiv.style.borderRadius = '8px';
planetInfoDiv.style.fontFamily = 'Arial, sans-serif';
planetInfoDiv.style.fontSize = '16px';
planetInfoDiv.style.maxWidth = '350px';
planetInfoDiv.style.textAlign = 'center';
planetInfoDiv.style.zIndex = '1000';
planetInfoDiv.style.display = 'none';
planetInfoDiv.style.boxShadow = '0 2px 12px rgba(0,0,0,0.3)';
document.body.appendChild(planetInfoDiv);

let hoveredPlanet = null;
let mouse = new THREE.Vector2(1000,1000);
let raycaster = new THREE.Raycaster();

window.addEventListener('mousemove', (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
});

const showPlanetInfo=(planetName) =>{
  planetInfoDiv.innerHTML = `<b>${planetName}</b><br><span style='font-size:14px;'>${planetInfo[planetName] || ''}</span>`;
  planetInfoDiv.style.display = 'block';
}

const hidePlanetInfo=() => {
  planetInfoDiv.style.display = 'none';
}

// Animation control
let animationPaused = false;

// Create pause/start button
const animBtn = document.createElement('button');
animBtn.textContent = 'Pause Animation';
animBtn.style.position = 'fixed';
animBtn.style.right = '32px';
animBtn.style.bottom = '32px';
animBtn.style.zIndex = '1001';
animBtn.style.padding = '12px 24px';
animBtn.style.fontSize = '16px';
animBtn.style.background = '#222';
animBtn.style.color = '#fff';
animBtn.style.border = 'none';
animBtn.style.borderRadius = '8px';
animBtn.style.cursor = 'pointer';
animBtn.style.boxShadow = '0 2px 12px rgba(0,0,0,0.3)';
document.body.appendChild(animBtn);

animBtn.addEventListener('click', () => {
  animationPaused = !animationPaused;
  animBtn.textContent = animationPaused ? 'Start Animation' : 'Pause Animation';
  animate();
});

// init function to set up the scene, camera, renderer, and controls 
const init = () => {  
  scene = new THREE.Scene();
  
  // Initialize GUI
  if (window.dat) {
    gui = new dat.GUI({
      width: 300,
      closed: false
    });
  } else {
    console.error('dat.GUI not loaded');
  }

  // use a texture for the background for good performance
  
 

  // Add HDRI environment if you want and have good performing device
  // const rgbeLoader = new RGBELoader();
  // rgbeLoader.load('textures/universe.hdr', (texture) => {
  //     texture.mapping = THREE.EquirectangularReflectionMapping;
  //     scene.background = texture;
  
  // });
  setUniverseBox();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.fov = Math.atan(window.innerHeight/window.innerWidth)* (180/Math.PI)
  
  const canvas = document.querySelector("canvas");


  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const pointlight = new THREE.PointLight("#FFFFFF", 0.5, 1140.0); // Increased intensity
  pointlight.position.set(0, 0, 0);
  scene.add(pointlight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.maxDistance = 40;
  controls.minDistance = 2;
  controls.dampingFactor=0.06;

  // Load textures first
  textures = {
    sun: new THREE.TextureLoader().load("textures/sun.jpg"),
    mercury: new THREE.TextureLoader().load("textures/mercury.jpg"),
    venus: new THREE.TextureLoader().load("textures/venus.jpg"),
    earth: new THREE.TextureLoader().load("textures/earth.jpg"),
    mars: new THREE.TextureLoader().load("textures/mars.jpg"),
    jupiter: new THREE.TextureLoader().load("textures/jupiter.jpg"),
    saturn: new THREE.TextureLoader().load("textures/saturn.jpg"),
    uranus: new THREE.TextureLoader().load("textures/uranus.jpg"),
    neptune: new THREE.TextureLoader().load("textures/neptune.jpg"),
  };

  // Wait for all textures to load

  planets = createPlanets();
  planets.forEach((planet) => scene.add(planet));

  // Position camera further back to see planets
  camera.position.z = 15;

  
  animate();
};

const animate = () => {
  
  requestAnimationFrame(animate);
  if (!animationPaused) {
    
  planets.forEach((planet, index) => {
    planet.rotation.y += 0.01 + index * 0.001;
    planet.position.x = planetData[index].orbitRadius * Math.cos(Clock.getElapsedTime() * planetData[index].speed.value );
    planet.position.z = planetData[index].orbitRadius * Math.sin(Clock.getElapsedTime() * planetData[index].speed.value );
  });
}

  // Raycasting for hover
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets);
  if (intersects.length > 0) {
    const planet = intersects[0].object;
    if (hoveredPlanet !== planet) {
      hoveredPlanet = planet;
      showPlanetInfo(planet.name);
    }
  } else {
    hoveredPlanet = null;
    hidePlanetInfo();
  }

  renderer.render(scene, camera);
};

window.addEventListener('click', (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);
  const intersects = raycaster.intersectObjects(planets);
  if (intersects.length > 0) {
    const planet = intersects[0].object;
    focusCameraOnPlanet(planet);
  }
});

const focusCameraOnPlanet =(planet)=> {
 const PlanetPosition = new THREE.Vector3(planet.position.x, planet.position.y, planet.position.z);


gsap.to(camera.position, {
  x: PlanetPosition.x ,
  y: PlanetPosition.y + planet.geometry.parameters.radius +1.4,
  z: PlanetPosition.z,
  duration: 1.0,
  ease: "power2.inOut",
  onUpdate: () => {

    controls.target.copy(PlanetPosition);
    controls.update();
  }
});

}

init();
