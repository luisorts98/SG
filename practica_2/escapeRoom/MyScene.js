
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { PointerLockControls } from '../libs/PointerLockControls.js'
import * as KeyCode from '../libs/keycode.esm.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'
import { TransformControls } from '../libs/TransformControls.js'

// Clases de mi proyecto
import { MyControlPanel } from './MyControlPanel.js';
import { MyStormTrooper } from './MyStormTrooper.js';
import { MyR2D2 } from './MyR2D2.js';
import { MyLight } from './MyLight.js';
import { MySilla } from './MySilla.js';
import { MyHologram } from './MyHologram.js';
import { MyMesaPuzzle } from './MyMesaPuzzle.js';
import { MyPuzzle } from './MyPuzzle.js';
import { MyBasePuerta } from './MyBasePuerta.js';
import { MyPuerta } from './MyPuerta.js';
import { MyEstructura } from './MyEstructura.js';
import { MyEstructuraVentana } from './MyEstructuraVentana.js';
import { MyLever } from './MyLever.js'
import { MyPieza3 } from './Mypieza3.js'
import { MyPanel2 } from './MyPanel2.js'
import { MyBoton } from './MyBoton.js'
import { MyBox } from './MyBox.js'
import { MyPieza1 } from './MyPieza1.js'
import { Boton2 } from './Boton2.js'
import { MyPieza2 } from './MyPieza2.js'
import { MyC3PO } from './MyC3PO.js'
import { MySable } from './MySable.js'
import { MyVader } from './MyVader.js'
 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

var selectedObject = new THREE.Mesh();
var previousObject = new THREE.Mesh();
var originalColor = new THREE.Color(1, 1, 1);

class MyScene extends THREE.Scene {

