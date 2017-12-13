(function (global) {
  'use strict';

  var cameraHelper;

  var triangleGroup;

  var particles;

  var geometryParticle = new THREE.SphereGeometry(1, 32, 32);
  var materialParticle = new THREE.MeshPhongMaterial({
    color : 0xffff00,
    emissive : 0x000C7A,
    shininess : 100
  });

  function onSetup() {

    var gridHelper = new THREE.GridHelper(500, 500);
    //VRWorld.scene.add(gridHelper);

    cameraHelper = new THREE.CameraHelper(VRWorld.vrCamera);
    //VRWorld.scene.add(cameraHelper);

    var light = new THREE.HemisphereLight(0x777777, 0x000000, 2.5);
    VRWorld.scene.add(light);

    setupParticles();

    createMeshes();

    var mesh;

    var geometry = new THREE.SphereBufferGeometry( 0, 400, 40 );
        geometry.scale( -5, 5, 5 );
        geometry.rotateZ(2);

    var video = document.createElement( 'video' );

    video.width = 640;
    video.height = 360;
    video.loop = true;
    video.muted = true;
    video.src = 'video/colores.mp4';
    video.play();


    var texture = new THREE.VideoTexture( video );
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    var material   = new THREE.MeshBasicMaterial( { map : texture } );
    mesh = new THREE.Mesh( geometry, material );
    VRWorld.scene.add( mesh );

  }

  function createMeshes(){
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('models/ente.mtl', function (materials) {
      materials.preload();

      var loader = new THREE.OBJLoader();
      loader.setMaterials(materials);
      loader.load('models/ente.obj', onLoadTriangulo, onProgressOBJ, onError);
    });
  }

  function onLoadTriangulo(objectLoaded) {
    triangleGroup = objectLoaded;
    triangleGroup.position.y = 30;
    triangleGroup.position.x = 50;
    triangleGroup.position.z = 0;    
    triangleGroup.scale.set(.1, .1, .1);
    triangleGroup.rotation.y = Math.PI;
    triangleGroup.rotation.z = -0.1;
    VRWorld.scene.add(triangleGroup);
  }

    function onProgressOBJ (xhr){
      console.log('Descargandoooo tu codo');
      console.log((xhr.loaded / xhr.total * 100) + '%');
    }

    function onError(error){
      console.log('Ups! I did it again, i played with your code');
      console.log(error);
    }



  function setupParticles() {

    particles = [];

    for (var i = 0; i < 2; i++) {
      var particle = createParticle();

      particles.push(particle);
      VRWorld.scene.add(particle);
    }
  }

  function createParticle () {
    var randomParticle = new THREE.Mesh(geometryParticle, materialParticle);
    randomParticle.position.x = 50; 
    randomParticle.position.y = + 40 ;
    randomParticle.position.z = 0 ;

    return randomParticle;
  }

  function onUpdate() {
    cameraHelper.update();

    if (particles.length > 0) {
      var particle = particles[0];
      particle.position.x -= 8.0;

      if (particle.position.x < 1) {
        VRWorld.scene.remove(particle);
        particles.shift();

        var newParticle = createParticle();
        particles.push(newParticle);
        VRWorld.scene.add(newParticle);
      }
    }
  }

  var VRApp = {
    onSetup  : onSetup,
    onUpdate : onUpdate

  };

  global.VRApp = VRApp;
})(this);