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

    let model: THREE.Object3D | undefined;
    const clueItems: Array<{
      model: THREE.Object3D;
      rotationDelta: { x: number; y: number; z: number };
    }> = [];

    loader.load(
      "/biomod_detective.glb",
      (gltf: GLTF) => {
        model = gltf.scene;
        scene.add(model);
        console.log("Model loaded successfully:", model);
      },
      undefined
    );

    [
      { path: "/clue1.glb", scale: 0.7, position: { x: 0, y: 2.5, z: 0 }, rotation: { x: Math.PI / 2, y: 0, z: 0 }, rotation_delta: { x: 0, y: 0.005, z: 0.01 } },
      { path: "/clue2.glb", scale: 0.7, position: { x: 0, y: 2.5, z: 0 }, rotation: { x: Math.PI / 2, y: 10, z: 20 }, rotation_delta: { x: 0, y: 0.005, z: 0.01 } },
      { path: "/clue1.glb", scale: 0.7, position: { x: 0, y: 2.5, z: 0 }, rotation: { x: Math.PI / 2, y: 20, z: 10 }, rotation_delta: { x: 0, y: 0.003, z: 0.012 } },
      { path: "/clue2.glb", scale: 0.7, position: { x: 0, y: 2.5, z: 0 }, rotation: { x: Math.PI / 2, y: 5, z: 15 }, rotation_delta: { x: 0, y: 0.003, z: 0.012 } },
    ].forEach(({ path, scale, position, rotation, rotation_delta }) => {
      loader.load(
        path,
        (gltf: GLTF) => {
          const clueModel = gltf.scene;
          clueModel.scale.setScalar(scale);
          clueModel.position.set(position.x, position.y, position.z);
          clueModel.rotation.set(rotation.x, rotation.y, rotation.z);
          clueItems.push({ model: clueModel, rotationDelta: rotation_delta });
          scene.add(clueModel);
          console.log("Clue model loaded successfully:", clueModel);
        },
        undefined
      );
    });

    // const geometry = new THREE.BoxGeometry(3, 2, 2);
    // const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    // const model = new THREE.Mesh(geometry, material);

    // loader.load("/Guitar.glb");

    camera.position.z = 10;
    camera.position.y = 2.2;
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

      clueItems.forEach(({ model: clueModel, rotationDelta }) => {
        clueModel.rotation.x += rotationDelta.x;
        clueModel.rotation.y += rotationDelta.y;
        clueModel.rotation.z += rotationDelta.z;
      });

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
        className={`h-1/2 md:h-full overflow-visible`}
      ></div>
    </div>
  );
}