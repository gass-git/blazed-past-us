import * as THREE from 'three';

init(window);

let { innerWidth: w, innerHeight: h } = window;
const scene = new THREE.Scene();
const positions = new Float32Array(getPositions());
const [geometry, material] = [starGeometry(), starMaterial()];
const stars = new THREE.Points(geometry, material);
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

scene.add(stars);
camera.position.z = 100;

renderer.setSize(w, h / 4);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

handleResize();
animate();
// clearLocalStorageOnReload(); <-- bug

function init({ innerHeight: h, innerWidth: w }) {
  if (!localStorage.getItem('positions')) {
    localStorage.setItem('positions', JSON.stringify(createPositions(100, h, w)));
  }
}

function createPositions(n, h, w) {
  const A = new Array(n * 3);

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

function starGeometry() {
  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute(
    'aTwinkle',
    new THREE.BufferAttribute(createTwinkleSpeeds(positions.length / 3), 1)
  );

  return geometry;
}

function starMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
    attribute float aTwinkle;
    uniform float uTime;

    varying float vTwinkle;

    void main() {
      vTwinkle = sin(uTime * aTwinkle) * 0.5 + 0.5;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = 3.5;
    }
  `,
    fragmentShader: `
    varying float vTwinkle;

    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      float strength = 1.0 - smoothstep(0.4, 0.5, dist);

      float alpha = mix(0.1, 1.0, strength * vTwinkle);
      gl_FragColor = vec4(vec3(1.0), alpha);
    }
  `,
  });
}

function handleResize() {
  window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;
    console.log(w);

    renderer.setSize(w, h / 4);
    camera.updateProjectionMatrix();
  });
}

function animate() {
  requestAnimationFrame(animate);
  material.uniforms.uTime.value += 0.05;
  renderer.render(scene, camera);
}

function clearLocalStorageOnReload() {
  if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
    localStorage.clear();
    console.log('reload');
  }
}
