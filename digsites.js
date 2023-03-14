/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

// JSON file with a series of dig site locations with latitude and longitude attributes
var locationsFile = "site-locations.json";

function loadDigSites() {
  fetch(
    "https://opensheet.elk.sh/1pMIt8a4xzHiBiSbsamEFWbMjC7gBS8d2DuVzgDcwPGo/Form"
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((row) => {
        addDigSite(row.Name, row.Author, parseFloat(row.Latitude), parseFloat(row.Longitude), parseFloat(row.Size));
      });
    });
}

function addDigSite(name, author, lat, lon, size) {
  return new Promise((resolve, reject) => {
    var itemPos = tileposFromLatlon({
      latitude: lat,
      longitude: lon
    });
    var item = document.createElement("a-entity");
    item.setAttribute("class", "dig-site");
    item.setAttribute("data-reltilex", Math.floor(itemPos.x));
    item.setAttribute("data-reltiley", Math.floor(itemPos.y));
    var digArea = document.createElement("a-entity");
    digArea.setAttribute("class", "dig-area");
    var areaRadius = size;
    digArea.setAttribute("geometry", {primitive: "sphere", radius: areaRadius});
    digArea.setAttribute("material", { color: "#d35230"});
    digArea.setAttribute("position", {x: 0, y: 0, z: 0});

    var siteName = document.createElement("a-entity");
    siteName.setAttribute("class", "site-name");
    siteName.setAttribute("text", {
      value: name + "\nadded by " + author,
      width: size * 10,
      align: "center",
      color: "#000000"
    });
    siteName.setAttribute("position", {x: 0, y: size + 5, z: 0});

    item.setAttribute("position", getPositionFromTilepos(itemPos));
    item.setAttribute("data-gpspos", lat + "/" + lon);
    item.appendChild(digArea);
    item.appendChild(siteName);
    items.appendChild(item);
    resolve();
    // reject("whatever the error");
  });
}