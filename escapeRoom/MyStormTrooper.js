import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'

class MyStormTrooper extends THREE.Object3D {
  constructor() {
    super();

    var materialLoader = new MTLLOADER.MTLLoader();
    var objectLoader = new OBJLOADER.OBJLoader();
    var cubo1Geo = new THREE.BoxGeometry(100, 600, 110);
    var cubo1Mat = new THREE.MeshPhongMaterial({ color: '#95d0fc',
    transparent: true,
    opacity: 0.0 });
    this.cubo1 = new THREE.Mesh(cubo1Geo, cubo1Mat);
    this.cubo1.position.set(820, 0, 250);
    var cubo2Geo = new THREE.BoxGeometry(100, 600, 110);
    var cubo2Mat = new THREE.MeshPhongMaterial({ color: '#95d0fc',
    transparent: true,
    opacity: 0.0 });
     this.cubo2 = new THREE.Mesh(cubo2Geo, cubo2Mat);
    this.cubo2.position.set(820, 0, -250);
    this.add(this.cubo1);
    this.add(this.cubo2);
    materialLoader.load('../models/Sandtrooper/Sandtrooper.mtl', //Cambio la ruta para poner la ruta relativa
      (materials) => {
        objectLoader.setMaterials(materials);
        objectLoader.load('../models/Sandtrooper/Sandtrooper.obj',
          (object) => {
            this.stormTrooperFirst = object;
            this.stormTrooperSecond = this.stormTrooperFirst.clone();
            this.stormTrooperFirst.rotateY(-Math.PI / 2);
            this.stormTrooperSecond.rotateY(-Math.PI / 2);
            this.stormTrooperFirst.position.set(450, 0, 250);
            this.stormTrooperSecond.position.set(450, 0, -250);
            this.stormTrooperFirst.scale.set(0.4, 0.4, 0.4);
            this.stormTrooperSecond.scale.set(0.4, 0.4, 0.4);
            this.add(this.stormTrooperFirst);
            this.add(this.stormTrooperSecond);
          }, null, null);
      });
  }


  update() { }
}

export { MyStormTrooper };