  // Recibe el  div  que se ha creado en el  html  que va a ser el lienzo en el que mostrar
  // la visualización de la escena
  constructor (myCanvas) { 
    super();

    // Variables para controlar la resolución de las pruebas
    this.puzzleIsCorrect = false;
    this.objectsAreCorrect = false;
    this.riddleIsCorrect = false;
    this.gameResolve = false;
    this.cambiarModo = false;
    this.comienzo = false;

    // Posicion de los huecos para colocar los objetos de la segunda prueba
    this.correctPosObj1 = new THREE.Vector3(-974, 82.6, 0);
    this.correctPosObj2 = new THREE.Vector3(-953, 80.6, -10.1);
    this.correctPosObj3 = new THREE.Vector3(-950, 50, 150);

    // Respuesta de la tercera prueba
    this.riddleAnswer = '';

    
    this.positionOfPieces = [];
    this.positionsAreCorrect = new Array(9).fill(false);
    this.positionOfPieces.push(new THREE.Vector3(-31, 286, -491));
    this.positionOfPieces.push(new THREE.Vector3(0, 286, -491));
    this.positionOfPieces.push(new THREE.Vector3( 31, 286, -491 ));
    this.positionOfPieces.push(new THREE.Vector3(-31, 255, -491));
    this.positionOfPieces.push(new THREE.Vector3(0, 255, -491));
    this.positionOfPieces.push(new THREE.Vector3(31, 255, -491));
    this.positionOfPieces.push(new THREE.Vector3(-31, 224, -491 ));
    this.positionOfPieces.push(new THREE.Vector3(0, 224, -491 ));
    this.positionOfPieces.push(new THREE.Vector3(31, 224, -491));

    // Variables para la gestion de colisiones
    this.candidatesToCollision = [];
    this.cameraPosition = new THREE.Vector3();
    this.cameraDirection = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.raycasterAux = new THREE.Raycaster();
    this.moveForward = true;

    // Variables para picking
    this.mouse = new THREE.Vector2();
    this.pointClick = new THREE.Vector3();
    this.initialMousePosition = new THREE.Vector2();
    this.raycasterMouse = new THREE.Raycaster();
    this.pickableObjects = [];
    // this.selectedObject = new THREE.Mesh();

    // Variables para mover objetos por la escena
    this.moveMouse = new THREE.Vector2();
    this.raycasterMove = new THREE.Raycaster();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se crea la interfaz gráfica de usuario
    this.gui = this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    // this.createCamera ();
    this.createFirstPersonCamera();
    
    // Un suelo 
    this.createGround ();
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    
    // Control Panel
    this.controlPanel = new MyControlPanel();
    this.add(this.controlPanel);
    this.candidatesToCollision.push(this.controlPanel.controlPanel);

    // StromTrooper
    this.myStormTroopers = new MyStormTrooper();
    this.add(this.myStormTroopers);
    this.candidatesToCollision.push(this.myStormTroopers.cubo1);
    this.candidatesToCollision.push(this.myStormTroopers.cubo2);

    //C3PO
    this.myC3PO = new MyC3PO();
    this.add(this.myC3PO);
    this.candidatesToCollision.push(this.myC3PO.cuboC3PO);
    // R2D2
    this.myR2D2 = new MyR2D2();
    this.add(this.myR2D2);
    this.candidatesToCollision.push(this.myR2D2.r2d2);
    //Vader
    this.myVader = new MyVader();
    this.add(this.myVader);
    this.candidatesToCollision.push(this.myVader.cuboVader);
    // Luces techo
    this.myLight = new MyLight();
    this.add(this.myLight);

    // Silla
    this.mySilla = new MySilla();
    this.add(this.mySilla);
    this.candidatesToCollision.push(this.mySilla.result);

    // Holograma
    this.myHologram = new MyHologram();
    this.add(this.myHologram);
    this.candidatesToCollision.push(this.myHologram.baseMesh);
    this.candidatesToCollision.push(this.myHologram.hologramMesh);

    // Mesa Puzzle
    this.myMesaPuzzle = new MyMesaPuzzle();
    this.add(this.myMesaPuzzle);
    this.candidatesToCollision.push(this.myMesaPuzzle.mesaMesh);

    // Puzzle
    this.myPuzzle = new MyPuzzle();
    this.myPuzzle.rotateX(Math.PI/2);
    this.myPuzzle.position.set(0, 255, -493);
    this.add(this.myPuzzle);
    this.candidatesToCollision.push(this.myPuzzle.puzzle1);
    this.pickableObjects.push(this.myPuzzle.puzzle1);
    this.candidatesToCollision.push(this.myPuzzle.puzzle2);
    this.pickableObjects.push(this.myPuzzle.puzzle2);
    this.candidatesToCollision.push(this.myPuzzle.puzzle3);
    this.pickableObjects.push(this.myPuzzle.puzzle3);
    this.candidatesToCollision.push(this.myPuzzle.puzzle4);
    this.pickableObjects.push(this.myPuzzle.puzzle4);
    this.candidatesToCollision.push(this.myPuzzle.puzzle5);
    this.pickableObjects.push(this.myPuzzle.puzzle5);
    this.candidatesToCollision.push(this.myPuzzle.puzzle6);
    this.pickableObjects.push(this.myPuzzle.puzzle6);
    this.candidatesToCollision.push(this.myPuzzle.puzzle7);
    this.pickableObjects.push(this.myPuzzle.puzzle7);
    this.candidatesToCollision.push(this.myPuzzle.puzzle8);
    this.pickableObjects.push(this.myPuzzle.puzzle8);
    this.candidatesToCollision.push(this.myPuzzle.puzzle9);
    this.pickableObjects.push(this.myPuzzle.puzzle9);

   // Puerta
    this.myBasePuerta = new MyBasePuerta();
    this.myBasePuerta.position.set(1000, 10, -150);
    this.add(this.myBasePuerta);
    this.candidatesToCollision.push(this.myBasePuerta.basePuertaMesh);

    this.myPuerta = new MyPuerta();
    this.add(this.myPuerta);
    this.candidatesToCollision.push(this.myPuerta.puertaMesh);
    this.candidatesToCollision.push(this.myPuerta.puertaMesh2);
    

    this.myEstructura = new MyEstructura();
    this.myEstructura.scale.set(1.08, 1.08, 1.12);
    this.myEstructura.position.set(1000, 0,);

    this.add(this.myEstructura);
    this.candidatesToCollision.push(this.myEstructura.f);
    this.candidatesToCollision.push(this.myEstructura.csg3F);
    this.candidatesToCollision.push(this.myEstructura.luz1Mesh);
    this.candidatesToCollision.push(this.myEstructura.luz2Mesh);
    this.candidatesToCollision.push(this.myEstructura.pantallaMesh);
    this.pickableObjects.push(this.myEstructura.luz1Mesh2);


    //Estructura ventana
    this.myEstructuraVentana = new MyEstructuraVentana();
    this.add(this.myEstructuraVentana);
    this.candidatesToCollision.push(this.myEstructuraVentana.estructura1);
    this.candidatesToCollision.push(this.myEstructuraVentana.estructura2);
    this.candidatesToCollision.push(this.myEstructuraVentana.estructura3);
    this.candidatesToCollision.push(this.myEstructuraVentana.estructura4);
    this.candidatesToCollision.push(this.myEstructuraVentana.estructura5);
    this.candidatesToCollision.push(this.myEstructuraVentana.estructura6);

    //Lever
    this.myLever = new MyLever();
    this.add(this.myLever);
    // this.candidatesToCollision.push(this.myLever.leverMesh);

    // Pieza1
    this.myPieza1 = new MyPieza1();
    //this.myPieza1.position.set(-974, 120, 0);
    this.myPieza1.position.set(70, 12, 440);
    this.add(this.myPieza1);
  //  this.pickableObjects.push(this.myPieza1.pieza1);

    // Pieza2
    this.myPieza2 = new MyPieza2();
    //this.myPieza2.position.set(-953, 150, -10.1);
    this.myPieza2.position.set(-200, -30, 200);
    this.myPieza2.scale.set(2, 2, 2);
    this.add(this.myPieza2);
   
    //Pieza3
    this.myPieza3 = new MyPieza3();
    // * Posicion final de pieza 3
    //this.myPieza3.position.set(-950, 50, 300);
    this.myPieza3.position.set(920, 10, -300);
    // * Posicion de prueba pieza 3
     this.add(this.myPieza3);
    

    //Panel2
    this.myPanel2 = new MyPanel2();
    this.add(this.myPanel2);

    //Boton
    this.myBoton = new MyBoton();
    this.add(this.myBoton);
    // this.pickableObjects.push(this.myBoton.modelo);
   
    //Boton2
    this.myBoton2 = new Boton2();
    this.add(this.myBoton2);
    this.pickableObjects.push(this.myBoton2.auxBoxMesh);

    // Caja
    this.myBox = new MyBox();
    this.myBox.position.set(-200, -50.5, 200);
    this.add(this.myBox);
    this.candidatesToCollision.push(this.myBox);

    //sable
    this.mySable = new MySable();
    this.mySable.scale.set(1.2, 1.2, 1.2);
    this.add(this.mySable);
    this.candidatesToCollision.push(this.mySable.cuboSable);

    this.createAudio();

    // Mostrar mensaje al inicio del juego
    this.setStartMessage();
  
  }

