import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class MyPieza3 extends THREE.Object3D {
  constructor() {
      super();
      var texture = new THREE.TextureLoader().load('../imgs/texturatuerca.png');
      var cilindroF = new THREE.CylinderGeometry(1, 1, 3, 32);
      var cilindroFMat = new THREE.MeshPhongMaterial({ color: '#EDE7E5',
      map: texture, });
      var cilindroF = new THREE.Mesh(cilindroF, cilindroFMat);
      cilindroF.position.y = 1.5;
      cilindroF.rotateX(Math.PI / 2);
      var cilindroFQuitar = new THREE.CylinderGeometry(0.4, 0.4, 3, 32);
      var texture2 = new THREE.TextureLoader().load('../imgs/texturatuerca.png');
      var cilindroFQuitarMat = new THREE.MeshPhongMaterial({ color: '#D8D4D2', map: texture2, });
      var cilindroFQuitar = new THREE.Mesh(cilindroFQuitar, cilindroFQuitarMat);
      cilindroFQuitar.position.y = 1.5;
      cilindroFQuitar.position.z = -1.9;
      cilindroFQuitar.rotateX(Math.PI / 2);
      var cilindroquitar1 = new THREE.CylinderGeometry(0.4, 0.4, 3, 32);
      var cilindroquitar1Mat = new THREE.MeshPhongMaterial({ color: '#D8D4D2' });
      var cilindroquitar1Mesh = new THREE.Mesh(cilindroquitar1, cilindroquitar1Mat);
      var cilindroquitar2Mesh = new THREE.Mesh(cilindroquitar1, cilindroquitar1Mat); 
      var cilindroquitar3Mesh = new THREE.Mesh(cilindroquitar1, cilindroquitar1Mat);
      var cilindroquitar4Mesh = new THREE.Mesh(cilindroquitar1, cilindroquitar1Mat);
      cilindroquitar1Mesh.position.y = 4.5;
      cilindroquitar1Mesh.position.z = 10;
      cilindroquitar1Mesh.position.x = -4;
      cilindroquitar1Mesh.rotateX(Math.PI / 2);
      cilindroquitar2Mesh.position.y = 4.5;
      cilindroquitar2Mesh.position.z = 10;
      cilindroquitar2Mesh.position.x = 4;
      cilindroquitar2Mesh.rotateX(Math.PI / 2);
      cilindroquitar3Mesh.position.y = -9.5;
      cilindroquitar3Mesh.position.z = 10;
      cilindroquitar3Mesh.position.x = 4;
      cilindroquitar3Mesh.rotateX(Math.PI / 2);
      cilindroquitar4Mesh.position.y = -9.5;
      cilindroquitar4Mesh.position.z = 10;
      cilindroquitar4Mesh.position.x = -4;
      cilindroquitar4Mesh.rotateX(Math.PI / 2);
      var csgCilindroF = new CSG();
      csgCilindroF.subtract([cilindroF, cilindroFQuitar]);
      this.cilindroFMesh = csgCilindroF.toMesh();
      this.cilindroFMesh.rotateY(Math.PI / 2);
      this.cilindroFMesh.position.set(-12, -1.5, 0);
      var hueco3 = new THREE.BoxGeometry(10, 10, 15);
      var hueco3Mat = new THREE.MeshPhongMaterial({ color: '#6B6658' });
      var hueco3 = new THREE.Mesh(hueco3, cilindroFMat);
      var hueco32 = new THREE.CylinderGeometry(2.5,2.5, 7);
      var huecoquitar = new THREE.CylinderGeometry(2.5,2.5, 7);
      this.cilindropeque = new THREE.CylinderGeometry(0.5,0.5, 10);
      var hueco32Mat = new THREE.MeshPhongMaterial({ color: '#4d4d4d' });
      var hueco32 = new THREE.Mesh(hueco32, cilindroFMat);
      var hueco32quitar = new THREE.Mesh(huecoquitar, cilindroFMat);
      this.cilindropequeM = new THREE.Mesh(this.cilindropeque, cilindroFMat);
      hueco32.rotateX(Math.PI/2);
      hueco32quitar.rotateX(Math.PI/2);
      this.cilindropequeM.rotateX(Math.PI/2);
      hueco32.position.set(0, 0, 12);
      hueco32quitar.position.set(0, 0, 8);
      this.cilindropequeM.rotateZ(-Math.PI/2);
      this.cilindropequeM.position.set(-6, 0, 0);
      var hueco33 = new THREE.BoxGeometry(10, 16.5, 2);
      var hueco33Mat = new THREE.MeshPhongMaterial({ color: '#4d4d4d' });
      var hueco33 = new THREE.Mesh(hueco33,cilindroFMat);
      hueco33.position.set(0, -2.5, 8);
      var csgHueco3 = new CSG();
      csgHueco3.union([hueco3, hueco33]);
      csgHueco3.subtract([hueco32quitar,cilindroquitar1Mesh,cilindroquitar2Mesh,cilindroquitar3Mesh,cilindroquitar4Mesh]);
      this.H3 = csgHueco3.toMesh();
      this.H3.rotateY(-Math.PI/2);
      this.H3.position.set(0, 0,0);
      this.H4 = new CSG();
      this.H4.union([this.H3,this.cilindropequeM,this.cilindroFMesh]);
      this.H4F = this.H4.toMesh();
   
      this.add(this.H4F);
     

  }

 
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
   
  }
}

export { MyPieza3 };
