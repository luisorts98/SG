import * as THREE from '../libs/three.module.js'

class MyPuerta extends THREE.Object3D {
    constructor() {
        super();



        //Puerta de vd
        var puerta = new THREE.BoxGeometry(20, 370, 130);
        var puertaMat = new THREE.MeshPhongMaterial({ color: '#4D4C4C' });
        this.puertaMesh = new THREE.Mesh(puerta, puertaMat);
        this.puertaMesh.position.set(1000, 170, -65);

        var puerta2 = new THREE.BoxGeometry(20, 370, 130);
        var puertaMat2 = new THREE.MeshPhongMaterial({ color: '#4D4C4C' });
        this.puertaMesh2 = new THREE.Mesh(puerta2, puertaMat2);
        this.puertaMesh2.position.set(1000, 170, 65);

        this.add(this.puertaMesh);
        this.add(this.puertaMesh2);
    }

 

    update() {
      
    }
}

export { MyPuerta }