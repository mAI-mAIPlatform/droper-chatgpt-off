// ==================================================
// GRAPHICS ENGINE (FULL GAME CORE)
// Player + Bots + Shooting + Physics + HUD + Score
// ==================================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";

import { PlayerMovement } from "../player/movement.js";
import { Shooting } from "../player/shooting.js";
import { BotManager } from "../bots/botManager.js";

import { Gravity } from "../engine/physics/gravity.js";
import { PlayerHealth } from "../ui/playerHealth.js";
import { HUD } from "../ui/hud.js";

import { ScoreManager } from "../engine/scoreManager.js";
import { PauseMenu } from "../ui/menuPause.js";

export class Graphics {

    constructor() {
        this.clock = new THREE.Clock();

        this.initScene();
        this.createWorld();
        this.initPlayer();
        this.initBots();
        this.initSystems();
    }

    // ================= SCENE =================

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

        const sun = new THREE.DirectionalLight(0xffffff, 1.2);
        sun.position.set(20, 40, 20);

        this.scene.add(sun);
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));

        window.addEventListener("resize", () => this.onResize());
    }

    // ================= MAP =================

    createWorld() {
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(300, 300),
            new THREE.MeshStandardMaterial({ color: 0x2e8b57 })
        );

        floor.rotation.x = -Math.PI / 2;
        this.scene.add(floor);
    }

    // ================= PLAYER =================

    initPlayer() {
        const geo = new THREE.BoxGeometry(1, 2, 1);
        const mat = new THREE.MeshStandardMaterial({ color: 0x1e90ff });

        this.playerMesh = new THREE.Mesh(geo, mat);
        this.playerMesh.position.y = 1;

        this.scene.add(this.playerMesh);

        this.playerMovement = new PlayerMovement(this.camera, this.playerMesh);
        this.gravity = new Gravity(this.playerMesh);

        this.shooting = new Shooting(this.scene, this.camera);

        this.playerHealth = new PlayerHealth(100);
    }

    // ================= BOTS =================

    initBots() {
        this.bots = new BotManager(this.scene, this.playerMesh);
    }

    // ================= SYSTEMS =================

    initSystems() {
        this.score = new ScoreManager();
        this.hud = new HUD(this.playerHealth, this.score);
        this.pauseMenu = new PauseMenu();
    }

    // ================= UPDATE =================

    update(delta) {

        if (this.pauseMenu.paused) return;

        this.playerMovement.update(delta);
        this.gravity.update(delta);
        this.shooting.update(delta);
        this.bots.update(delta);

        // collisions
        const kills = this.bots.checkHits(this.shooting.bullets.bullets);

        if (kills > 0) {
            this.score.add(kills);
        }

        this.hud.update();
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