
import * as THREE from '../libs/three.module.js'
import { PointerLockControls } from '../libs/PointerLockControls.js'
import * as KeyCode from '../libs/keycode.esm.js'

class MyFirstPersonCamera extends THREE.Object3D {
    constructor() {
        super();

        var camera = new THREE. PerspectiveCamera (45 , window.innerWidth / window.innerHeight , 5 , 2000);
        camera.position.set (0,175,0);
        camera.lookAt (new THREE.Vector3 (0,175,-1));

        this.camController = new PointerLockControls(camera, this.renderer.domElement);
        this.add(camera);
    }

    lockMouse(event) {

        var key = event.which || event.key;

        switch (key) {
            case KeyCode.KEY_CONTROL:
                console.log('Raton bloqueado');
                this.camController.lock();
                break;
        
            default:
                break;
        }
    }

    unlockMouse(event) {
        var key = event.which || event.key;

        switch (key) {
            case KeyCode.KEY_CONTROL:
                console.log('Raton desbloqueado');
                this.camController.unlock();
                break;
        
            default:
                break;
        }
    }
}

export { MyFirstPersonCamera }