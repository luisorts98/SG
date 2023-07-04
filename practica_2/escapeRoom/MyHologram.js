

import * as THREE from '../libs/three.module.js'

class MyHologram extends THREE.Object3D {
    constructor() {
        super();

        // Create the base of the hologram

        var base = new THREE.CylinderGeometry(40, 80,60,4,4,false);
        var hologram = new THREE.SphereGeometry(50, 32, 32);
        var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
        var hologramMat = new THREE.MeshPhongMaterial({ color: '#95d0fc', map: texture,
        transparent: true,
        opacity: 0.6 });
        var baseMat = new THREE.MeshPhongMaterial({ color: '#4d4d4d' });
        this.baseMesh = new THREE.Mesh(base, baseMat);
        this.hologramMesh = new THREE.Mesh(hologram, hologramMat);

        this.hologramMesh.position.set(100, 115, 350);
        this.baseMesh.position.set(100, 30, 350);

       

        this.add(this.baseMesh);
        this.add(this.hologramMesh);

    }

 

    update() {
       this.hologramMesh.rotation.y += 0.03;
    }
}

export { MyHologram }
