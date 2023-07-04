import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class MyBox extends THREE.Object3D {
    constructor() {
      super();

       
        // Crear las geometrias y material de las caras de la caja
        var material = new THREE.MeshPhongMaterial({color: '#737373'});
        var boxesGeoBottomTop = new THREE.BoxGeometry(50, 1, 50);
        var boxesRightLeftGeo = new THREE.BoxGeometry(50, 50, 1);
        var boxesFrontBackGeo = new THREE.BoxGeometry(1, 50, 50);

        this.boxBottomMesh = new THREE.Mesh(boxesGeoBottomTop, material);
        this.boxBottomMesh.position.y = 0.5;

        this.boxRightMesh = new THREE.Mesh(boxesRightLeftGeo, material);
        this.boxRightMesh.position.set(0, 25, -25);

        this.boxLeftMesh = new THREE.Mesh(boxesRightLeftGeo, material);
        this.boxLeftMesh.position.set(0, 25, 25);

        this.boxFrontMesh = new THREE.Mesh(boxesFrontBackGeo, material);
        this.boxFrontMesh.position.set(-25, 25, 0);

        this.boxBackMesh = new THREE.Mesh(boxesFrontBackGeo, material);
        this.boxBackMesh.position.set(25, 25, 0);

        this.boxTopMesh = new THREE.Mesh(boxesGeoBottomTop, material);
        this.boxTopMesh.rotation.z = 0;

        this.pivot = new THREE.Object3D();
        this.pivot.position.set(-25, 50, 0);
        this.pivot.add(this.boxTopMesh);
        this.pivot.children[0].position.x += 25;

        this.add(this.boxBottomMesh);
        this.add(this.boxRightMesh);
        this.add(this.boxLeftMesh);
        this.add(this.boxFrontMesh);
        this.add(this.boxBackMesh);
        this.add(this.pivot);

      
    }

    
    setAngle(value) {
        this.pivot.rotation.z = value;
    }

    createOpenAnimation() {
        var start = {angle: 0};
        var end = {angle: 1.0};
        var duration = 20000;

        var animation = new TWEEN.Tween(start).to(end, duration).onUpdate(() => {
            this.pivot.rotation.z = start.angle;
        }).onComplete(() => start.angle = 0).start();
    }

    update() {
        TWEEN.update();
    }
  }
  

export { MyBox }
  