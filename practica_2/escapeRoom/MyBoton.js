import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'

class MyBoton extends THREE.Object3D {
  constructor() {
      super();



      //Como en los apuntes

       // Necesitamos las bibliotecas MTLLoader() y OBJLoader()
       var materialLoader = new MTLLOADER.MTLLoader();
       var objectLoader = new OBJLOADER.OBJLoader();
 
       // Cada funcion load('archivo', function(materials/object))
       materialLoader.load('../models/boton/Stop Button.mtl', //Cambio la ruta para poner la ruta relativa
           (materials) => {
               objectLoader.setMaterials (materials);
               objectLoader.load('../models/boton/Stop Button.obj',
                   (object) => {
                       this.modelo = object;
                       this.modelo.rotateZ(Math.PI/3);
                       this.modelo.rotateY(Math.PI/2);
                       this.modelo.position.set(-931, 72, 0);
                       this.modelo.scale.set(6,6,6);
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

export { MyBoton };