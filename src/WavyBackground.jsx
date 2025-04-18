import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const RealisticBubblesWithRocket = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1.5, 50);
    light.position.set(0, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Bubble Material
    const bubbleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transmission: 1,
      ior: 1.33,
    });

    // Create Bubbles
    const bubbles = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 0.5 + 0.3;
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const bubble = new THREE.Mesh(geometry, bubbleMaterial);

      bubble.position.set(
        (Math.random() - 0.5) * 10,
        Math.random() * -5 - 2,
        (Math.random() - 0.5) * 5
      );

      scene.add(bubble);
      bubbles.push({
        mesh: bubble,
        speed: Math.random() * 0.015 + 0.005,
      });
    }

    // Load Rocket
    let rocket = null;
    const loader = new GLTFLoader();
    loader.load(
      "https://threejs.org/examples/models/gltf/Rocket.glb",
      (gltf) => {
        rocket = gltf.scene;
        rocket.scale.set(0.5, 0.5, 0.5);
        rocket.position.set(0, -3, 0);
        scene.add(rocket);
      },
      undefined,
      (error) => console.error(error)
    );

    // Animation Loop
    let frameId;
    let rocketSpeed = 0.02;
    let tiltDirection = 1;

    const animate = () => {
      bubbles.forEach((bubble) => {
        bubble.mesh.position.y += bubble.speed;
        if (bubble.mesh.position.y > 5) {
          bubble.mesh.position.y = Math.random() * -5 - 2;
          bubble.mesh.position.x = (Math.random() - 0.5) * 10;
          bubble.mesh.position.z = (Math.random() - 0.5) * 5;
        }
      });

      if (rocket) {
        rocket.position.y += rocketSpeed;
        rocket.rotation.z += 0.002 * tiltDirection;
        if (rocket.rotation.z > 0.1 || rocket.rotation.z < -0.1) {
          tiltDirection *= -1;
        }

        if (rocket.position.y > 6) {
          rocket.position.y = -3;
        }
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);

      // Cleanup
      bubbles.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
        scene.remove(mesh);
      });

      if (rocket) scene.remove(rocket);
      renderer.dispose();

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "#000",
      }}
    />
  );
};

export default RealisticBubblesWithRocket;
