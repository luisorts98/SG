
import * as THREE from '../libs/three.module.js'

class MyLight extends THREE.Object3D {
    constructor() {
        super();

        const cubeGeometry = new THREE.BoxGeometry(400, 1, 50);
        const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0xffffff});
        const cubeMeshLeft = new THREE.Mesh(cubeGeometry, cubeMaterial);
        const cubeMeshRight = new THREE.Mesh(cubeGeometry, cubeMaterial);
        const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubeMeshLeft.position.set(50, 399, 200);
        cubeMeshRight.position.set(50, 399, -200);
        cubeMesh2.position.set(1550, 399, 0);

        const lightRight = new THREE.PointLight( 0xffffff, 0.5 );
        const lightLeft = new THREE.PointLight( 0xffffff, 0.5 );
        const light2 = new THREE.PointLight( 0xffffff, 0.5 );
        lightLeft.position.set( 50, 270, 200 );
        lightRight.position.set( 50, 270, -200 );
        light2.position.set( 1550, 270, 0 );


        this.add( cubeMeshLeft );
        this.add( lightLeft );
        this.add( cubeMeshRight );
        this.add( lightRight );
        this.add( cubeMesh2 );
        this.add( light2 );
    }

    update() {

    }
}

export { MyLight }