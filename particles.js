AFRAME.registerComponent('air-particles', {
schema: {
    count: { type: 'int', default: 500 },
    spread: { type: 'number', default: 5 },
    color: { type: 'color', default: '#ffffff' }
},

init: function() {
    // Create the particle system
    this.particleSystem = new THREE.Group();

    for (let i = 0; i < this.data.count; i++) {
    // Create each particle as a sphere with random position and size
    const particle = new THREE.Mesh(
        new THREE.SphereGeometry(0.1 + Math.random() * 0.5),
        new THREE.MeshBasicMaterial({ color: this.data.color })
    );
    particle.position.set(
        Math.random() * this.data.spread - this.data.spread / 2,
        Math.random() * this.data.spread - this.data.spread / 2,
        Math.random() * this.data.spread - this.data.spread / 2
    );

    // Add the particle to the particle system group
    this.particleSystem.add(particle);
    }

    // Add the particle system to the scene
    this.el.sceneEl.object3D.add(this.particleSystem);
},

remove: function() {
    // Remove the particle system from the scene
    this.el.sceneEl.object3D.remove(this.particleSystem);
}
});

function loadAirParticles() {
    // Get the user's camera rig
    const cameraRig = document.querySelector('#camera-rig');

    // Create the air-particles entity and set its position to the camera rig's position
    const airParticles = document.createElement('a-entity');
    airParticles.setAttribute('air-particles', '');
    airParticles.setAttribute('render-order', '9999');
    airParticles.object3D.position.copy(cameraRig.object3D.position);

    // Add the air-particles entity to the camera rig
    cameraRig.appendChild(airParticles);
}
