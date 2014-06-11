var THREE = require('THREE');

var scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
    renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.CubeGeometry(1,1,1),
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
    cube = new THREE.Mesh( geometry, material );

scene.add( cube );

camera.position.z = 5;

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();

// create the particle variables
var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 20
    });

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vertex(
        new THREE.Vector3(pX, pY, pZ)
      );

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);

// add it to the scene
scene.addChild(particleSystem);