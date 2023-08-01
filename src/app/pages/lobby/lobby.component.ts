import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent  implements OnInit{
    @ViewChild('threeCanvas', { static: true }) threeCanvas!: ElementRef<HTMLCanvasElement>;





    ngOnInit(): void {
        // Inițializează Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: this.threeCanvas.nativeElement });
        renderer.setSize(window.innerWidth -50, window.innerHeight-50);

       // Adding Starts
        const stars = new Array(0);
        for ( let i = 0; i < 10000; i ++ ) {
            let x = THREE.MathUtils.randFloatSpread( 2000 );
            let y = THREE.MathUtils.randFloatSpread( 2000 );
            let z = THREE.MathUtils.randFloatSpread( 2000 );
            stars.push(x, y, z);
        }
        const starsGeometry = new THREE.BufferGeometry();
        starsGeometry.setAttribute(
            "position", new THREE.Float32BufferAttribute(stars, 3)
        );
        const starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } );
        const starField = new THREE.Points( starsGeometry, starsMaterial );
        scene.add( starField );

        // Adaugă un cub în scenă
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Plasează camera în spatele cubului
        camera.position.z = 5;

        // Animare
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();
    }
}
