import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'

class MyVader extends THREE.Object3D {
  constructor() {
      super();



      //Como en los apuntes

       // Necesitamos las bibliotecas MTLLoader() y OBJLoader()
       var materialLoader = new MTLLOADER.MTLLoader();
       var objectLoader = new OBJLOADER.OBJLoader();
       var cuboC3POGeo = new THREE.BoxGeometry(120, 300, 100 );
       var cuboC3POMat = new THREE.MeshPhongMaterial({ color: '#95d0fc',
       transparent: true,
       opacity: 0.0 });
       this.cuboVader = new THREE.Mesh(cuboC3POGeo, cuboC3POMat);
       this.cuboVader.position.set(1300, 150, 300);
         this.add(this.cuboVader);
       // Cada funcion load('archivo', function(materials/object))
       materialLoader.load('../models/Vader/star wars darth vader.mtl', //Cambio la ruta para poner la ruta relativa
           (materials) => {
               objectLoader.setMaterials (materials);
               objectLoader.load('../models/Vader/star wars darth vader.obj',
                   (object) => {
                       this.modelo = object;
                       this.modelo.scale.set(3.5, 3.5, 3.5);
                       this.modelo.rotation.y = Math.PI;
                       this.modelo.position.set(1300, 0, 19);
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

export { MyVader };