  setStartMessage() {
    $('#start').modal('show');
  }

  setEndMessage() {
    $('#end').modal('show');
  }

  setPuzzleMessage() {
    $('#puzzle').modal('show');
  }

  setObjectsMessage() {
    $('#objects').modal('show');
  }

  setRiddleMessage() {
    var that = this;

    $('#riddleModal').modal('show');
    $('#riddleSelect').on('click',function() {
      // alert($(this).val());
      console.log($(this).val());
      that.riddleAnswer = $(this).val();

      if (that.riddleAnswer == '1977') {
        that.riddleIsCorrect = true;
        that.pickableObjects.push(that.myEstructura.luz1Mesh);
        that.changeLightsColor();
        console.log('Tercera prueba resuelta');
      }
    });
  }

  changeLightsColor() {
    // Cuando se resuelve la tercera prueba las luces de las puertas cambian a color verde
    this.myBasePuerta.luz1Mesh.material.color.set(0x21CF4D);
    this.myBasePuerta.luz1Mesh.material.emissive.set(0x21CF4D);
    this.myBasePuerta.luz12Mesh.material.color.set(0x21CF4D);
    this.myBasePuerta.luz12Mesh.material.emissive.set(0x21CF4D);

    this.myBasePuerta.luz2Mesh.material.color.set(0x21CF4D);
    this.myBasePuerta.luz2Mesh.material.emissive.set(0x21CF4D);
    this.myBasePuerta.luz22Mesh.material.color.set(0x21CF4D);
    this.myBasePuerta.luz22Mesh.material.emissive.set(0x21CF4D);

    this.myBasePuerta.light1.color.set(0x21CF4D);
    this.myBasePuerta.light2.color.set(0x21CF4D);
    this.myBasePuerta.light3.color.set(0x21CF4D);
    this.myBasePuerta.light4.color.set(0x21CF4D);
    this.myBasePuerta.light5.color.set(0x21CF4D);
    this.myBasePuerta.light6.color.set(0x21CF4D);
    this.myBasePuerta.light7.color.set(0x21CF4D);
    this.myBasePuerta.light8.color.set(0x21CF4D);
  }

  // Background music
  createAudio(){
    const listener = new THREE.AudioListener();
    this.firstPersonCamera.add(listener);

    var that = this;
    this.sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('../music/background_music.mp3',
    function (buffer){
      console.log('Audio file loaded successfully!');
      that.sound.setBuffer(buffer);
      that.sound.setLoop(false);
      that.sound.setVolume(0.1);
    });

    this.firstPersonCamera.add(this.sound);
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    // También se indica dónde se coloca
    this.camera.position.set (6, 3, 6);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }

