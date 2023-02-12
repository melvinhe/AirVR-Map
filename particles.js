/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
function loadParticles() {
    // Create random particle positions in the bounding box
    var particlePositions = [];
    for (var i = 0; i < 100; i++) {
      var x = Math.random() * 5;
      var y = Math.random() * 5;
      var z = Math.random() * 5;
      particlePositions.push({x: x, y: y, z: z});
    }
  
    return Promise.all(particlePositions.map((pos) => {
      var particle = document.createElement("a-sphere");
      particle.setAttribute("radius", 0.1);
      particle.setAttribute("color", "#ff0000");
      particle.setAttribute("position", pos);
      items.appendChild(particle);
    }))
    .then(() => {
      console.log("Loaded 100 particles representing air pollution.");
    })
    .catch((reason) => { console.log(reason); });
  }
  