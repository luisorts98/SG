
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
class MyControlPanel extends THREE.Object3D {
    constructor() {
        super();

        // Create Shape for the panel control
        var controlPanelShape = new THREE.Shape();
        controlPanelShape.moveTo(0, 0);
        controlPanelShape.lineTo(100, 0);
        controlPanelShape.lineTo(100, 100);
        controlPanelShape.lineTo(0, 50);

        var extrudeOptions = {
            depth: 300,
            bevelEnabled: false
        };
    
        var mat =new THREE.MeshPhongMaterial({ color: '#646767' }); 
       /* var ControlPanelTexture = new THREE.TextureLoader().load('../imgs/mesa.jpg');

        var controlPanelMat = new THREE.MeshPhongMaterial ({
            map: ControlPanelTexture,
           // flatShading: true,
             side: THREE.DoubleSide,
        });*/
       
        var controlPanelGeo = new THREE.ExtrudeGeometry(controlPanelShape, extrudeOptions);
        this.controlPanel = new THREE.Mesh(controlPanelGeo, mat);

        this.controlPanel.rotateY(Math.PI);
        this.controlPanel.position.set(-890, 0, 150);
       

        var cilindro_tuerca1 = new THREE.CylinderGeometry(4, 4, 3, 6);
        var esfera_bordes_tuerca1 = new THREE.SphereGeometry(4.15, 16, 16);
    
        var cilindro_agujero_central1 = new THREE.CylinderGeometry(2, 2, 3, 25);
    
        // Creamos los Mesh
        var cilindro_tuercaMesh1 = new THREE.Mesh(cilindro_tuerca1, mat);
        var esfera_bordes_tuercaMesh1 = new THREE.Mesh(esfera_bordes_tuerca1, mat);
        var cilindro_agujero_centralMesh1 = new THREE.Mesh(cilindro_agujero_central1, mat);
    
        // Operamos
        var csg1 = new CSG();
        csg1.subtract([cilindro_tuercaMesh1,cilindro_agujero_centralMesh1]);
    
      
    
        this.tuerca1 = csg1.toMesh();
        this.tuerca1.rotateZ(-Math.PI/7);
        this.tuerca1.position.set(-953, 80.6, -10.1);
        this.tuerca1.scale.set(2,2,2);
 



        var hueco2 = new THREE.CylinderGeometry(10, 10, 30);
        var hueco21 = new THREE.CylinderGeometry(4, 4, 60);
        var hueco2Mat = new THREE.MeshPhongMaterial({ color: '#4d4d4d' });
        var hueco2 = new THREE.Mesh(hueco2, mat);
        var hueco21 = new THREE.Mesh(hueco21, mat);
        hueco2.rotateZ(-Math.PI/7);
        hueco2.position.set(-974, 82.6, 0);
        hueco21.rotateZ(-Math.PI/7);
        hueco21.position.set(-955, 85.6, -55);

        var hueco3 = new THREE.BoxGeometry(10, 10, 15);
       //var hueco3Mat = new THREE.MeshPhongMaterial({ color: '#4d4d4d' });
        var hueco3 = new THREE.Mesh(hueco3, mat);
        var hueco32 = new THREE.CylinderGeometry(3,3, 9);
       // var hueco32Mat = new THREE.MeshPhongMaterial({ color: '#4d4d4d' });
        var hueco32 = new THREE.Mesh(hueco32, mat);
        hueco32.rotateX(Math.PI/2);
        hueco32.position.set(-1, 0, 13);
        var hueco33 = new THREE.BoxGeometry(10, 16.5, 2);
       // var hueco33Mat = new THREE.MeshPhongMaterial({ color: '#4d4d4d' });
        var hueco33 = new THREE.Mesh(hueco33, mat);
        hueco33.position.set(0, -2.5, 8);
        var csgHueco3 = new CSG();
        csgHueco3.union([hueco3, hueco32, hueco33]);
        this.H3 = csgHueco3.toMesh();
        this.H3.rotateY(-Math.PI/2);
        this.H3.position.set(-950, 50,150);
        var csg = new CSG();
        csg.subtract([this.controlPanel,hueco2,this.tuerca1, this.H3]);

        this.controlPanel1 = csg.toMesh();
        
        this.createRightPanelButtons();
        this.createPlacas();
        this.createPalanca();
        this.add(this.controlPanel1);
    }