  onKeyDown(event) {

    var key = event.which || event.key;

    switch (key) {
        case KeyCode.KEY_CONTROL:
          if (!this.camController.isLocked) {
            this.camController.lock();
          }
          else {
            this.camController.unlock();
          }
        break;

          case KeyCode.KEY_W:
            this.moveForward = true;
            // this.camController.moveForward(20.0);
          break;
        
        case KeyCode.KEY_S:
          this.moveForward = false;
        break;

        case KeyCode.KEY_UP:
          if (selectedObject != null) {
            console.log('Moviendo pieza hacia arriba');
            selectedObject.position.z -= 1;
          }
        break;

        case KeyCode.KEY_DOWN:
          if (selectedObject != null) {
            console.log('Moviendo pieza hacia abajo');
            selectedObject.position.z += 1;
          }
        break;

        case KeyCode.KEY_LEFT:
          if (selectedObject != null) {
            console.log('Moviendo pieza hacia abajo');
            selectedObject.position.x -= 1;
          }
        break;

        case KeyCode.KEY_RIGHT:
          if (selectedObject != null) {
            console.log('Moviendo pieza hacia abajo');
            selectedObject.position.x += 1;
          }
        break;
        case KeyCode.KEY_TAB:
          this.cambiarModo=!this.cambiarModo;

    
        default:
            break;
    }

    if (this.moveForward && key == KeyCode.KEY_W) {
      this.cameraPosition.copy(this.firstPersonCamera.position);
      this.camController.getDirection(this.cameraDirection);

      if (!this.checkCollision(this.cameraPosition, this.cameraDirection)) {
        this.camController.moveForward(20.0);
      }
    }
    else if (!this.moveForward && key == KeyCode.KEY_S) {
      this.cameraPosition.copy(this.firstPersonCamera.position);
      this.camController.getDirection(this.cameraDirection);

      if (!this.checkCollision(this.cameraPosition, this.cameraDirection.negate())) {
        this.camController.moveForward(-20.0);
      }
    }
    else if (key == KeyCode.KEY_D) {
      this.cameraPosition.copy(this.firstPersonCamera.position);
      this.camController.getDirection(this.cameraDirection);

      if (!this.checkCollision(this.cameraPosition, this.cameraDirection.applyAxisAngle(
        new THREE.Vector3(0,1,0), -Math.PI/2
      ))) {
        this.camController.moveRight(20.0);
      }
    }
    else if (key == KeyCode.KEY_A) {
      this.cameraPosition.copy(this.firstPersonCamera.position);
      this.camController.getDirection(this.cameraDirection);
      
      if (!this.checkCollision(this.cameraPosition, this.cameraDirection.applyAxisAngle(
        new THREE.Vector3(0,1,0), Math.PI/2
      ))) {
        this.camController.moveRight(-20.0);
      }
    }
  }

  checkPiecePosition(name, position) {
    var correctPosition = false;

    switch (name) {
      case 'pieza_1':
        if (position.x == this.positionOfPieces[0].x && position.y == this.positionOfPieces[0].y && position.z == this.positionOfPieces[0].z) {
          correctPosition = true;
          this.positionsAreCorrect[0] = true;
        }
        break;
      case 'pieza_2':
        if (position.x == this.positionOfPieces[1].x && position.y == this.positionOfPieces[1].y && position.z == this.positionOfPieces[1].z) {
          correctPosition = true;
          this.positionsAreCorrect[1] = true;
        }
        break;
      case 'pieza_3':
        if (position.x == this.positionOfPieces[2].x && position.y == this.positionOfPieces[2].y && position.z == this.positionOfPieces[2].z) {
          correctPosition = true;
          this.positionsAreCorrect[2] = true;
        }
        break;
      case 'pieza_4':
        if (position.x == this.positionOfPieces[3].x && position.y == this.positionOfPieces[3].y && position.z == this.positionOfPieces[3].z) {
          correctPosition = true;
          this.positionsAreCorrect[3] = true;
        }
        break;
      case 'pieza_5':
        if (position.x == this.positionOfPieces[4].x && position.y == this.positionOfPieces[4].y && position.z == this.positionOfPieces[4].z) {
          correctPosition = true;
          this.positionsAreCorrect[4] = true;
        }
        break;
      case 'pieza_6':
        if (position.x == this.positionOfPieces[5].x && position.y == this.positionOfPieces[5].y && position.z == this.positionOfPieces[5].z) {
          correctPosition = true;
          this.positionsAreCorrect[5] = true;
        }
        break;
      case 'pieza_7':
        if (position.x == this.positionOfPieces[6].x && position.y == this.positionOfPieces[6].y && position.z == this.positionOfPieces[6].z) {
          correctPosition = true;
          this.positionsAreCorrect[6] = true;
        }
        break;
      case 'pieza_8':
        if (position.x == this.positionOfPieces[7].x && position.y == this.positionOfPieces[7].y && position.z == this.positionOfPieces[7].z) {
          correctPosition = true;
          this.positionsAreCorrect[7] = true;
        }
        break;
      case 'pieza_9':
        if (position.x == this.positionOfPieces[8].x && position.y == this.positionOfPieces[8].y && position.z == this.positionOfPieces[8].z) {
          correctPosition = true;
          this.positionsAreCorrect[8] = true;
        }
        break;
    
      default:
        break;
    }

    return correctPosition;
  }

