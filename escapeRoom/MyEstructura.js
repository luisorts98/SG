import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
class MyEstructura extends THREE.Object3D {
    constructor() {
        super();

        //cerrojo

        var baseCerrojo = new THREE.BoxGeometry(25, 50, 25);
        var baseCerrojoMat = new THREE.MeshPhongMaterial({ color: '#585E58' });
        this.baseCerrojoMesh = new THREE.Mesh(baseCerrojo, baseCerrojoMat);
        this.baseCerrojoMesh.position.set(-30,115, -130);

        var baseCerrojo2 = new THREE.BoxGeometry(18, 30, 20);
        var baseCerrojo2Mat = new THREE.MeshPhongMaterial({ color: '#585E58' });
        this.baseCerrojo2Mesh = new THREE.Mesh(baseCerrojo2, baseCerrojo2Mat);
        this.baseCerrojo2Mesh.position.set(-49, 122, -130);

        //PANTALLA Cerrojo
        var pantalla = new THREE.BoxGeometry(3, 30, 20);
        var pantallaTextura = new THREE.TextureLoader().load('../imgs/verde.jpeg');
        var pantallaMat = new THREE.MeshPhongMaterial({map: pantallaTextura});
        this.pantallaMesh = new THREE.Mesh(pantalla, pantallaMat);
        this.pantallaMesh2 = new THREE.Mesh(pantalla, pantallaMat);
        this.pantallaMesh.position.set(-41, 122, -130);
        this.pantallaMesh2.position.set(41, 122, -130);

        var luz1 = new THREE.CylinderGeometry(3, 3, 6, 32);
        var luz2 = new THREE.CylinderGeometry(3, 3, 6, 32);
        var luz2Mat = new THREE.MeshPhongMaterial({ color: '#E51717' });
        var luz1Mat = new THREE.MeshPhongMaterial({ color: '#26DA34' });
        this.luz1Mesh = new THREE.Mesh(luz1, luz1Mat);
        this.luz1Mesh.name = 'pomo';
        this.luz2Mesh = new THREE.Mesh(luz2, luz2Mat);
        this.luz1Mesh.rotateZ(Math.PI / 2);
        this.luz2Mesh.rotateZ(Math.PI / 2);
        this.luz1Mesh.position.set(-42, 98, -124);
        this.luz2Mesh.position.set(-42, 98, -136);
        this.luz1Mesh2 = new THREE.Mesh(luz1, luz1Mat);
        this.luz2Mesh2 = new THREE.Mesh(luz2, luz2Mat);
        this.luz1Mesh2.name = 'pomo2';
        this.luz1Mesh2.rotateZ(Math.PI / 2);
        this.luz2Mesh2.rotateZ(Math.PI / 2);
        this.luz1Mesh2.position.set(42, 98, -124);
        this.luz2Mesh2.position.set(42, 98, -136);
    

        var csg3 = new CSG();
        csg3.subtract([this.baseCerrojoMesh, this.baseCerrojo2Mesh]);
        
        //estructura
        var estructura = new THREE.BoxGeometry(45 , 360, 300);
        var estructuraMat = new THREE.MeshPhongMaterial({ color: '#D2D0D0' });
        this.EstructuraMesh = new THREE.Mesh(estructura, estructuraMat);
        this.EstructuraMesh.position.set(0, 180, 0);
        var cuboAquitar = new THREE.BoxGeometry(80, 80, 80);
        var cuboAquitar2 = new THREE.BoxGeometry(80, 80, 80);
        var cuboAquitarMat = new THREE.MeshPhongMaterial({ color: '#D2D0D0' });
        var cuboAquitarMat2 = new THREE.MeshPhongMaterial({ color: '#D2D0D0' });
        this.cuboAquitarMesh = new THREE.Mesh(cuboAquitar, cuboAquitarMat);
        this.cuboAquitarMesh2 = new THREE.Mesh(cuboAquitar2, cuboAquitarMat2);

        this.cuboAquitarMesh.rotateX(Math.PI / 4);
        this.cuboAquitarMesh2.rotateX(Math.PI / 4);
        this.cuboAquitarMesh.position.set(10, 360, 150);
        this.cuboAquitarMesh2.position.set(10, 360, -150);

        //Estructura a quitar
        var estructura2 = new THREE.BoxGeometry(60, 330, 225);
        var estructura2Mat = new THREE.MeshPhongMaterial({ color: '#F9E0E0' });
        this.Estructura2Mesh = new THREE.Mesh(estructura2, estructura2Mat);
        this.Estructura2Mesh.position.set(0, 165, 0);
        var cuboAquitar3 = new THREE.BoxGeometry(70, 70, 70);
        var cuboAquitar4 = new THREE.BoxGeometry(70, 70, 70);
        var cuboAquitarMat3 = new THREE.MeshPhongMaterial({ color: '#F9E0E0' });
        var cuboAquitarMat4 = new THREE.MeshPhongMaterial({ color: '#F9E0E0' });
        this.cuboAquitarMesh3 = new THREE.Mesh(cuboAquitar3, cuboAquitarMat3);
        this.cuboAquitarMesh4 = new THREE.Mesh(cuboAquitar4, cuboAquitarMat4);

        this.cuboAquitarMesh3.rotateX(Math.PI / 4);
        this.cuboAquitarMesh4.rotateX(Math.PI / 4);
        this.cuboAquitarMesh3.position.set(0, 330, 112.5);
        this.cuboAquitarMesh4.position.set(0, 330, -112.5);


        var csg = new CSG();
        csg.subtract([this.EstructuraMesh, this.cuboAquitarMesh, this.cuboAquitarMesh2]);
     
        var csg2 = new CSG();
        csg2.subtract([this.Estructura2Mesh, this.cuboAquitarMesh3, this.cuboAquitarMesh4]);

        var final  = new CSG();
        final.subtract([csg.toMesh(), csg2.toMesh()]);
        this.f = final.toMesh();
        this.csg3F = csg3.toMesh();
        this.csg3F2 = csg3.toMesh();
        this.csg3F2.rotateY(Math.PI);
        this.csg3F2.position.set(0, 0,-260);
        this.add(this.f);
        this.add(this.csg3F);
        this.add(this.luz1Mesh);
        this.add(this.luz2Mesh);
        this.add(this.luz1Mesh2);
        this.add(this.luz2Mesh2);
        this.add(this.pantallaMesh);
        this.add(this.pantallaMesh2);
        this.add(this.csg3F2);
    }

 

    update() {
      
    }
}

export { MyEstructura }
