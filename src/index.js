var THREE = require('THREE'),
    _ = require('underscore');

var PI2 = Math.PI * 2;

var camera,
    scene,
    renderer,
    particleGroup,
    box;

init();
animate();

function animate() {
  requestAnimationFrame(animate);

  particleGroup.rotation.x += 0.01;
  particleGroup.rotation.y += 0.02;

  box.rotation.x += 0.01;
  box.rotation.y += 0.02;

  renderer.render(scene, camera);
}

function init() {
  scene = new THREE.Scene();

  particleGroup = createParticleGroup();
  scene.add(particleGroup);

  box = createBox();
  scene.add(box);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;
  camera.lookAt(scene.position);

  renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
}

function createBox() {
  var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true}),
      geometry = new THREE.BoxGeometry(200, 200, 200);

  return new THREE.Mesh(geometry, material);
}

function randomPosition() {
  var radius = 700,
      theta = Math.random() * PI2,
      phi = Math.random() * PI2;

  return {
    x: radius * Math.cos(theta) * Math.sin(phi),
    y: radius * Math.sin(theta) * Math.sin(phi),
    z: radius * Math.cos(phi)
  };
}

function createParticleGroup() {
  var group = new THREE.Object3D();

  var material = new THREE.SpriteCanvasMaterial({
    color: 0xffffff,
    program: function ( context ) {
      context.beginPath();
      context.arc(0, 0, 1.5, 0, PI2, true);
      context.fill();
    }
  });

  for (var i = 0; i < 1000; i++) {
    var particle = new THREE.Sprite(material);

    _.extend(particle.position, randomPosition());

    group.add(particle);
  }

  return group;
}