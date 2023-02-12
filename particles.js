/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

 function loadParticles() {
    var opQuery = "node[natural=tree]" + "(" + getBoundingBoxString() + ");" +
                  "out;";
    return fetchFromOverpass(opQuery)
      .then((itemJSON) => {
        var count = 0;
        for (feature of itemJSON.features) {
          if (feature.geometry.type == "Point") {
            addParticle(feature);
            count++;
          }
          else {
            console.log("Couldn't draw tree with geometry type " +
                        feature.geometry.type + " (" + feature.id + ")");
          }
        }
        console.log("Loaded " + count + " trees.");
      })
      .catch((reason) => { console.log(reason); });
  }
  
  function addParticle(jsonFeature) {
    return new Promise((resolve, reject) => {
      var itemPos = tileposFromLatlon(latlonFromJSON(jsonFeature.geometry.coordinates));
      var item = document.createElement("a-entity");
      item.setAttribute("class", "particle");
      item.setAttribute("data-reltilex", Math.floor(itemPos.x));
      item.setAttribute("data-reltiley", Math.floor(itemPos.y));
      var sphere = document.createElement("a-sphere");
      sphere.setAttribute("radius", 0.5);
      sphere.setAttribute("color", "#80ff80");
      item.setAttribute("position", getPositionFromTilepos(itemPos));
      item.setAttribute("data-gpspos", jsonFeature.geometry.coordinates[1] + "/" + jsonFeature.geometry.coordinates[0]);
      item.appendChild(sphere);
      items.appendChild(item);
      resolve();
      // reject("whatever the error");
    });
  }
  