var THREE = require('THREE');

var camera,
    scene,
    renderer,
    particleGroup,
    box;

init();
animate();

function animate() {
  requestAnimationFrame(animate);

  if (particleGroup) {
    particleGroup.rotation.x += 0.01;
    particleGroup.rotation.y += 0.02;
  }

  if (box) {
    box.rotation.x += 0.01;
    box.rotation.y += 0.02;
  }

  camera.position.z = 1000;
  camera.lookAt( scene.position );

  renderer.render(scene, camera);
}

function init() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  scene = new THREE.Scene();

  particleGroup = createParticleGroup();
  scene.add(particleGroup);

  box = createBox();
  scene.add(box);

  renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
}

function createBox() {
  var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true}),
      geometry = new THREE.BoxGeometry(200, 200, 200);

  return new THREE.Mesh(geometry, material);
}

function createParticleGroup() {
  var group = new THREE.Object3D();

  var PI2 = Math.PI * 2,
      material = new THREE.SpriteCanvasMaterial( {
        color: 0xffffff,
        program: function ( context ) {
          context.beginPath();
          context.arc(0, 0, 0.5, 0, PI2, true);
          context.fill();
        }
      });

  for (var i = 0; i < 2000; i++) {
    var particle = new THREE.Sprite(material);

    particle.position.x = Math.random() * 2000 - 1000;
    particle.position.y = Math.random() * 2000 - 1000;
    particle.position.z = Math.random() * 2000 - 1000;

    group.add(particle);
  }

  return group;
}