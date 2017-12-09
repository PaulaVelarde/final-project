(function (global) {
  'use strict';

  var cameraHelper;

  var particle;
  var randomSphere;

  function onSetup() {

    var gridHelper = new THREE.GridHelper(500, 500);
    VRWorld.scene.add(gridHelper);

    cameraHelper = new THREE.CameraHelper(VRWorld.vrCamera);
    VRWorld.scene.add(cameraHelper);

    var light = new THREE.HemisphereLight(0x777777, 0x000000, 2.5);
    VRWorld.scene.add(light);

    setupParticles();
  }

  function setupParticles() {
    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshLambertMaterial({
      color : 0xff0000
    });

    particle = new THREE.Mesh(geometry, material);
    particle.position.x = 100;
    VRWorld.scene.add(particle);

    for (var i = 0; i < 10; i++) {
      var randomSphere = new THREE.Mesh(geometry,material);
      randomSphere.position.x = 100; 
      randomSphere.position.y = (Math.random() * 12) - 6; ; 
      randomSphere.position.z = (Math.random() * 12) - 6; ; 
      VRWorld.scene.add(randomSphere);
    }
  }


  function onUpdate() {
    cameraHelper.update();

    randomSphere.position.x -= 0.8;

    particle.position.x -= 0.7;
    if (particle.position.x < 20) {
      VRWorld.scene.remove(particle);
    }
  }

  var VRApp = {
    onSetup  : onSetup,
    onUpdate : onUpdate
  };

  global.VRApp = VRApp;
})(this);