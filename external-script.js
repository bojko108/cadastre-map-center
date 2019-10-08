var getCoordinates = (transform = false) => {
  let mapCenter = window.mainMap.OlMapInstance.getView().getCenter();
  let coordinates = [];
  if (transform) {
    let tmp = window.ol.proj.transform(mapCenter, 'EPSG:8122', 'EPSG:25835');
    coordinates[0] = tmp[1];
    coordinates[1] = tmp[0];
  } else {
    coordinates[0] = mapCenter[1];
    coordinates[1] = mapCenter[0];
  }
  return coordinates.map(c => c.toFixed(3));
};

window.onload = function() {
  let container = document.querySelector('div.map-control.map-control-inner');
  if (container) {
    let item = document.createElement('span');
    item.className = 'mc-controlbox';

    let button = document.createElement('button');
    button.appendChild(document.createTextNode('Копирай координати'));
    button.style.width = '100px';
    button.style.height = '30px';
    button.style.font = '12px Roboto,Ubuntu';
    button.style.width = '100px';
    button.style.height = '30px';
    button.style.border = '1px solid white';
    button.style.backgroundColor = 'green';
    button.style.color = 'white';

    button.onclick = () => {
      let coordinates = getCoordinates(true);
      navigator.clipboard.writeText(coordinates).then(
        () => {
          alert(`Координати ${coordinates} бяха копирани в клипборда!`);
        },
        err => {
          alert('Грешка: ', err);
        }
      );
    };

    item.appendChild(button);

    container.appendChild(item);
  }
};
