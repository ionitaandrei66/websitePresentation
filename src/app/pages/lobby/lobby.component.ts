import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {ImageService} from "./test.service";
// import starsTexture from '../../../assets/img/stars.jpg';
// import sunTexture from '../../../assets/img/sun.jpg';
// import mercuryTexture from '../../../assets/img/mercury.jpg';
// import venusTexture from '../../../assets/img/venus.jpg';
// import earthTexture from '../../../assets/img/earth.jpg';
// import marsTexture from '../../../assets/img/mars.jpg';
// import jupiterTexture from '../../../assets/img/jupiter.jpg';
// import saturnTexture from '../../../assets/img/saturn.jpg';
// import saturnRingTexture from '../../../assets/img/saturn ring.png';
// import uranusTexture from '../../../assets/img/uranus.jpg';
// import uranusRingTexture from '../../../assets/img/uranus ring.png';
// import neptuneTexture from '../../../assets/img/neptune.jpg';
// import plutoTexture from '../../../assets/img/pluto.jpg';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent  implements OnInit{
    @ViewChild('threeCanvas', { static: true }) threeCanvas!: ElementRef<HTMLCanvasElement>;
    scene!: THREE.Scene;
    camera!: THREE.PerspectiveCamera;
    renderer!:THREE.WebGLRenderer;
    stars!: Array<any>;
    rayCaster!: THREE.Raycaster;
    mouse!: THREE.Vector2;
    orbit!: OrbitControls;
    sun!: THREE.Mesh;
    textureLoader = new THREE.TextureLoader();
    pluto!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };
    mars!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };
    neptune!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };


    constructor(private ngZone: NgZone,private imageService: ImageService) {
    }

     async initMars(){
        const dataUrl = await this.imageService.loadBinaryImage('assets/img/mars.jpg');
        const marsGeo = new THREE.SphereGeometry(15, 30, 30);
        const marsMat = new THREE.MeshBasicMaterial({
            map: this.textureLoader.load(dataUrl)
        });
        this.mars ={mesh:new THREE.Mesh(marsGeo, marsMat),angle: 1, orbitRadius: 437, orbitSpeed: 0.01};
        this.scene.add(this.mars.mesh);
    }

    async initNeptune(){
        const dataUrl = await this.imageService.loadBinaryImage('assets/img/neptune.jpg');
        const neptuneGeo = new THREE.SphereGeometry(4, 30, 30);
        const neptuneMat = new THREE.MeshBasicMaterial({
            map: this.textureLoader.load(dataUrl)
        });
        this.neptune ={mesh:new THREE.Mesh(neptuneGeo, neptuneMat),angle: -1, orbitRadius: 20, orbitSpeed: 0.01};
        this.scene.add(this.neptune.mesh);
    }

    async initPluto(){
        const dataUrl = await this.imageService.loadBinaryImage('assets/img/pluto.jpg');
        const plutoGeo = new THREE.SphereGeometry(7, 30, 30);
        const plutoMat = new THREE.MeshBasicMaterial({
            map: this.textureLoader.load(dataUrl)
        });
        this.pluto ={mesh:new THREE.Mesh(plutoGeo, plutoMat),angle: 0, orbitRadius: 300, orbitSpeed: 0.015};
        this.scene.add(this.pluto.mesh);
    }
    async createSun() {
        const dataUrl = await this.imageService.loadBinaryImage('assets/img/sun.jpg');
        const sunGeo = new THREE.SphereGeometry(70, 30, 30);
        const sunMat = new THREE.MeshBasicMaterial({
            map: this.textureLoader.load(dataUrl)
        });
        this.sun = new THREE.Mesh(sunGeo, sunMat);
        this.scene.add(this.sun);
    }

    initScene() {
        // scene
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
        this.camera.position.set(0,2,500);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.threeCanvas.nativeElement });
        this.renderer.setSize(window.innerWidth -50, window.innerHeight-50);
        // scene Close

        this.rayCaster= new THREE.Raycaster();
        this.mouse = new THREE.Vector2();


      //  this.stars = new Array(0);

       this.orbit = new OrbitControls(this.camera, this.renderer.domElement);

    }



  async  ngOnInit() {
        // Inițializează Three.js
         await this.initScene();
         await this.initPluto();
         await this.initNeptune();
         await this.initMars();
         await this.createSun();


       // Adding Starts
       // this.addingStars();


        const  axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);

        this.orbit.update();






        // Animare
        this.animate();
    }
     animate(){

         this.ngZone.runOutsideAngular(() => {
             requestAnimationFrame(() => this.animate());

             this.pluto.angle += this.pluto.orbitSpeed;
             this.mars.angle += this.mars.orbitSpeed;
             this.neptune.angle += this.neptune.orbitSpeed;

             const x = this.sun.position.x + this.pluto.orbitRadius * Math.cos(this.pluto.angle);
             const z = this.sun.position.z + this.pluto.orbitRadius * Math.sin(this.pluto.angle);
             const c = this.sun.position.x + this.mars.orbitRadius * Math.cos(this.mars.angle);
             const d = this.sun.position.z + this.mars.orbitRadius * Math.sin(this.mars.angle);
             const u = this.mars.mesh.position.x + this.neptune.orbitRadius * Math.cos(this.neptune.angle);
             const m = this.mars.mesh.position.z + this.neptune.orbitRadius * Math.sin(this.neptune.angle);

             this.pluto.mesh.position.set(x, 0, z);
             this.mars.mesh.position.set(c, 0, d);
             this.neptune.mesh.position.set(u, 0, m);


             this.sun.rotation.x += 0.02;
             this.sun.rotation.y += 0.03;

             this.neptune.mesh.rotation.x += 0.01;
             this.neptune.mesh.rotation.y += 0.01;
             this.mars.mesh.rotation.x += 0.01;
             this.mars.mesh.rotation.y += 0.01;
             this.pluto.mesh.rotation.x += 0.02;
             this.pluto.mesh.rotation.y += 0.05;

             this.renderer.render(this.scene, this.camera);
         });
     }
    ngOnDestroy(): void {
        this.ngZone.runOutsideAngular(() => {
            this.renderer.dispose();
        });
    }

    addingStars(){
        const geometrys = [new THREE.BufferGeometry(), new THREE.BufferGeometry()];
        geometrys[0].setAttribute(
            "position",
            new THREE.BufferAttribute(this.getRandomParticelPos(350), 3)
        );
        geometrys[1].setAttribute(
            "position",
            new THREE.BufferAttribute(this.getRandomParticelPos(1500), 3)
        );
        const loader = new THREE.TextureLoader();
        const materials = [
            new THREE.PointsMaterial({
                size: 0.05,
                map: loader.load("https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp1.png"),
                transparent: true
                // color: "#ff0000"
            }),
            new THREE.PointsMaterial({
                size: 0.075,
                map: loader.load("https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"),
                transparent: true
                // color: "#0000ff"
            })
        ];

        const starsT1 = new THREE.Points(geometrys[0], materials[0]);
        const starsT2 = new THREE.Points(geometrys[1], materials[1]);


        this.scene.add(starsT2);
        this.scene.add(starsT1);
    }


     getRandomParticelPos(particleCount: any){
        const arr = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            arr[i] = (Math.random() - 0.5) * 10;
        }
        return arr;
    };
}