    createRightPanelButtons() {

        var texture = new THREE.TextureLoader().load('../imgs/textura-relieve.png');
        var texture2 =  new THREE.TextureLoader().load('../imgs/textura-right-buttons.jpg');
        var material = new THREE.MeshPhongMaterial ({
            map: texture2,
            bumpMap: texture,
            bumpScale: 1,
            flatShading: true,
            // side: THREE.DoubleSide,
        });

        var rightButtonsGeo = new THREE.BoxGeometry(100, 0.2, 80);
        var rightButtons = new THREE.Mesh(rightButtonsGeo, material);
        rightButtons.rotateY(Math.PI/2);
        rightButtons.rotateX(Math.PI/7);
        rightButtons.position.set(-940, 75.6, 90);

        this.add(rightButtons);

        var texture3 =new THREE.TextureLoader().load('../imgs/panel3-relieve.png'); 
        var texture4 = new THREE.TextureLoader().load('../imgs/panel3.png');
        var material2 = new THREE.MeshPhongMaterial ({
            map: texture4,
            bumpMap: texture3,
            bumpScale: 1,
            flatShading: true,
            // side: THREE.DoubleSide,
        });

        var rightButtonsGeo2 = new THREE.BoxGeometry(100, 0.2, 80);
        var rightButtons2 = new THREE.Mesh(rightButtonsGeo2, material2);
        rightButtons2.rotateY(Math.PI/2);
        rightButtons2.rotateX(Math.PI/7);
        rightButtons2.position.set(-940, 75.6, -90);

        this.add(rightButtons2);


    }

    createPlacas() {  
        
        var placa1 = new THREE.BoxGeometry(300, 50, 0.5);
        var texturePlacas = new THREE.TextureLoader().load('../imgs/metal.jpeg');
        texturePlacas.repeat.set(3, 1);
        texturePlacas.wrapS = THREE.RepeatWrapping;
        texturePlacas.wrapT = THREE.RepeatWrapping;
        var placa1Mat = new THREE.MeshPhongMaterial({ color: '#BAB9B9',
          map: texturePlacas,
          side: THREE.DoubleSide, });
      
        var hueco = new THREE.Mesh(placa1, placa1Mat);
        hueco.rotateY(Math.PI/2);
        hueco.position.set(-890, 25, 0);
        this.add(hueco);

        var controlPanelShape2 = new THREE.Shape();
        controlPanelShape2.moveTo(0, 0);
        controlPanelShape2.lineTo(100, 0);
        controlPanelShape2.lineTo(100, 100);
        controlPanelShape2.lineTo(0, 50);

        var extrudeOptions2 = {
            depth: 0.2,
            bevelEnabled: false
        };
        var controlPanelGeo2 = new THREE.ExtrudeGeometry(controlPanelShape2, extrudeOptions2);
        this.controlPanel2 = new THREE.Mesh(controlPanelGeo2, placa1Mat);
        this.controlPanel2.rotateY(Math.PI);
        this.controlPanel2.position.set(-890, 0, -150);
        this.add(this.controlPanel2);

    }
    createPalanca(){
        var palanca1 = new THREE.CylinderGeometry( 1, 1, 16, 32 );
        var palanca2 = new THREE.CylinderGeometry( 1, 1, 16, 32 );
        var palanca3 = new THREE.CylinderGeometry( 2, 2, 15, 32 );

        var palanca1Mat = new THREE.MeshPhongMaterial({ color: '#4d4d4d' });
        var palanca2Mat = new THREE.MeshPhongMaterial({ color: '#4d4d4d' });
        var palanca3Mat = new THREE.MeshPhongMaterial({ color: '#7F4725' });

        var palanca1Mesh = new THREE.Mesh(palanca1, palanca1Mat);
        var palanca2Mesh = new THREE.Mesh(palanca2, palanca2Mat);
        var palanca3Mesh = new THREE.Mesh(palanca3, palanca3Mat);

        palanca1Mesh.position.set(0, 8, 7); 
        palanca2Mesh.position.set(0, 8, -7);
        palanca3Mesh.rotateX(Math.PI/2);
        palanca3Mesh.position.set(0, 15,0);
        var csg = new CSG();
        csg.union ([palanca1Mesh, palanca2Mesh, palanca3Mesh]);

        this.palanca = csg.toMesh();
        this.palanca2 = csg.toMesh();
        this.palanca.rotateZ(-Math.PI/7);
        this.palanca2.rotateZ(-Math.PI/7);
        this.palanca.position.set(-940, 75.6, 30);
        this.palanca2.position.set(-940, 75.6, -30);
        this.add(this.palanca);
        this.add(this.palanca2);
    }


    
    update() {

    }
}

export { MyControlPanel }
