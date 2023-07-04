import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class MyMesaPuzzle extends THREE.Object3D {
    constructor() {
        super();
        this.mesaMesh = this.createMesa();
        this.mesaMesh.scale.set(1.1, 1, 1.1);
        this.mesaMesh.rotateX(Math.PI/2);
        this.mesaMesh.position.set(0, 255, -500);
        this.add(this.mesaMesh);

    }

    createMesa() {
        // Creacion de la mesa
        var materialMesa = new THREE.MeshPhongMaterial({color: '#4d4d4d'});
        var geometryMesa = new THREE.BoxGeometry(100, 8, 100);
        geometryMesa.translate(0, 4, 0);
        var mesa = new THREE.Mesh(geometryMesa, materialMesa);

        // Creacion de objeto para restar a la mesa
        var geometryMesaSub = new THREE.BoxGeometry(90, 8, 90);
        geometryMesaSub.translate(0, 8, 0);
        var mesaSub = new THREE.Mesh(geometryMesaSub, materialMesa);

        var csg = new CSG();
        csg.union([mesa]);
        csg.subtract([mesaSub]);

        var mesaFinal = csg.toMesh();

        return mesaFinal;
    }

    update() {}
}

export {MyMesaPuzzle}
