import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'


class MyR2D2 extends THREE.Object3D {
    constructor() {
        super();

        this.movCuerpo = 1;
        this.movCuerpo2 = 0;
        this.subir = true;
        this.subir = false;

        // Materiales R2D2
        var texturetorso = new THREE.TextureLoader().load('../imgs/prueba-seccion.png');
        var texturaCabeza = new THREE.TextureLoader().load('../imgs/body.jpeg');
        this.materialCabeza = new THREE.MeshPhongMaterial({
            color: '#D5D5D5',
            map: texturaCabeza,
            side: THREE.DoubleSide,
            transparent: true,
        });

        this.materialPatas = new THREE.MeshPhongMaterial({ color: '#e6e6e6' });
        this.materialamar = new THREE.MeshPhongMaterial({ color: '#e6e6e6' });

        // Geometria R2D2
        this.cabezaGeo = new THREE.SphereGeometry(50, 30, 30, 0, Math.PI);
        this.cabezaGeo.rotateX(-Math.PI / 2);
        this.cuerpoGeo = new THREE.CylinderGeometry(50, 50, 100, 30, 30, false);
        
        // Definir el recuadro de textura deseado en el cilindro del torso
        const uMin = 0.35;    // Coordenada U mínima
        const uMax = 0.65;    // Coordenada U máxima
        const vMin = 0.2;     // Coordenada V mínima
        const vMax = 0.9;     // Coordenada V máxima


        const uvAttribute = this.cuerpoGeo.getAttribute("uv");
        const uvArray = uvAttribute.array;

        // Actualizar las coordenadas de textura del recuadro en el cilindro del torso
        //const torsoUvs = this.cuerpoGeo.faceVertexUvs[0];  // Obtener las coordenadas de textura del torso (pueden variar dependiendo de la estructura de tu geometría)
        //Ponemos los puntos para que se vea la imagen en el torso, no en todo el cilindro
        for (let i = 0; i < uvArray.length; i += 2) {
            const u = uvArray[i];
            const v = uvArray[i + 1];

            if (u >= uMin && u <= uMax && v >= vMin && v <= vMax) {
                uvArray[i] = (u - uMin) / (uMax - uMin);
                uvArray[i + 1] = (v - vMin) / (vMax - vMin);
            } else {
                uvArray[i] = 0;    // Asignar coordenadas de textura 0 fuera del rectángulo
                uvArray[i + 1] = 0;
            }
        }
        //Ponemos la misma imagen en la parte de atras del torso


        this.materialCuerpo = new THREE.MeshPhongMaterial({
            color: '#ECECEC',
            map: texturetorso,
            side: THREE.DoubleSide,
            transparent: true,
        });

        uvAttribute.needsUpdate = true;
        
        const vertices = this.cabezaGeo.attributes.position;
        const uvs = new Float32Array(vertices.count * 2);

        for (let i = 0; i < vertices.count; i++) {
            const vertex = new THREE.Vector3().fromBufferAttribute(vertices, i);
            const phi = Math.atan2(vertex.z, vertex.x);
            const theta = Math.acos(vertex.y / Math.sqrt(vertex.x ** 2 + vertex.y ** 2 + vertex.z ** 2));

            const u = 1 - (phi + Math.PI) / (2 * Math.PI);
            const v = (theta + Math.PI / 2) / Math.PI;

            uvs[i * 2] = u;
            uvs[i * 2 + 1] = v;
        }

        this.cabezaGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

        this.patas = new THREE.BoxGeometry(20, 100, 25);
        this.basePata = new THREE.CylinderGeometry(25, 30, 25, 4, 4, false);

        this.patas.translate(0, 50, 0);

        this.cabezaMesh = new THREE.Mesh(this.cabezaGeo, this.materialCabeza);
        this.cabezaMesh.position.y = 130;
        this.cuerpoMesh = new THREE.Mesh(this.cuerpoGeo, this.materialCuerpo);
        this.cuerpoMesh.rotateY(Math.PI);
        this.cuerpoMesh.position.y = 80;

        // Unir cuerpo y cabeza
       /* this.cuerpoCompleto = new THREE.Object3D();
        this.cuerpoCompleto.add(this.cabezaMesh);
        this.cuerpoCompleto.add(this.cuerpoMesh);*/

        // Crear pivote para rotación
        this.pivot = new THREE.Object3D();
        this.pivot.position.set(0, 80, 0);
        this.pivot.add(this.cabezaMesh);
        this.pivot.add(this.cuerpoMesh);
        this.pivot.children[0].position.y -= 80;
        this.pivot.children[1].position.y -= 80;


        this.pata1 = new THREE.Mesh(this.patas, this.materialPatas);
        this.pata1.scale.y = this.movCuerpo;
        this.pata1.position.x = 60;
        this.pata1.position.y = 15;
        this.pata2 = new THREE.Mesh(this.patas, this.materialPatas);
        this.pata2.scale.y = this.movCuerpo;
        this.pata2.position.x = -60;
        this.pata2.position.y = 15;

        this.base1 = new THREE.Mesh(this.basePata, this.materialamar);
        this.base1.rotateY(Math.PI / 4);
        this.base1.position.y = 12.5;
        this.base1.position.x = 60;

        this.base2 = new THREE.Mesh(this.basePata, this.materialamar);
        this.base2.rotateY(Math.PI / 4);
        this.base2.position.y = 12.5;
        this.base2.position.x = -60;

        this.r2d2 = new THREE.Object3D();
        this.r2d2.add(this.pata1);
        this.r2d2.add(this.pata2);
        this.r2d2.add(this.base1);
        this.r2d2.add(this.base2);
        this.r2d2.add(this.pivot);

        this.r2d2.position.set(-900, 0, -420);
        this.cuerpoMesh.name = 'r2d2';
        this.add(this.r2d2);

        this.rotateFirstAnimation();
        this.rotateSecondAnimation();
        this.rotateThirdAnimation();
        this.rotateFourthAnimation();
        this.createRouteAnimation();

    }

