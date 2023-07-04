import * as THREE from '../libs/three.module.js'

class MyPieza1 extends THREE.Object3D{
    constructor(gui,titleGui){
        super();

      

        this.points = [];

        // Se añaden los puntos al array
        this.points.push(new THREE.Vector3(0.0, -1.4, 0.0));
        this.points.push(new THREE.Vector3(0.5, -1.4, 0.0));
        this.points.push(new THREE.Vector3(0.5, -1.1, 0.0));
        this.points.push(new THREE.Vector3(1.0, -1.1, 0.0));
        this.points.push(new THREE.Vector3(1.0, -0.8, 0.0));
        this.points.push(new THREE.Vector3(0.8, -0.7, 0.0));
        this.points.push(new THREE.Vector3(1.0, -0.7, 0.0));
        this.points.push(new THREE.Vector3(1.0, 0.0, 0.0));
        this.points.push(new THREE.Vector3(0.8, 0.2, 0.0));
        this.points.push(new THREE.Vector3(1.0, 0.2, 0.0));
        this.points.push(new THREE.Vector3(1.0, 0.6, 0.0));
        this.points.push(new THREE.Vector3(0.1, 0.3, 0.0));//para cambiar la punta
        this.points.push(new THREE.Vector3(0.1, 0.3, 0.0));
        this.points.push(new THREE.Vector3(0.0, 0.3, 0.0));


       
       //Peon completo variable en resolución
       var Pieza1Geom = new THREE.LatheBufferGeometry(this.points,40);
       var texture = new THREE.TextureLoader().load('../imgs/texturapieza.png');
         var Pieza1Mat = new THREE.MeshPhongMaterial({color: '#D46D0D',
           map: texture,
           
          });
        this.pieza1 = new THREE.Mesh(Pieza1Geom,Pieza1Mat);
      
        this.pieza1.scale.set(7,7,7);
       
        this.add(this.pieza1);
       
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

export { MyPieza1 };
