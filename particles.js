/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

 function loadAirParticles() {
    var opQuery = "node[natural=tree]" + "(" + getBoundingBoxString() + ");" +
                  "out;";
    return fetchFromOverpass(opQuery)
      .then((itemJSON) => {
        var count = 0;
        for (feature of itemJSON.features) {
          if (feature.geometry.type == "Point") {
            addAirParticles(feature);
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
  
  function addAirParticles(jsonFeature) {
    return new Promise((resolve, reject) => {
      var itemPos = tileposFromLatlon(latlonFromJSON(jsonFeature.geometry.coordinates));
      var tags = jsonFeature.properties.tags ? jsonFeature.properties.tags : jsonFeature.properties;
      var item = document.createElement("a-entity");
      item.setAttribute("class", "tree");
      item.setAttribute("data-reltilex", Math.floor(itemPos.x));
      item.setAttribute("data-reltiley", Math.floor(itemPos.y));
      var dust = document.createElement("a-entity");
      dust.setAttribute("class", "dust");
      var height = tags.height ? tags.height : 8;
      var dustRadius = (tags.diameter_dust ? tags.diameter_dust : 3) / 2;
      // leaf_type is broadleaved, needleleaved, mixed or rarely something else.
      if (tags["leaf_type"] == "needleleaved") { // special shape for needle-leaved trees
        var particleHeight = height * 0.5;
        var dustHeight = height * 0.1;
        dust.setAttribute("geometry", {primitive: "cone", height: dustHeight, radiusBottom: crownRadius, radiusTop: 0});
        dust.setAttribute("material", {color: "#80ff80"});
        dust.setAttribute("position", {x: 0, y: (height - dustHeight / 2), z: 0});
      }
      else { // use a simple typical broadleaved-type shape
        var particleHeight = height - crownRadius;
        
        dust.setAttribute("geometry", {primitive: "sphere", radius: dustRadius});
        dust.setAttribute("material", {color: "#80ff80"});
        dust.setAttribute("position", {x: 0, y: particleHeight, z: 0});
      }
      item.setAttribute("position", getPositionFromTilepos(itemPos));
      item.setAttribute("data-gpspos", jsonFeature.geometry.coordinates[1] + "/" + jsonFeature.geometry.coordinates[0]);
      item.appendChild(dust);
      items.appendChild(item);
      resolve();
      // reject("whatever the error");
    });
  }
  