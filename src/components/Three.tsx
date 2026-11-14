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
    const clueModels: THREE.Object3D[] = [];

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
      { path: "/clue1.glb", position: new THREE.Vector3(-2.3, 0, 0), scale: 1.3 },
      { path: "/clue2.glb", position: new THREE.Vector3(2.3, 0, 0), scale: 1.3 },
    ].forEach(({ path, position, scale }) => {
      loader.load(
        path,
        (gltf: GLTF) => {
          const clueModel = gltf.scene;
          clueModel.position.copy(position);
          clueModel.rotation.x = Math.PI / 2;
          clueModel.scale.setScalar(scale);
          clueModels.push(clueModel);
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

      clueModels.forEach((clueModel) => {
        clueModel.rotation.y += 0.006;
        clueModel.rotation.x = Math.PI / 2;
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