  checkPuzzleIsCorrect() {
    var isCorrect = this.positionsAreCorrect.every((pos) => {
      return pos === true;
    });

    return isCorrect;
  }

  onMouseDown(event) {
    switch (event.which) {
      case 1:

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

        this.raycasterMouse.setFromCamera(this.mouse, this.firstPersonCamera);

        var pickedObjects = this.raycasterMouse.intersectObjects(this.pickableObjects, true);

        if (pickedObjects.length > 0) {
          
          // Obtener el mesh sobre el que se ha hecho click
          selectedObject = pickedObjects[0].object;

          // El objeto seleccionado es una pieza del puzzle
          if (selectedObject.name.startsWith("pieza_") && this.comienzo && !this.puzzleIsCorrect) {
            console.log('El objeto seleccionado es una pieza del puzzle');

            if (previousObject !== selectedObject) {
              previousObject.material.color.copy(originalColor);
            }
            // originalColor = selectedObject.material.color.clone();
            console.log(originalColor);
            selectedObject.material.color.set(0x737373);
            var position = new THREE.Vector3();
            selectedObject.getWorldPosition(position);
            console.log(position);
            console.log(selectedObject.userData.onClick(selectedObject));
            console.log(selectedObject.name);
  
            if (this.checkPiecePosition(selectedObject.name, position)) {
              console.log(selectedObject.name + ' en el lugar correcto');
            }
  
            if (this.checkPuzzleIsCorrect()) {
              this.puzzleIsCorrect = true;
              this.setPuzzleMessage();
              console.log('El puzzle esta resuelto!');
              // Abrir caja para la segunda prueba
              this.myBox.createOpenAnimation();
              // this.openDoorAnimation();
              // Controles para manejar los objetos de la segunda prueba
              this.transformControls1 = new TransformControls( this.firstPersonCamera, this.renderer.domElement );
              this.transformControls2 = new TransformControls( this.firstPersonCamera, this.renderer.domElement );
              this.transformControls3 = new TransformControls( this.firstPersonCamera, this.renderer.domElement );

              this.transformControls1.size = 0.5;
              this.transformControls2.size = 0.5;
              this.transformControls3.size = 0.5;
              
              this.transformControls1.attach( this.myPieza1 );
              this.transformControls2.attach( this.myPieza2 );
              this.transformControls3.attach( this.myPieza3 );
              this.add( this.transformControls1 );
              this.add( this.transformControls2 );
              this.add( this.transformControls3 );
             
              this.transformControls1.setMode( "translate");
              this.transformControls2.setMode( "translate" );
              this.transformControls3.setMode( "translate" );
            }
  
            previousObject = selectedObject;

          } else if (selectedObject.name.startsWith("pieza_")) {
            selectedObject.material.color.copy(originalColor);
            selectedObject = null;
          }
          else if (selectedObject.name === 'r2d2' && !this.riddleIsCorrect) {
            console.log('R2D2 seleccionado!');
            selectedObject.material.color.set(0x737373);
            this.setRiddleMessage();
          }
          else if (selectedObject.name === 'pomo') {
            this.openDoorAnimation();
            selectedObject.material.color.set(0x99ff66);
            this.setEndMessage();
          }
          else if (selectedObject.name === 'pomo2') {
            this.openDoorAnimation();
            selectedObject.material.color.set(0x99ff66);
            setTimeout(() => {
              this.closeDoorAnimation();
            }, 10000);
          }
          else if (selectedObject.name === 'startButton') {
            console.log('Comenzar musica y video');
            selectedObject.material.color.set(0x737373);
            // Reproducir música de fondo
            this.sound.play();
            // Reproducir video
            this.comienzo = true;
            this.textureElement.play();

          }
        }
        

        break;
    
      default:
        break;
    }
  }

  checkGameComplete() {
    if (this.puzzleIsCorrect && this.objectsAreCorrect) {
      console.log('Primeras dos pruebas resueltas');
      // this.openDoorAnimation();
    }
  }

