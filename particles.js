/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

 var particlesFile = "air-particles.json";

 function loadAirParticles() {
   fetch(particlesFile)
     .then((res) => res.json())
     .then((data) => {
       data.forEach((particle) => {
         addAirParticle(particle.Latitude, particle.Longitude, particle.Size, particle.Color);
       });
     });
 }
 
 function addAirParticle(lat, lon, size, color) {
   return new Promise((resolve, reject) => {
     var itemPos = tileposFromLatlon({
       latitude: lat,
       longitude: lon
     });
     var particle = document.createElement("a-sphere");
     particle.setAttribute("class", "air-particle");
     particle.setAttribute("data-reltilex", Math.floor(itemPos.x));
     particle.setAttribute("data-reltiley", Math.floor(itemPos.y));
     var particleSize = size;
     particle.setAttribute("radius", particleSize);
     particle.setAttribute("color", color);
     particle.setAttribute("position", getPositionFromTilepos(itemPos));
     items.appendChild(particle);
     resolve();
   });
 }
 