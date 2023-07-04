import * as THREE from '../libs/three.module.js'

class MyPuzzle extends THREE.Object3D {
    constructor() {
        super();

        var puzzleTextura1 = new THREE.TextureLoader().load('../imgs/00.jpg');
        var puzzleTextura2 = new THREE.TextureLoader().load('../imgs/10.jpg');
        var puzzleTextura3 = new THREE.TextureLoader().load('../imgs/20.jpg');
        var puzzleTextura4 = new THREE.TextureLoader().load('../imgs/01.jpg');
        var puzzleTextura5 = new THREE.TextureLoader().load('../imgs/11.jpg');
        var puzzleTextura6 = new THREE.TextureLoader().load('../imgs/21.jpg');
        var puzzleTextura7 = new THREE.TextureLoader().load('../imgs/02.jpg');
        var puzzleTextura8 = new THREE.TextureLoader().load('../imgs/12.jpg');
        var puzzleTextura9 = new THREE.TextureLoader().load('../imgs/22.jpg');
        var puzzleMat1 = new THREE.MeshPhongMaterial({map: puzzleTextura1});
        var puzzleMat2 = new THREE.MeshPhongMaterial({map: puzzleTextura2});
        var puzzleMat3 = new THREE.MeshPhongMaterial({map: puzzleTextura3});
        var puzzleMat4 = new THREE.MeshPhongMaterial({map: puzzleTextura4});
        var puzzleMat5 = new THREE.MeshPhongMaterial({map: puzzleTextura5});
        var puzzleMat6 = new THREE.MeshPhongMaterial({map: puzzleTextura6});
        var puzzleMat7 = new THREE.MeshPhongMaterial({map: puzzleTextura7});
        var puzzleMat8 = new THREE.MeshPhongMaterial({map: puzzleTextura8});
        var puzzleMat9 = new THREE.MeshPhongMaterial({map: puzzleTextura9});


        var geoPuzzle1 = new THREE.BoxGeometry(30,4,30);
        var geoPuzzle2 = new THREE.BoxGeometry(30,4,30);
        var geoPuzzle3 = new THREE.BoxGeometry(30,4,30);
        var geoPuzzle4 = new THREE.BoxGeometry(30,4,30);
        var geoPuzzle5 = new THREE.BoxGeometry(30,4,30);
        var geoPuzzle6 = new THREE.BoxGeometry(30,4,30);
        var geoPuzzle7 = new THREE.BoxGeometry(30,4,30);
        var geoPuzzle8 = new THREE.BoxGeometry(30,4,30);
        var geoPuzzle9 = new THREE.BoxGeometry(30,4,30);

        this.puzzle1 = new THREE.Mesh(geoPuzzle1, puzzleMat1);
        this.puzzle2 = new THREE.Mesh(geoPuzzle2, puzzleMat2);
        this.puzzle3 = new THREE.Mesh(geoPuzzle3, puzzleMat3);
        this.puzzle4 = new THREE.Mesh(geoPuzzle4, puzzleMat4);
        this.puzzle5 = new THREE.Mesh(geoPuzzle5, puzzleMat5);
        this.puzzle6 = new THREE.Mesh(geoPuzzle6, puzzleMat6);
        this.puzzle7 = new THREE.Mesh(geoPuzzle7, puzzleMat7);
        this.puzzle8 = new THREE.Mesh(geoPuzzle8, puzzleMat8);
        this.puzzle9 = new THREE.Mesh(geoPuzzle9, puzzleMat9);
        
         this.puzzle1.userData = this;
        this.puzzle1.name = 'pieza_1';

         this.puzzle2.userData = this;
        this.puzzle2.name = 'pieza_2';

         this.puzzle3.userData = this;
        this.puzzle3.name = 'pieza_3';

         this.puzzle4.userData = this;
        this.puzzle4.name = 'pieza_4';

         this.puzzle5.userData = this;
        this.puzzle5.name = 'pieza_5';

         this.puzzle6.userData = this;
        this.puzzle6.name = 'pieza_6';

         this.puzzle7.userData = this;
        this.puzzle7.name = 'pieza_7';

        this.puzzle8.userData = this;
        this.puzzle8.name = 'pieza_8';

         this.puzzle9.userData = this;
        this.puzzle9.name = 'pieza_9';
        
        // Posiciones para el puzzle resuelto
      /*  this.puzzle1.position.set(-31, 2, -31);
        this.puzzle2.position.set(0, 2, -31);
        this.puzzle3.position.set(31, 2, -31);
        this.puzzle4.position.set(-31, 2, 0);
        this.puzzle5.position.set(0, 2, 0);
        this.puzzle6.position.set(31, 2, 0);
        this.puzzle7.position.set(-31, 2, 31);
        this.puzzle8.position.set(0, 2, 31);
        this.puzzle9.position.set(31, 2, 31);
*/
       // Posiciones para el puzzle sin resolver
         this.puzzle4.position.set(-31, 2, -31);
         this.puzzle7.position.set(0, 2, -31);
         this.puzzle1.position.set(31, 2, -31);
         this.puzzle8.position.set(-31, 2, 0);
         this.puzzle2.position.set(0, 2, 0);
         this.puzzle5.position.set(31, 2, 0);
         this.puzzle3.position.set(-31, 2, 31);
         this.puzzle9.position.set(0, 2, 31);
         this.puzzle6.position.set(31, 2, 31);

        // Almacenar la posicion en la escena del cada pieza
         this.posPiece1 = new THREE.Vector3();
         this.posPiece2 = new THREE.Vector3();
         this.posPiece3 = new THREE.Vector3();
         this.posPiece4 = new THREE.Vector3();
         this.posPiece5 = new THREE.Vector3();
         this.posPiece6 = new THREE.Vector3();
         this.posPiece7 = new THREE.Vector3();
         this.posPiece8 = new THREE.Vector3();
         this.posPiece9 = new THREE.Vector3();

        this.add(this.puzzle1);
        this.add(this.puzzle2);
        this.add(this.puzzle3);
        this.add(this.puzzle4);
        this.add(this.puzzle5);
        this.add(this.puzzle6);
        this.add(this.puzzle7);
        this.add(this.puzzle8);
        this.add(this.puzzle9);
    }

     onClick(selectedObject) {
         var position = new THREE.Vector3();
         return selectedObject.getWorldPosition(position);
     }

    update() {}
}

export {MyPuzzle}