  createFirstPersonCamera() {
    this.firstPersonCamera = new THREE. PerspectiveCamera (45 , window.innerWidth / window.innerHeight , 5 , 5000);
    this.firstPersonCamera.position.set(1500,175,0);
    this.firstPersonCamera.lookAt (new THREE.Vector3 (-1,175,0));

    this.camController = new PointerLockControls(this.firstPersonCamera, this.renderer.domElement);
    this.add(this.firstPersonCamera);
  }

  checkCollision(position, direction) {
    // Configurar raycaster
    this.raycaster.set(position, direction);
    this.raycasterAux.set(position.setY(40) , direction)
    
    var impactedObjects = this.raycaster.intersectObjects(this.candidatesToCollision, true);
    var impactedAux = this.raycasterAux.intersectObjects(this.candidatesToCollision, true);

    if (impactedObjects.length > 0 || impactedAux.length > 0) {
      console.log('Ha habido objetos impactados!');
      var nearestObject = impactedObjects[0].distance;
      var nearestObjectAux = impactedAux[0].distance;
      console.log('Distancia al mas cercano: ', nearestObject);

      if (nearestObject <= 50 || nearestObjectAux <= 50) {
        console.log('Colision!');
        return true;
      }
      else {
        return false;
      }
    }
  }
  
  createGround () {
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (2000,0.2,1000);
    var geometryFrontWall = new THREE.BoxGeometry (0.2,400,1000);
    var geometryBackWall = new THREE.BoxGeometry (25,400,1000);
    var geometryWindow = new THREE.BoxGeometry (0.2,310,1000);
    var geometryRightLeftWall = new THREE.BoxGeometry (2000,400,0.2);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/textura-pared.jpg');
    texture.repeat.set(2, 1);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    //texture.mapping = THREE.UVMapping;
    var materialWall = new THREE.MeshPhongMaterial ({
        map: texture,
    });

    var textureGround = new THREE.TextureLoader().load('../imgs/textura-ground.jpg');
   // textureGround.mapping = THREE.UVMapping;
    textureGround.repeat.set(4, 4);
    textureGround.wrapS = THREE.RepeatWrapping;
    textureGround.wrapT = THREE.RepeatWrapping;
    var materialGround = new THREE.MeshPhongMaterial ({
        map: textureGround,
    });

    var textureCeiling = new THREE.TextureLoader().load('../imgs/textura-ceiling.jpg');
    textureCeiling.repeat.set(4, 4);
    textureCeiling.wrapS = THREE.RepeatWrapping;
    textureCeiling.wrapT = THREE.RepeatWrapping;
    var materialCeiling = new THREE.MeshPhongMaterial ({
        map: textureCeiling,
    });

    this.textureElement = document.createElement('video');
    this.textureElement.crossOrigin = 'anonymous';
    this.textureElement.preload = 'auto';
    this.textureElement.src = '../imgs/video_sw.mp4';
    this.textureElement.loop = true;
    // this.textureElement.autoplay = true;
    // this.textureElement.load();

    var textureWindow = new THREE.VideoTexture(this.textureElement)
    textureWindow.minFilter = THREE.LinearFilter;
    textureWindow.magFilter = THREE.LinearFilter;
    textureWindow.format = THREE.RGBAFormat;

    var materialWindow = new THREE.MeshPhongMaterial ({
        map: textureWindow,
    });

    var material = new THREE.MeshPhongMaterial({color: '#737373'});
    
    // Ya se puede construir el Mesh
    this.ground = new THREE.Mesh (geometryGround, materialGround);
    var frontWall = new THREE.Mesh(geometryFrontWall, material);
    this.backWall = new THREE.Mesh(geometryBackWall, materialWall);
    var rightWall = new THREE.Mesh(geometryRightLeftWall, materialWall);
    var leftWall = new THREE.Mesh(geometryRightLeftWall, materialWall);
    var ceiling = new THREE.Mesh (geometryGround, materialCeiling);
    var window = new THREE.Mesh (geometryWindow, materialWindow);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    this.ground.position.y = -0.1;
    frontWall.position.set(-1000, 200, 0);
    window.position.set(-998, 200, 0);
    this.backWall.position.set(1000, 200, 0);
    rightWall.position.set(0, 200, -500);
    leftWall.position.set(0, 200, 500);
    ceiling.position.y = 400;
   
 //Habitación2
    var geometryGround2 = new THREE.BoxGeometry (2000,0.2,1000);
    var geometryFrontWall2 = new THREE.BoxGeometry (0.2,400,1000);
    var geometryRightLeftWall2 = new THREE.BoxGeometry (2000,400,0.2);

    var texture2 = new THREE.TextureLoader().load('../imgs/pared2.png');
    texture2.repeat.set(2, 1);
    texture2.wrapS = THREE.RepeatWrapping;
    texture2.wrapT = THREE.RepeatWrapping;
    //texture.mapping = THREE.UVMapping;
    var materialWall2 = new THREE.MeshPhongMaterial ({
        map: texture2,
    });

    var textureGround2 = new THREE.TextureLoader().load('../imgs/suelo2.png');
   // textureGround2.mapping = THREE.UVMapping;
    textureGround2.repeat.set(12, 8);
    textureGround2.wrapS = THREE.RepeatWrapping;
    textureGround2.wrapT = THREE.RepeatWrapping;
    var materialGround2 = new THREE.MeshPhongMaterial ({
        map: textureGround2,
        bumpMap: textureGround2,
            bumpScale:0.9,
    });

    var textureCeiling2 = new THREE.TextureLoader().load('../imgs/textura-ceiling.jpg');
    textureCeiling2.repeat.set(4, 4);
    textureCeiling2.wrapS = THREE.RepeatWrapping;
    textureCeiling2.wrapT = THREE.RepeatWrapping;
    var materialCeiling2 = new THREE.MeshPhongMaterial ({
        map: textureCeiling2,
    });
    
    // Ya se puede construir el Mesh
    this.ground2 = new THREE.Mesh (geometryGround2, materialGround2);
    this.backWall2 = new THREE.Mesh(geometryFrontWall2, materialWall2);
    var rightWall2 = new THREE.Mesh(geometryRightLeftWall2, materialWall2);
    var leftWall2 = new THREE.Mesh(geometryRightLeftWall2, materialWall2);
    var ceiling2 = new THREE.Mesh (geometryGround2, materialCeiling2);
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    this.ground2.position.y = -0.1;
    this.ground2.position.x = 2000;
    this.backWall2.position.set(2000, 200, 0);
    rightWall2.position.set(2000, 200, -500);
    leftWall2.position.set(2000, 200, 500);
    ceiling2.position.y = 400;
    ceiling2.position.x = 2000;

    //FIN HABITACION 2
   
    // Añadir paredes de la habitación como candidatas a colisión
    this.candidatesToCollision.push(rightWall);
    this.candidatesToCollision.push(leftWall);
    this.candidatesToCollision.push(this.ground);
    this.candidatesToCollision.push(window);
    this.candidatesToCollision.push(ceiling);
    this.candidatesToCollision.push(frontWall);

    this.candidatesToCollision.push(rightWall2);
    this.candidatesToCollision.push(leftWall2);
    this.candidatesToCollision.push(this.ground2);
    this.candidatesToCollision.push(ceiling2);
    this.candidatesToCollision.push(this.backWall2);

    // Crear hueco para la puerta
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(50, 361, 251),
      new THREE.MeshPhongMaterial({color: '#E51717'})
    );
    this.cube.position.set(995, 176, 0);

