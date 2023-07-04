
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class MySilla extends THREE.Object3D {
    constructor() {
        super();

        // Create the base of the hologram
        var texture1 = new THREE.TextureLoader().load('../imgs/prueba.png');
        var texture = new THREE.TextureLoader().load('../imgs/prueba-textura.png');
        var texture2 = new THREE.TextureLoader().load('../imgs/fondo-plateado.jpg');
        var baseMat = new THREE.MeshPhongMaterial({ map: texture2 });
        var apoyoMat = new THREE.MeshPhongMaterial({ color: '#4d4d4d' });
        var materialSilla = new THREE.MeshPhongMaterial({
            map: texture1, 
            bumpMap: texture,
            bumpScale:0.9,
        });
        var caja_a_perforar = new THREE.BoxGeometry(5, 5, 2); //ancho alto y profundo
        var cilinderGeom = new THREE.CylinderGeometry(0.5, 0.5, 3, 32); //0.5 de radio y 3 de altura
        var piezaGeom = new THREE.BoxGeometry(5, 4, 2); //Quitar todo menos una parte a la izq
        var piezaGeom2 = new THREE.BoxGeometry(5, 4.5, 2); //Quitar todo menos una parte arriba
        var caja_a_perforarMesh = new THREE.Mesh(caja_a_perforar, materialSilla);
        var cilinderGeomMesh = new THREE.Mesh(cilinderGeom, materialSilla);
        var piezaGeomMesh = new THREE.Mesh(piezaGeom, materialSilla);
        var piezaGeom2Mesh = new THREE.Mesh(piezaGeom2, materialSilla);
        caja_a_perforar.translate(0, 2.5, 0); //La ponemos sobre plano XZ
        piezaGeom.translate(0.5, 2, 0); //La movemos 0.5 a la derecha y ponemos sobre plano XZ
        piezaGeom2.translate(1, 2.25, 0); //La ponemos sobre plano XZ y movemos a la derecha
        cilinderGeom.rotateX(Math.PI / 2); //Giramos cilindro
        cilinderGeom.translate(-1.5, 4, 0); //Hacemos la curva


        var csg_a_quitar = new CSG();
        csg_a_quitar.union([piezaGeomMesh, piezaGeom2Mesh, cilinderGeomMesh]);
        var csg_1 = new CSG();
        csg_1.subtract([caja_a_perforarMesh, csg_a_quitar.toMesh()]);

        this.pieza = csg_1.toMesh();
        this.pieza.rotateZ(Math.PI);
        this.pieza.scale.set(9.5, 11.5, 25.5);
        this.pieza.position.set(-820, 100, 0);
        this.add(this.pieza);

        var base = new THREE.CylinderGeometry(8, 30, 15, 15, 15, false);
        var apoyo = new THREE.CylinderGeometry(8, 8, 30, 15, 15, false);




        base.translate(-820, 7.5, 0);
        apoyo.translate(-820, 29, 0);

        var baseMesh = new THREE.Mesh(base, baseMat);
        var apoyoMesh = new THREE.Mesh(apoyo, apoyoMat);
        var csg = new CSG();
        csg.union([baseMesh, apoyoMesh]);
        this.result = csg.toMesh();
        this.add(this.result);


    }

    update() {}
}

export { MySilla }
