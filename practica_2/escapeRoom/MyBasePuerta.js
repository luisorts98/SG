import * as THREE from '../libs/three.module.js'

class MyBasePuerta extends THREE.Object3D {
    constructor() {
        super();

        // Create the base of the hologram
        var basePuerta = new THREE.BoxGeometry(100, 90, 50);
        var baseLuces = new THREE.BoxGeometry(45, 65, 30);
        var luz1 = new THREE.CylinderGeometry(8, 8, 6, 32);
        var luz2 = new THREE.CylinderGeometry(8, 8, 6, 32);
        var basePuertaMat = new THREE.MeshPhongMaterial({ color: '#D2D0D0' });
        var baseLucesMat = new THREE.MeshPhongMaterial({ color: '#D2D0D0' });
        // Luz verde '#21CF4D'
        this.luz1Mat = new THREE.MeshLambertMaterial({ color: '#E51717', emissive: '#E51717' });
        this.luz2Mat = new THREE.MeshLambertMaterial({ color: '#E51717', emissive: '#E51717' });
        this.basePuertaMesh= new THREE.Mesh(basePuerta, basePuertaMat);
        this.basePuerta2Mesh = new THREE.Mesh(basePuerta, basePuertaMat);
        this.baseLucesMesh = new THREE.Mesh(baseLuces, baseLucesMat);
        this.baseLucesMesh2 = new THREE.Mesh(baseLuces, baseLucesMat);
        this.baseLucesMesh3 = new THREE.Mesh(baseLuces, baseLucesMat);
        this.baseLucesMesh4 = new THREE.Mesh(baseLuces, baseLucesMat);
        this.luz1Mesh = new THREE.Mesh(luz1, this.luz1Mat);
        this.luz12Mesh = new THREE.Mesh(luz1, this.luz1Mat);
        this.luz2Mesh = new THREE.Mesh(luz2, this.luz2Mat);
        this.luz22Mesh = new THREE.Mesh(luz2, this.luz2Mat);
        this.luz3Mesh = new THREE.Mesh(luz1, this.luz1Mat);
        this.luz32Mesh = new THREE.Mesh(luz1, this.luz1Mat);
        this.luz4Mesh = new THREE.Mesh(luz2, this.luz2Mat);
        this.luz42Mesh = new THREE.Mesh(luz2, this.luz2Mat);

        this.light1 = new THREE.SpotLight( '#E51717', 0.5, 100, Math.PI/2 );
        this.light2 = new THREE.SpotLight( '#E51717', 0.5, 100, Math.PI/2 );
        this.light3 = new THREE.SpotLight( '#E51717', 0.5, 100, Math.PI/2 );
        this.light4 = new THREE.SpotLight( '#E51717', 0.5, 100, Math.PI/2 );
        this.light5 = new THREE.SpotLight( '#E51717', 0.5, 100, Math.PI/2 );
        this.light6 = new THREE.SpotLight( '#E51717', 0.5, 100, Math.PI/2 );
        this.light7 = new THREE.SpotLight( '#E51717', 0.5, 100, Math.PI/2 );
        this.light8 = new THREE.SpotLight( '#E51717', 0.5, 100, Math.PI/2 );
     
        this.basePuertaMesh.position.set(0, 35, 0);
        this.basePuerta2Mesh.position.set(0, 35, 300);
        this.baseLucesMesh.position.set(-30, 45, 0);
        this.baseLucesMesh2.position.set(-30, 45, 300);
        this.baseLucesMesh3.position.set(30, 45, 0);
        this.baseLucesMesh4.position.set(30, 45, 300);


        this.luz1Mesh.rotateZ(Math.PI / 2);
        this.luz1Mesh.position.set(-52, 60, 0);
        this.light1.position.set(-52, 60, 0);
        this.luz12Mesh.rotateZ(Math.PI / 2);
        this.luz12Mesh.position.set(-52, 60, 300);
        this.light2.position.set(-52, 60, 300);
        this.luz2Mesh.rotateZ(Math.PI / 2);
        this.luz22Mesh.rotateZ(Math.PI / 2);
        this.luz2Mesh.position.set(-52, 35, 0);
        this.light3.position.set(-52, 35, 0);
        this.luz22Mesh.position.set(-52, 35, 300);
        this.light4.position.set(-52, 35, 300);
        this.luz3Mesh.rotateZ(Math.PI / 2);
        this.luz3Mesh.position.set(52, 60, 0);
        this.light5.position.set(52, 60, 0);
        this.luz32Mesh.rotateZ(Math.PI / 2);
        this.luz32Mesh.position.set(52, 60, 300);
        this.light6.position.set(52, 60, 300);
        this.luz4Mesh.rotateZ(Math.PI / 2);
        this.luz4Mesh.position.set(52, 35, 300);
        this.light7.position.set(52, 35, 300);
        this.luz42Mesh.rotateZ(Math.PI / 2);
        this.luz42Mesh.position.set(52, 35, 0);
        this.light8.position.set(52, 35, 0);
       

        this.add(this.basePuertaMesh);
        this.add(this.basePuerta2Mesh);
        this.add(this.baseLucesMesh);
        this.add(this.baseLucesMesh2);
        this.add(this.baseLucesMesh3);
        this.add(this.baseLucesMesh4);
        this.add(this.luz1Mesh);
        this.add(this.luz22Mesh);
        this.add(this.luz12Mesh);
        this.add(this.luz2Mesh);
        this.add(this.luz3Mesh);
        this.add(this.luz32Mesh);
        this.add(this.luz4Mesh);
        this.add(this.luz42Mesh);
        //this.add(this.puertaMesh);
        //this.add(this.EstructuraMesh);
        this.add(this.light1);
        this.add(this.light2);
        this.add(this.light3);
        this.add(this.light4);
        this.add(this.light5);
        this.add(this.light6);
        this.add(this.light7);
        this.add(this.light8);
    }

 

    update() {
      
    }
}

export { MyBasePuerta }