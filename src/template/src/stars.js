import * as THREE from 'three';

const config = {
  numberOfStars: Math.floor(0.07 * window.innerWidth),
  heightUsage: 0.25,
  twinkleSpeed: 0.01,
  twinkleCycleLength: 3,
  background: { color: 0x000000, opacity: 0 },
  starMaxSize: 4,
};

(function main() {
  handleLocalStorageActions();

  const { innerWidth: w, innerHeight: h } = window;
  const scene = new THREE.Scene();
  const positions = new Float32Array(getPositions());
  const geometry = starGeometry(positions);
  const material = starMaterial();
  const stars = new THREE.Points(geometry, material);
  const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  scene.add(stars);
  camera.position.z = 100;
  renderer.setSize(w, h * config.heightUsage);
  renderer.setClearColor(config.background.color, config.background.opacity);
  document.body.appendChild(renderer.domElement);

  handleResize(renderer, camera);

  function animate() {
    material.uniforms.uTime.value += config.twinkleSpeed;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
})();

function handleLocalStorageActions() {
  if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
    localStorage.clear();
  }

  if (!localStorage.getItem('positions')) {
    localStorage.setItem('positions', JSON.stringify(createPositions(config.numberOfStars)));
  }
}

function createPositions(n) {
  const A = new Array(n * 3);
  const { innerWidth: w, innerHeight: h } = window;

  for (let i = 0; i < n; i++) {
    A[i * 3] = (Math.random() - 0.5) * w;
    A[i * 3 + 1] = (Math.random() - 0.5) * h;
    A[i * 3 + 2] = (Math.random() - 0.5) * w;
  }

  return A;
}

function createTwinkleSpeeds(n) {
  const twinkleSpeeds = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    twinkleSpeeds[i] = Math.random();
  }

  return twinkleSpeeds;
}

function getPositions() {
  return JSON.parse(localStorage.getItem('positions'));
}

function starGeometry(positions) {
  const geometry = new THREE.BufferGeometry();
  const count = positions.length / 3;

  const sizes = new Float32Array(count);
  const opacities = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    sizes[i] = Math.random() * config.starMaxSize + 1;
    opacities[i] = Math.random() * 4;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
  geometry.setAttribute('aTwinkle', new THREE.BufferAttribute(createTwinkleSpeeds(count), 1));
  geometry.setAttribute(
    'aOffset',
    new THREE.BufferAttribute(createRandomStarPhases(count, config.numberOfStars / 10), 1)
  );

  return geometry;
}

function starMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      cycle: { value: config.twinkleCycleLength },
    },
    vertexShader: `
      attribute float aTwinkle;
      attribute float aSize;
      attribute float aOffset;
      attribute float aOpacity;

      uniform float uTime;
      uniform float cycle;

      varying float vTwinkle;
      varying float vOpacity;

      void main() {
        float t = mod(uTime * aTwinkle + aOffset, cycle);

        // short bright flash window
        float flash = smoothstep(0.0, 0.15, t) *
                      (1.0 - smoothstep(0.15, 0.3, t));

        vTwinkle = flash;
        vOpacity = aOpacity;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        gl_PointSize = aSize;
      }
    `,
    fragmentShader: `
      varying float vTwinkle;
      varying float vOpacity;

      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        float strength = 1.0 - smoothstep(0.35, 0.5, dist);

        float alpha = vOpacity * strength * (0.2 + vTwinkle);

        gl_FragColor = vec4(vec3(1.0), alpha);
      }
    `,
  });
}

function handleResize(renderer, camera) {
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight * config.heightUsage);
    camera.updateProjectionMatrix();
  });
}

// This avoids stars to twinkle together.
function createRandomStarPhases(n, max) {
  const pauses = new Float32Array(n);
  pauses.forEach((_el, i) => (pauses[i] = Math.random() * max + 1));
  return pauses;
}
