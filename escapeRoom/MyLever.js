import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'

class MyLever extends THREE.Object3D {
  constructor() {
      super();



      //Como en los apuntes

       // Necesitamos las bibliotecas MTLLoader() y OBJLoader()
       var materialLoader = new MTLLOADER.MTLLoader();
       var objectLoader = new OBJLOADER.OBJLoader();
 
       // Cada funcion load('archivo', function(materials/object))
       materialLoader.load('../models/lever/lever.mtl', //Cambio la ruta para poner la ruta relativa
           (materials) => {
               objectLoader.setMaterials (materials);
               objectLoader.load('../models/lever/lever.obj',
                   (object) => {
                       this.modelo = object;
                       this.modelo2 = this.modelo.clone();
                       this.modelo.rotateZ(-Math.PI/7);
                       this.modelo2.rotateZ(-Math.PI/7);
                       this.modelo.position.set(-967, 88.6, -143.5);
                       this.modelo2.position.set(-967, 88.6, -36.5);
                       this.modelo.scale.set(18, 18, 18);
                       this.modelo2.scale.set(18, 18, 18);
                       this.add(this.modelo);
                      this.add(this.modelo2);
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

export { MyLever };
