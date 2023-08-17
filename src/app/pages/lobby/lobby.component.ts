import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {ImageService} from "./test.service";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";



@Component({
  selector: 'app-lobby',
  template: `<section class="w-100 h-100">
      <canvas class="w-100 h-100" #threeCanvas></canvas>
  </section>`,
  styles: ['']
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

    earth!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };
    jupiter!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };
    moon!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };
    pluto!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };
    saturn!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };
    venus!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };
    mercury!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };
    mars!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };
    neptune!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };
    uranus!: {mesh: THREE.Mesh,orbitRadius: number, orbitSpeed: number, angle: number };

    backGroundOptions={space_length  :2000000, wormhole_length     :1000, space_velocity      :8 * 0.001, space_rotation      : -10 * 0.0001,
        wormhole_rotation   :15 * 0.001, wormhole_velocity   : 8 * 0.001, wormhole_freq      : 6,
        star_density        : 400, star_size           : 2, camera_pos          : new THREE.Vector3(0, 300, 400)}
    backgr!: THREE.Mesh;
    private loader = new GLTFLoader();

    constructor(private ngZone: NgZone,private imageService: ImageService) {
    }

    async createMercury(){
        this.loader.load('assets/3DModels/mercury.glb', (gltf) => {
            this.mercury ={mesh:gltf.scene.children[0] as THREE.Mesh,angle: 0, orbitRadius: 400, orbitSpeed: 0.0005};
            this.mercury.mesh.scale.set(2, 2, 2);
            this.scene.add(this.mercury.mesh);
        });
    }

    async createVenus(){
        this.loader.load('assets/3DModels/venus.glb', (gltf) => {
            this.venus ={mesh:gltf.scene.children[0] as THREE.Mesh,angle: 0, orbitRadius: 550, orbitSpeed: 0.000005};
            this.venus.mesh.scale.set(4, 4, 4);
            this.scene.add(this.venus.mesh);
        });
    }

    async createEarth(){
        this.loader.load('assets/3DModels/earth.glb', (gltf) => {
            this.earth ={mesh:gltf.scene.children[0] as THREE.Mesh,angle: 0, orbitRadius: 750, orbitSpeed:  0.000005};
            this.earth.mesh.scale.set(4, 4, 4);
            this.scene.add(this.earth.mesh);
        });
    }

    async createMars(){
         this.loader.load('assets/3DModels/mars.glb', (gltf) => {
             this.mars ={mesh:gltf.scene.children[0] as THREE.Mesh,angle: 0, orbitRadius: 900, orbitSpeed: 0.000005};
             this.mars.mesh.scale.set(3, 3, 3);
             this.scene.add(this.mars.mesh);
         });
    }


    async createJupiter(){
        this.loader.load('assets/3DModels/jupiter.glb', (gltf) => {
            this.jupiter ={mesh:gltf.scene.children[0] as THREE.Mesh,angle: 0, orbitRadius: 1100, orbitSpeed: 0.000005};
            this.jupiter.mesh.scale.set(9, 9, 9);
            this.scene.add(this.jupiter.mesh);
        });
    }



    async createSaturn(){
        this.loader.load('assets/3DModels/saturn.glb', (gltf) => {
            this.saturn ={mesh:gltf.scene.children[0] as THREE.Mesh,angle: 0, orbitRadius: 1300, orbitSpeed:  0.000005};
            this.saturn.mesh.scale.set(8, 8, 8);
            this.scene.add(this.saturn.mesh);
        });
    }
    async createUranus(){
        this.loader.load('assets/3DModels/uranus.glb', (gltf) => {
            this.uranus ={mesh:gltf.scene.children[0] as THREE.Mesh,angle: 0, orbitRadius: 1500, orbitSpeed:  0.000005};
            this.uranus.mesh.scale.set(6, 6, 6);
            this.scene.add(this.uranus.mesh);
        });
    }

    async createNeptune(){
        this.loader.load('assets/3DModels/neptune.glb', (gltf) => {
            this.neptune ={mesh:gltf.scene.children[0] as THREE.Mesh,angle: 0, orbitRadius: 1700, orbitSpeed: 0.000005};
            this.neptune.mesh.scale.set(6, 6, 6);
            this.scene.add(this.neptune.mesh);
        });
    }

    async createMoon(){
        // this.loader.load('assets/3DModels/moon.glb', (gltf) => {
        //     this.moon ={mesh:gltf.scene.children[0] as THREE.Mesh,angle: 0, orbitRadius: 400, orbitSpeed: 0.005};
        //     this.mercury.mesh.scale.set(3, 3, 3);
        //     this.scene.add(this.mercury.mesh);
        // });

    }
    async createPluto(){
        // this.loader.load('assets/3DModels/pluto.glb', (gltf) => {
        //     this.pluto ={mesh:gltf.scene.children[0] as THREE.Mesh,angle: 0, orbitRadius: 400, orbitSpeed: 0.005};
        //     this.pluto.mesh.scale.set(3, 3, 3);
        //     this.scene.add(this.pluto.mesh);
        // });

    }




    async createSun() {
        this.loader.load('assets/3DModels/sun.glb', (gltf) => {
            this.sun = gltf.scene.children[0] as THREE.Mesh;
            this.sun.scale.set(15, 15, 15);
            this.sun.position.set(0, 0, 0);
            this.scene.add(this.sun);
        });

    }

    async createBackGround(){
        //
        // const background = this.textureLoader.load('assets/img/stars_milky_way.jpg', (background) => {
        //     background.wrapT = THREE.MirroredRepeatWrapping;
        //     background.wrapS = THREE.MirroredRepeatWrapping;
        //     background.offset.set( 0, 0 );
        //     background.repeat.set( 1, 1 );
        //     background.anisotropy = 8;
        // });
        // const gmBack = new THREE.SphereGeometry(this.backGroundOptions.space_length * 1.1, 300, 300, 1, Math.PI * 2);
        // const matBack = new THREE.MeshBasicMaterial({ map: background, side: THREE.BackSide, transparent: true, opacity: 2 });
        // this.backgr = new THREE.Mesh(gmBack, matBack);
        // this.scene.add(this.backgr);
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

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Intensity: 0.5
        this.scene.add(ambientLight);

        // Add point light as your custom light source
        const pointLight = new THREE.PointLight(0xff0000, 1, 10); // Color: Red, Intensity: 1, Distance: 10
        pointLight.position.set(0, 3, 0); // Position of the light source
        this.scene.add(pointLight);
      //  this.stars = new Array(0);

       this.orbit = new OrbitControls(this.camera, this.renderer.domElement);

    }



  async  ngOnInit() {



        // Init Objects
         await this.createSun();
         await this.initScene();
         await this.createMercury();
         await this.createSaturn();
         await this.createJupiter();
         await this.createVenus();
         await this.createNeptune();
         await this.createMars();
         await this.createMoon();
         await this.createPluto();
         await this.createEarth();
         await this.createUranus();
         await this.createBackGround();


      window.addEventListener('resize', () =>
      {
          this.camera.aspect = window.innerWidth / window.innerHeight;
          this.camera.updateProjectionMatrix();

          this.renderer.setSize(window.innerWidth, window.innerHeight);
          this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      })

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

             const cameraPosition = this.camera.position;
             const cameraDistance = cameraPosition.length();

             if (cameraDistance > 3000) {
                 // Calculate a new position that is at the maximum length along the same direction
                 const newCameraPosition = cameraPosition.clone().normalize().multiplyScalar(3000);

                 // Update the camera's position
                 this.camera.position.copy(newCameraPosition);
             }


             // this.mercury.angle += this.mercury.orbitSpeed;
             // this.mars.angle += this.mars.orbitSpeed;
             // this.neptune.angle += this.neptune.orbitSpeed;

             const mercuryX = this.sun.position.x + this.mercury.orbitRadius * Math.cos(this.mercury.angle);
             const mercuryZ = this.sun.position.z + this.mercury.orbitRadius * Math.sin(this.mercury.angle);
             const marsX = this.sun.position.x + this.mars.orbitRadius * Math.cos(this.mars.angle);
             const marsZ = this.sun.position.z + this.mars.orbitRadius * Math.sin(this.mars.angle);
             const neptuneX = this.sun.position.x + this.neptune.orbitRadius * Math.cos(this.mars.angle);
             const neptuneZ = this.sun.position.z + this.neptune.orbitRadius * Math.sin(this.mars.angle);
             const saturnX = this.sun.position.x + this.saturn.orbitRadius * Math.cos(this.mars.angle);
             const saturnZ = this.sun.position.z + this.saturn.orbitRadius * Math.sin(this.mars.angle);
             const jupiterX = this.sun.position.x + this.jupiter.orbitRadius * Math.cos(this.mars.angle);
             const jupiterZ = this.sun.position.z + this.jupiter.orbitRadius * Math.sin(this.mars.angle);
             const uranusX = this.sun.position.x + this.uranus.orbitRadius * Math.cos(this.mars.angle);
             const uranusZ = this.sun.position.z + this.uranus.orbitRadius * Math.sin(this.mars.angle);
             const venusX = this.sun.position.x + this.venus.orbitRadius * Math.cos(this.mars.angle);
             const venusZ = this.sun.position.z + this.venus.orbitRadius * Math.sin(this.mars.angle);
             const earthX = this.sun.position.x + this.earth.orbitRadius * Math.cos(this.mars.angle);
             const earthZ = this.sun.position.z + this.earth.orbitRadius * Math.sin(this.mars.angle);


             //this.backgr.position.set(this.sun.position.x,0,this.sun.position.z)

             this.mercury.mesh.position.set(mercuryX, 0, mercuryZ);
             this.mars.mesh.position.set(marsX, 0, marsZ);
             this.neptune.mesh.position.set(neptuneX, 0, neptuneZ);
             this.saturn.mesh.position.set(saturnX, 0, saturnZ);
             this.jupiter.mesh.position.set(jupiterX, 0, jupiterZ);
             this.uranus.mesh.position.set(uranusX, 0, uranusZ);
             this.venus.mesh.position.set(venusX, 0, venusZ);
             this.earth.mesh.position.set(earthX, 0, earthZ);


            // this.backgr.rotateZ(-0.001);
             //this.backgr.position.z = -this.backGroundOptions.space_length * 0.9;

             this.sun.rotation.x -= 0.0008;
             this.sun.rotation.y -= 0.0009;

             this.neptune.mesh.rotation.x += 0.01;
             this.neptune.mesh.rotation.y += 0.01;
             this.mars.mesh.rotation.x += 0.01;
             this.mars.mesh.rotation.y += 0.01;
             this.mercury.mesh.rotation.x += 0.002;
             this.mercury.mesh.rotation.y += 0.005;

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
