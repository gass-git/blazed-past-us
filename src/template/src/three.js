import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BufferAttribute,
  BufferGeometry,
  AdditiveBlending,
  Points,
  ShaderMaterial,
} from 'three';

let { innerWidth: width, innerHeight: height } = window;
const heightDivisor = 4;
const scene = new Scene();
const renderer = new WebGLRenderer();
const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);

const numberOfStars = 100;
const positions = new Array(numberOfStars * 3);

if (!localStorage.getItem('starsPos')) {
  for (let i = 0; i < numberOfStars; i++) {
    positions[i * 3] = (Math.random() - 0.5) * width;
    positions[i * 3 + 1] = (Math.random() - 0.5) * height;
    positions[i * 3 + 2] = (Math.random() - 0.5) * width;
  }

  localStorage.setItem('starsPos', JSON.stringify(positions));
}

const storedPositions = JSON.parse(localStorage.getItem('starsPos'));
const positionsArray = new Float32Array(storedPositions);

const geometry = new BufferGeometry();
geometry.setAttribute('position', new BufferAttribute(positionsArray, 3));

const twinkleSpeeds = new Float32Array(numberOfStars);

for (let i = 0; i < numberOfStars; i++) {
  twinkleSpeeds[i] = Math.random() * 2.0;
}

geometry.setAttribute('aTwinkle', new BufferAttribute(twinkleSpeeds, 1));

const material = new ShaderMaterial({
  transparent: true,
  blending: AdditiveBlending,
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

      gl_FragColor = vec4(vec3(1.0), strength * vTwinkle);
    }
  `,
});

const stars = new Points(geometry, material);
scene.add(stars);

camera.position.z = 100;
renderer.setSize(width, height / heightDivisor);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

window.addEventListener('load', (e) => {
  console.log('load');
});

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;

  renderer.setSize(width, height / heightDivisor);
  camera.updateProjectionMatrix();
});

function animate() {
  requestAnimationFrame(animate);
  material.uniforms.uTime.value += 0.05;
  renderer.render(scene, camera);
}

animate();