    createRouteAnimation() {
        this.rightPath = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-900, 0, -420),
            new THREE.Vector3(-900, 0, -300),
            new THREE.Vector3(-800, 0, -200),
            new THREE.Vector3(-700, 0, -100),
            new THREE.Vector3(-650, 0, -50),
            new THREE.Vector3(-640, 0, -50),
            new THREE.Vector3(-140, 0, -50),
            new THREE.Vector3(-100, 0, -30),
            new THREE.Vector3(-80, 0, -30),
            new THREE.Vector3(-70, 0, -30),
            new THREE.Vector3(-40, 0, -20),
            new THREE.Vector3(-20, 0, -20),
            new THREE.Vector3(-10, 0, -20),
            new THREE.Vector3(-5, 0, -10),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(10, 0, 10),
            new THREE.Vector3(20, 0, 20),
            new THREE.Vector3(30, 0, 30),
            new THREE.Vector3(60, 0, 60),
            new THREE.Vector3(100, 0, 100),
            new THREE.Vector3(200, 0, 200),
            new THREE.Vector3(300, 0, 300),
            new THREE.Vector3(350, 0, 350),
            new THREE.Vector3(360, 0, 340),
            new THREE.Vector3(380, 0, 320),
            new THREE.Vector3(380, 0, 300),
            new THREE.Vector3(380, 0, -300),
            new THREE.Vector3(370, 0, -300),
            new THREE.Vector3(350, 0, -300),
            new THREE.Vector3(300, 0, -300),
            new THREE.Vector3(-800, 0, -300),
            new THREE.Vector3(-800, 0, -400),
            new THREE.Vector3(-900, 0, -420),
        ]);

        // Animacion de la parte derecha de la ruta
        var start = { t: 0 };
        var end = { t: 1 };
        var time = 100000;

        this.routeAnimation = new TWEEN.Tween(start).to(end, time).onUpdate(() => {
            var position = this.rightPath.getPointAt(start.t);
            this.r2d2.position.copy(position);
            var tangent = this.rightPath.getTangentAt(start.t);
            position.add(tangent);
            this.r2d2.lookAt(position);
        }).onComplete(() => start.t = 0).repeat(Infinity).start();
    }

    rotateFirstAnimation() {
        var start = { xAngle: 0.15 };
        var end = { xAngle: 0 };
        var time = 2000;

        this.rotateAnimFirst = new TWEEN.Tween(start).to(end, time).onUpdate(() => {
            this.pivot.rotation.x = start.xAngle;
        }).onComplete(() => start.xAngle = 0).start();

    }

    rotateSecondAnimation() {
        var start = { xAngle: 0 };
        var end = { xAngle: -0.15 };
        var time = 2000;

        this.rotateAnimSecond = new TWEEN.Tween(start).to(end, time).onUpdate(() => {
            this.pivot.rotation.x = start.xAngle;
        }).onComplete(() => start.xAngle = 0);
    }

    rotateThirdAnimation() {
        var start = { xAngle: -0.15 };
        var end = { xAngle: 0 };
        var time = 2000;

        this.rotateAnimThird = new TWEEN.Tween(start).to(end, time).onUpdate(() => {
            this.pivot.rotation.x = start.xAngle;
        }).onComplete(() => start.xAngle = 0);
    }

    rotateFourthAnimation() {
        var start = { xAngle: 0 };
        var end = { xAngle: 0.15 };
        var time = 2000;

        this.rotateAnimFourth = new TWEEN.Tween(start).to(end, time).onUpdate(() => {
            this.pivot.rotation.x = start.xAngle;
        }).onComplete(() => start.xAngle = 0);

        this.rotateAnimFirst.chain(this.rotateAnimSecond);
        this.rotateAnimSecond.chain(this.rotateAnimThird);
        this.rotateAnimThird.chain(this.rotateAnimFourth);
        this.rotateAnimFourth.chain(this.rotateAnimFirst);
    }

    update() {
        this.cabezaMesh.rotation.y += 0.01;

        if (this.subir) {
            this.movCuerpo += 0.001;
            this.pivot.position.y += 0.07;
            this.pata1.scale.y = this.movCuerpo;
            this.pata2.scale.y = this.movCuerpo;
        }

        if (this.bajar) {
            this.movCuerpo -= 0.001;
            this.pivot.position.y -= 0.07;
            this.pata1.scale.y = this.movCuerpo;
            this.pata2.scale.y = this.movCuerpo;
        }

        if (this.pivot.position.y >= 89) {
            this.subir = false;
            this.bajar = true;
        }

        if (this.pivot.position.y <= 81) {
            this.subir = true;
            this.bajar = false;
        }

        TWEEN.update();
    }




}

export { MyR2D2 }