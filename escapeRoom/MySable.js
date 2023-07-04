import * as THREE from '../libs/three.module.js'

class MySable extends THREE.Object3D{
    constructor(gui,titleGui){
        super();

      

        this.points = [];

        // Se añaden los puntos al array
        this.points.push(new THREE.Vector3(0.0, -12.5, 0.0));
        this.points.push(new THREE.Vector3(2.0, -12.5, 0.0));
        this.points.push(new THREE.Vector3(2.0, -12.3, 0.0));
        this.points.push(new THREE.Vector3(2.3, -12.3, 0.0));
        this.points.push(new THREE.Vector3(2.3, -11.8, 0.0));
        this.points.push(new THREE.Vector3(2.0, -11.8, 0.0));
        this.points.push(new THREE.Vector3(2.0, -11.8, 0.0));
        this.points.push(new THREE.Vector3(2.0, -10.0, 0.0));
        this.points.push(new THREE.Vector3(2.3, -10.0, 0.0));
        this.points.push(new THREE.Vector3(2.3, -7.0, 0.0));
        this.points.push(new THREE.Vector3(2.0, -7.0, 0.0));
        this.points.push(new THREE.Vector3(2.0, 0.0, 0.0));
        this.points.push(new THREE.Vector3(1.7, 0.2, 0.0));
        this.points.push(new THREE.Vector3(1.7, 0.4, 0.0));
        this.points.push(new THREE.Vector3(2.0, 0.4, 0.0));
        this.points.push(new THREE.Vector3(2.0, 0.6, 0.0));
        this.points.push(new THREE.Vector3(1.7, 0.6, 0.0));
        this.points.push(new THREE.Vector3(1.7, 0.8, 0.0));
        this.points.push(new THREE.Vector3(2.0, 0.8, 0.0));
        this.points.push(new THREE.Vector3(2.0, 1.0, 0.0));
        this.points.push(new THREE.Vector3(1.7, 1.0, 0.0));
        this.points.push(new THREE.Vector3(1.7, 1.2, 0.0));
        this.points.push(new THREE.Vector3(2.0, 1.2, 0.0));
        this.points.push(new THREE.Vector3(2.0, 1.4, 0.0));
        this.points.push(new THREE.Vector3(1.7, 1.4, 0.0));
        this.points.push(new THREE.Vector3(1.7, 1.6, 0.0));
        this.points.push(new THREE.Vector3(2.0, 1.6, 0.0));
        this.points.push(new THREE.Vector3(2.0, 1.8, 0.0));
        this.points.push(new THREE.Vector3(1.7, 1.8, 0.0));
        this.points.push(new THREE.Vector3(1.7, 2.0, 0.0));
        this.points.push(new THREE.Vector3(2.0, 2.0, 0.0));
        this.points.push(new THREE.Vector3(2.0, 2.2, 0.0));
        this.points.push(new THREE.Vector3(1.7, 2.2, 0.0));
        this.points.push(new THREE.Vector3(1.7, 2.4, 0.0));
        this.points.push(new THREE.Vector3(2.0, 2.4, 0.0));
        this.points.push(new THREE.Vector3(2.0, 2.6, 0.0));
        this.points.push(new THREE.Vector3(1.7, 2.6, 0.0));
        this.points.push(new THREE.Vector3(1.7, 2.8, 0.0));
        this.points.push(new THREE.Vector3(2.0, 2.8, 0.0));
        this.points.push(new THREE.Vector3(2.0, 3.0, 0.0));
        this.points.push(new THREE.Vector3(1.7, 3.0, 0.0));
        this.points.push(new THREE.Vector3(1.7, 3.2, 0.0));
        this.points.push(new THREE.Vector3(2.0, 3.2, 0.0));
        this.points.push(new THREE.Vector3(2.0, 3.4, 0.0));
        this.points.push(new THREE.Vector3(1.5, 3.7, 0.0));
        this.points.push(new THREE.Vector3(0.7, 3.7, 0.0));
        this.points.push(new THREE.Vector3(0.7, 4.9, 0.0));
        this.points.push(new THREE.Vector3(0.8, 4.9, 0.0));
        this.points.push(new THREE.Vector3(0.8, 5.6, 0.0));
        this.points.push(new THREE.Vector3(1.5, 5.6, 0.0));
        this.points.push(new THREE.Vector3(1.5, 5.8, 0.0));
        this.points.push(new THREE.Vector3(1.2, 6.0, 0.0));
        this.points.push(new THREE.Vector3(1.2, 6.1, 0.0));
        this.points.push(new THREE.Vector3(1.5, 6.1, 0.0));
        this.points.push(new THREE.Vector3(1.5, 6.9, 0.0));
        this.points.push(new THREE.Vector3(0.8, 6.9, 0.0));
        this.points.push(new THREE.Vector3(0.8, 7.4, 0.0));
        this.points.push(new THREE.Vector3(0.7, 7.4, 0.0));
        this.points.push(new THREE.Vector3(0.7, 7.5, 0.0));
        this.points.push(new THREE.Vector3(0.8, 7.5, 0.0));
        this.points.push(new THREE.Vector3(0.8, 8.3, 0.0));
        this.points.push(new THREE.Vector3(1.1, 8.3, 0.0));
        this.points.push(new THREE.Vector3(1.1, 9.0, 0.0));
        this.points.push(new THREE.Vector3(1.7, 9.0, 0.0));
        this.points.push(new THREE.Vector3(1.7, 10.7, 0.0));
        this.points.push(new THREE.Vector3(1.8, 10.7, 0.0));
        this.points.push(new THREE.Vector3(1.8, 11.0, 0.0));
        this.points.push(new THREE.Vector3(2.0, 11.0, 0.0));
        this.points.push(new THREE.Vector3(2.0, 11.2, 0.0));
        this.points.push(new THREE.Vector3(0, 10.8, 0.0));


     
        this.points2 = [];
        this.points2.push(new THREE.Vector3(0.0, 10.8, 0.0));
        this.points2.push(new THREE.Vector3(1.5, 10.8, 0.0));
        this.points2.push(new THREE.Vector3(1.5, 105.8, 0.0));
        this.points2.push(new THREE.Vector3(0.1, 111.8, 0.0));

        var cuboC3POGeo = new THREE.BoxGeometry(5, 120, 5 );
       var cuboC3POMat = new THREE.MeshPhongMaterial({ color: '#95d0fc',
       transparent: true,
       opacity: 0.0 });
       this.cuboSable = new THREE.Mesh(cuboC3POGeo, cuboC3POMat);
       this.cuboSable.rotateX(-Math.PI/3);
       this.cuboSable.position.set(1116, 132, 200);
         this.add(this.cuboSable);
       //Peon completo variable en resolución
       var sableGeom = new THREE.LatheBufferGeometry(this.points,40);
       var texture = new THREE.TextureLoader().load('../imgs/sable.png');
         var sableMat = new THREE.MeshPhongMaterial({
           map: texture,
           
          });
          var sable2Geom = new THREE.LatheBufferGeometry(this.points2,40);
          var sable2Mat = new THREE.MeshPhongMaterial({
            color: '#13C1F1',
            emissive: '#13C1F1'
        
          });

        this.sable = new THREE.Mesh(sableGeom,sableMat);
        this.sable2 = new THREE.Mesh(sable2Geom,sable2Mat);
        const lightSable = new THREE.PointLight( '#13C1F1', 0.12 );

     
        this.sable.rotateX(-Math.PI/3);
        this.sable.position.set(1116, 105, 245);
        this.sable2.rotateX(-Math.PI/3);
        this.sable2.position.set(1116, 105, 245);
        lightSable.position.set(1256, 105, 245);

        this.add(this.sable);
        this.add(this.sable2);
        this.add(lightSable);
        //peonMat.flatShading = true;
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

export { MySable };
