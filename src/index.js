var THREE = require('THREE'),
    _ = require('underscore');

var PI2 = Math.PI * 2;

var STARS = require('./stardata.js');
console.log(STARS);
var camera,
    scene,
    renderer,
    particleGroup,
    box;

init();
animate();

function animate() {
 // requestAnimationFrame(animate);

<<<<<<< HEAD
 //  particleGroup.rotation.x += 0.01;
 //  particleGroup.rotation.y += 0.02;
=======
  particleGroup.rotation.x += 0.01;
  particleGroup.rotation.y += 0.02;

  if (box) {
    box.rotation.x += 0.01;
    box.rotation.y += 0.02;
  }
>>>>>>> 3e1608496f56796973418c3ffe31a4a881673407

 //  box.rotation.x += 0.01;
 //  box.rotation.y += 0.02;
  renderer.render(scene, camera);
}

function init() {
  scene = new THREE.Scene();

  particleGroup = createParticleGroup();
  scene.add(particleGroup);

  // box = createBox();
  // scene.add(box);

  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 10000);
  //camera.position.z = 1000;

  camera.position.set(0,0,0);
  camera.up = new THREE.Vector3(0,0,1);
  camera.lookAt(new THREE.Vector3(0,0,88));

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
}

function createBox() {
  var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true}),
      geometry = new THREE.BoxGeometry(200, 200, 200);

  return new THREE.Mesh(geometry, material);
}


function radian(degrees){
  this.blah = 12;
  this.prototype === radian;
  return degrees * Math.PI / 180;
}

x = new radian(3);
function decToRad(degrees){
  return radian(degrees < 0 ? 90-degrees : degrees - 90);
}
function raToRad(ra){
  return radian(15.0*ra);
}

function createPosition(ra,dec) {
  var radius = 700,
      theta = raToRad(ra),
      phi = decToRad(dec);

  return {
    x: radius * Math.cos(theta) * Math.sin(phi),
    y: radius * Math.sin(theta) * Math.sin(phi),
    z: radius * Math.cos(phi)
  };
}

function createParticleGroup() {
  var group = new THREE.Object3D();
  var MAX_MAG = 8;
  _.each(STARS, function(star){
    if(star.mag > MAX_MAG) return;
      var material = new THREE.SpriteMaterial({
      color: 0xffffff,
      program: function ( context ) {
        context.beginPath();
        context.arc(0, 0, 0.4*(MAX_MAG-star.mag), 0, PI2, true);
        context.fill();
      }
    });
    var particle = new THREE.Sprite(material);
    _.extend(particle.position, createPosition(star.ra,star.dec));
    group.add(particle);
  });

  var material = new THREE.SpriteMaterial({
  color: 0x0000FF,
  program: function ( context ) {
    context.beginPath();
    context.arc(0, 0, 10, 0, PI2, true);
    context.fill();

    }
  });
  var particle = new THREE.Sprite(material);
  //_.extend(particle.position, createPosition(0,90));
  _.extend(particle.position, createPosition(11.06217691,61.75111888));
  group.add(particle);


  return group;
}