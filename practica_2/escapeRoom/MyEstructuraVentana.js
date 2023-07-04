import * as THREE from '../libs/three.module.js'
class MyEstructuraVentana extends THREE.Object3D {
    constructor() {
        super();

        // Create the base of the hologram

    var estructura1 = new THREE.BoxGeometry(10, 50, 1000);
    var estructura2 = new THREE.BoxGeometry(10, 50, 1000);
    var estructura3 = new THREE.BoxGeometry(10, 300, 30);
    var estructura4 = new THREE.BoxGeometry(10, 300, 30);
    var estructura5 = new THREE.BoxGeometry(10, 400, 20);
    var estructura6 = new THREE.BoxGeometry(10, 400, 20);

    var estructura1Mat = new THREE.MeshPhongMaterial({ color: '#ECECEC' });
    var estructura2Mat = new THREE.MeshPhongMaterial({ color: '#ECECEC' });
    var estructura3Mat = new THREE.MeshPhongMaterial({ color: '#ECECEC' });
    var estructura4Mat = new THREE.MeshPhongMaterial({ color: '#ECECEC' });
    var estructura5Mat = new THREE.MeshPhongMaterial({ color: '#ECECEC' });
    var estructura6Mat = new THREE.MeshPhongMaterial({ color: '#ECECEC' });

    this.estructura1 = new THREE.Mesh(estructura1, estructura1Mat);
    this.estructura2 = new THREE.Mesh(estructura2, estructura2Mat);
    this.estructura3 = new THREE.Mesh(estructura3, estructura3Mat);
    this.estructura4 = new THREE.Mesh(estructura4, estructura4Mat);
    this.estructura5 = new THREE.Mesh(estructura5, estructura5Mat);
    this.estructura6 = new THREE.Mesh(estructura6, estructura6Mat);

    this.estructura1.position.set(-995, 25, 0);
    this.estructura2.position.set(-995, 375, 0);
    this.estructura3.position.set(-995, 200, 485);
    this.estructura4.position.set(-995, 200, -485);
    this.estructura5.rotateX(Math.PI/7);
    this.estructura5.position.set(-995, 200, -200);
    this.estructura6.rotateX(-Math.PI/7);
    this.estructura6.position.set(-995, 200, 200);

    this.add(this.estructura1);
    this.add(this.estructura2);
    this.add(this.estructura3);
    this.add(this.estructura4);
    this.add(this.estructura5);
    this.add(this.estructura6);
    }

    update() {
      
    
}
}

export { MyEstructuraVentana }