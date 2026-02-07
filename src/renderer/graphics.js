// ===============================
// Graphics Engine (Scene + World)
// ===============================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { PlayerMovement } from "../player/movement.js";
import { Shooting } from "../player/shooting.js";

export class Graphics {

    constructor() {
        this.clock = new THREE.Clock();

        this.initScene();
        this.createWorld();
        this.initPlayer();
    }

    // ===============================
    // SCENE
    // ===============================

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb);

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        // Lumières
        const sun = new THREE.DirectionalLight(0xffffff, 1.2);
        sun.position.set(10, 20, 10);
        this.scene.add(sun);

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));

        window.addEventListener("resize", () => this.onResize());
    }

    // ===============================
    // MAP
    // ===============================

    createWorld() {
        const floorGeo = new THREE.PlaneGeometry(200, 200);
        const floorMat = new THREE.MeshStandardMaterial({ color: 0x2e8b57 });

        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;

        this.scene.add(floor);
    }

    // ===============================
    // PLAYER
    // ===============================

    initPlayer() {
        const geo = new THREE.BoxGeometry(1, 2, 1);
        const mat = new THREE.MeshStandardMaterial({ color: 0x1e90ff });

        this.playerMesh = new THREE.Mesh(geo, mat);
        this.playerMesh.position.y = 1;

        this.scene.add(this.playerMesh);

        this.playerMovement = new PlayerMovement(this.camera, this.playerMesh);
        this.shooting = new Shooting(this.scene, this.camera);
    }

    // ===============================
    // LOOP
    // ===============================

    update(delta) {
        this.playerMovement.update(delta);
        this.shooting.update(delta);
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