import * as THREE from "https://unpkg.com/three@0.143.0/build/three.module.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

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

loader.load(
  "./scene.gltf",
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
    console.log("An error happened");
  }
);
//console.log(obj);
//console.log(loader);

scene.background = new THREE.Color(0xff00555);

const frontLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
scene.add(frontLight);

camera.position.set(0, 0, 0.4);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