    var csgDoor = new CSG();
    csgDoor.union([this.backWall]);
    csgDoor.subtract([this.cube]);
    this.backWall = csgDoor.toMesh();
    this.candidatesToCollision.push(this.backWall);

    // Crear hueco para la caja que contiene uno de los objetos
    this.secondCube = new THREE.Mesh(
      new THREE.BoxGeometry(50, 50, 50),
      new THREE.MeshPhongMaterial({color: '#E51717'})
    );
    // this.secondCube.position.x = -200;
    this.secondCube.position.set(-200, 0, 200);

    var csgDoor = new CSG();
    csgDoor.union([this.ground]);
    csgDoor.subtract([this.secondCube]);
    this.ground = csgDoor.toMesh();
    this.candidatesToCollision.push(this.ground);

    // rightWall.geometry.computeBoundingBox();
    // boundingBoxRightWall = rightWall.geometry.boundingBox;

    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (this.ground);
    this.add(frontWall);
    this.add(this.backWall);
    this.add(rightWall);
    this.add(leftWall);
    this.add(ceiling);
    this.add(window);
   //Habitacion2
    this.add (this.ground2);
    this.add(this.backWall2);
    this.add(rightWall2);
    this.add(leftWall2);
    this.add(ceiling2);
  }

  openDoorAnimation() {
    var start = { zLeft: -65, zRight: 65 };
    var end = { zLeft: -195, zRight: 195 };
    var time = 2000;

    this.leftDoor = new TWEEN.Tween(start).to(end, time).onUpdate(() => {
        this.myPuerta.puertaMesh.position.z = start.zLeft;
        this.myPuerta.puertaMesh2.position.z = start.zRight;
    }).onComplete(() => {start.zLeft = -65; start.zRight = 65}).easing(TWEEN.Easing.Quadratic.InOut).start();
  }

  closeDoorAnimation() {
    var start = { zLeft: -195, zRight: 195 };
    var end = { zLeft: -65, zRight: 65 };
    var time = 2000;

    this.leftDoor = new TWEEN.Tween(start).to(end, time).onUpdate(() => {
        this.myPuerta.puertaMesh.position.z = start.zLeft;
        this.myPuerta.puertaMesh2.position.z = start.zRight;
    }).onComplete(() => {start.zLeft = -195; start.zRight = 195}).easing(TWEEN.Easing.Quadratic.InOut).start();
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    this.guiControls = {
      playAudio: () => {
        if (!this.sound.isPlaying) {
          this.sound.play();
        } else {
          this.sound.stop();
        }
      }
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Music Controls');

    folder.add(this.guiControls, 'playAudio').name('Play/Pause Music');
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.1);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    // this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    // this.spotLight.position.set( 60, 60, 40 );
    // this.add (this.spotLight);
  }
  
  setLightIntensity (valor) {
    this.spotLight.intensity = valor;
  }
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
    
  }

  getFirstPersonCamera() {
    return this.firstPersonCamera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    // this.camera.aspect = ratio;
    this.firstPersonCamera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    // this.camera.updateProjectionMatrix();
    this.firstPersonCamera.updateProjectionMatrix();
  }
    
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getFirstPersonCamera());

    // Se actualiza la posición de la cámara según su controlador
    // this.cameraControl.update();
    // this.camController.update();
    
    // Se actualiza el resto del modelo
    this.controlPanel.update();
    this.myStormTroopers.update();
    this.myR2D2.update();
    this.myC3PO.update();
    this.myLight.update();
    this.mySilla.update();
    this.myHologram.update();
    this.myMesaPuzzle.update();
    this.myPuzzle.update();
    this.myBasePuerta.update();
    this.myPuerta.update();
    this.myEstructura.update();
    this.myEstructuraVentana.update();
    this.myLever.update();
    this.myPieza1.update();
    this.myPieza2.update();
    this.myPieza3.update();
    this.myBoton.update();
    this.myBoton2.update();
    this.myBox.update();
    this.mySable.update();
    this.myVader.update();

    if (this.puzzleIsCorrect && !this.objectsAreCorrect) {
      var distanceObj1 = this.myPieza1.position.distanceTo(this.correctPosObj1);
      var distanceObj2 = this.myPieza2.position.distanceTo(this.correctPosObj2);
      var distanceObj3 = this.myPieza3.position.distanceTo(this.correctPosObj3);

      if (distanceObj1 <= 35) {
        this.myPieza1.position.set(this.correctPosObj1.x, this.correctPosObj1.y, this.correctPosObj1.z);
        //this.dragControlsObj1.dispose();
        this.transformControls1.dispose();
        this.transformControls1.detach();

      }

      if (distanceObj2 <= 35) {
        this.myPieza2.position.set(this.correctPosObj2.x, this.correctPosObj2.y, this.correctPosObj2.z);
        this.transformControls2.dispose();
        this.transformControls2.detach();
       // this.dragControlsObj2.dispose();
      }

      if (distanceObj3 <= 35) {
        this.myPieza3.position.set(this.correctPosObj3.x, this.correctPosObj3.y, this.correctPosObj3.z);
        this.transformControls3.dispose();
        this.transformControls3.detach();
       // this.dragControlsObj3.dispose();
      }

      if (distanceObj1 <= 35 && distanceObj2 <= 35 && distanceObj3 <= 35) {
        this.objectsAreCorrect = true;
        this.myR2D2.routeAnimation.stop();
        this.pickableObjects.push(this.myR2D2.r2d2);
        this.setObjectsMessage();
      }
      if(this.cambiarModo){
        this.transformControls1.setMode( "rotate" );
        this.transformControls2.setMode( "rotate" );
        this.transformControls3.setMode( "rotate" );
      }else{
        this.transformControls1.setMode( "translate" );
        this.transformControls2.setMode( "translate" );
        this.transformControls3.setMode( "translate" );
      }
    }
    
    // if (this.myPieza1.boundingBoxPieza1.intersectsBox(boundingBoxRightWall)) {
    //   console.log('Colision con la pared derecha!');
    // }

    TWEEN.update();
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
}


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener("keydown", (event) => scene.onKeyDown(event));
  window.addEventListener("mousedown", (event) => scene.onMouseDown(event));
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});