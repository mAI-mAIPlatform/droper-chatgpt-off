// ===============================
// Graphics Engine (Three.js)
// ===============================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";

export class Graphics {

    constructor() {
        this.initScene();
        this.createWorld();
    }

    initScene() {
        // Scène
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb);

        // Caméra FPS style Fortnite
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.camera.position.set(0, 3, 8);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        // Lumière
        const sun = new THREE.DirectionalLight(0xffffff, 1.2);
        sun.position.set(10, 20, 10);
        this.scene.add(sun);

        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambient);

        window.addEventListener("resize", () => this.onResize());
    }

    createWorld() {
        // Sol
        const floorGeo = new THREE.PlaneGeometry(200, 200);
        const floorMat = new THREE.MeshStandardMaterial({ color: 0x2e8b57 });
        const floor = new THREE.Mesh(floorGeo, floorMat);

        floor.rotation.x = -Math.PI / 2;
        this.scene.add(floor);

        // Cube test (futur joueur)
        const geo = new THREE.BoxGeometry(1, 2, 1);
        const mat = new THREE.MeshStandardMaterial({ color: 0x1e90ff });

        this.testPlayer = new THREE.Mesh(geo, mat);
        this.testPlayer.position.y = 1;

        this.scene.add(this.testPlayer);
    }

    update(delta) {
        // animation simple pour vérifier que ça tourne
        this.testPlayer.rotation.y += delta;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}