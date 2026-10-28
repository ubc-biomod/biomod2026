"use client";

import * as THREE from "three";
import { type GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect } from "react";

export default function Three() {
  useEffect(() => {
    const container = document.getElementById("three-container");
    if (!container) return;

    // Set renderer size to match container
    const getSize = () => ({
      width: container.clientWidth,
      height: container.clientHeight,
    });

    const { width, height } = getSize();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    container?.appendChild(renderer.domElement);

    const loader = new GLTFLoader();

    let model: THREE.Object3D | undefined; // Declare the variable to store the model

    loader.load(
      "/dubois_add_to_gmod.glb", // Path to the .glb file
      (gltf: GLTF) => {
        model = gltf.scene; // Assign the loaded scene to the `model` variable
        scene.add(model); // Add the model to the scene
        console.log("Model loaded successfully:", model);
      },
      undefined
    );

    // const geometry = new THREE.BoxGeometry(3, 2, 2);
    // const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    // const model = new THREE.Mesh(geometry, material);

    // loader.load("/Guitar.glb");

    camera.position.z = 10;
    camera.position.y = 3;
    camera.position.x = 0.8;
    // camera.up.set(0, -1, 0);

    const ambientLight = new THREE.AmbientLight(0xf5d4ff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(-0.5, 0.2, 1).normalize();
    scene.add(directionalLight);

    function animate() {
      requestAnimationFrame(animate);

      if (model) {
        model.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
    }

    animate();

    // window.addEventListener("resize", () => {
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    //   renderer.setSize(width, height);
    // });

    return () => {
      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className='h-[600px] lg:h-[60vh] overflow-visible w-full'>
      <div
        id="three-container"
        className={`h-full overflow-visible`}
      ></div>
    </div>
  );
}