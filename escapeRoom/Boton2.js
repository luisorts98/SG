import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'

class Boton2 extends THREE.Object3D {
  constructor() {
    super();



    //Como en los apuntes

     // Necesitamos las bibliotecas MTLLoader() y OBJLoader()
     var materialLoader = new MTLLOADER.MTLLoader();
     var objectLoader = new OBJLOADER.OBJLoader();

     var auxBox = new THREE.BoxGeometry(8, 5, 8);
       var auxBoxMat = new THREE.MeshBasicMaterial({ color: 0x737373, transparent: true, opacity: 0.0 });
       this.auxBoxMesh = new THREE.Mesh(auxBox, auxBoxMat);
       this.auxBoxMesh.rotateZ(-Math.PI/7);
       this.auxBoxMesh.position.set(-964, 101, 25);
       this.auxBoxMesh.name = 'startButton';
       this.add(this.auxBoxMesh);

     // Cada funcion load('archivo', function(materials/object))
     materialLoader.load('../models/boton2/uploads_files_763716_button.mtl', //Cambio la ruta para poner la ruta relativa
         (materials) => {
             objectLoader.setMaterials (materials);
             objectLoader.load('../models/boton2/uploads_files_763716_button.obj',
                 (object) => {
                     this.modelo = object;
                     this.modelo.rotateZ(-Math.PI/7)
                     this.modelo.position.set(-970, 90, 25);
                     this.modelo.scale.set(1,1,1);
                     this.add(this.modelo);
                    
                 },null,null);
         });

    //Objeto padre es this - se esta creando hijo, por tanto le afectaran las transformaciones al padre


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

export { Boton2 };
