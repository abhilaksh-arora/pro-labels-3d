import * as THREE from "https://unpkg.com/three@0.143.0/build/three.module.js";
import { GLTFLoader } from "./public/GLTFLoader";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

console.log(dat);

const gui = new dat.GUI();
const world = {
  plane: { innerWidth: 500, innerHeight: 500 },
};
gui.add(world.plane, "innerWidth", 1, 500);
gui.add(world.plane, "innerHeight", 1, 500);

// function generatePlane() {
//   planeMesh.geometry.dispose();
//   planeMesh.geometry = new THREE.PlaneGeometry(
//     world.plane.width,
//     world.plane.height,
//     world.plane.widthSegments,
//     world.plane.heightSegments
//   );
// }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
var obj;
console.log(loader);

loader.load(
  "./public/scene.gltf",
  function (gltf) {
    obj = gltf.scene;
    console.log(obj);
    scene.add(gltf.scene);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.error(error);
  }
);
//console.log(obj);
//console.log(loader);

scene.background = new THREE.Color(0x000000);

const frontLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
scene.add(frontLight);

camera.position.set(0, 0, 0.4);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
