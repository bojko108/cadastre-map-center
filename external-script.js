var getCoordinates = (transform = false) => {
  let mapCenter = window.mainMap.OlMapInstance.getView().getCenter();
  let coordinates = [];
  if (transform) {
    coordinates = window.ol.proj.transform(mapCenter, 'EPSG:8122', 'EPSG:25835');
  }
  return coordinates.map(c => c.toFixed(3));
};

var getScale = () => {
  let view = window.mainMap.OlMapInstance.getView();
  let projection = view.getProjection();
  let mpu = ol.proj.Units.METERS_PER_UNIT[projection.getUnits()];
  let scale = view.getResolution() * mpu * 39.37 * (25.4 / 0.28);
  return Math.round(scale);
};

var createButton = text => {
  let button = document.createElement('button');
  button.appendChild(document.createTextNode(text));
  button.style.width = '100px';
  button.style.height = '30px';
  button.style.font = '12px Roboto,Ubuntu';
  button.style.width = '100px';
  button.style.height = '30px';
  button.style.border = '1px solid white';
  button.style.backgroundColor = 'green';
  button.style.color = 'white';
  return button;
};

window.onload = function() {
  console.log(window.wtf);
  let container = document.querySelector('div.map-control.map-control-inner');
  if (container) {
    let item = document.createElement('span');
    item.className = 'mc-controlbox';

    let buttonCopyCoordinates = createButton('Копирай координатите');
    buttonCopyCoordinates.onclick = () => {
      let coordinates = getCoordinates(true);
      let text = `${coordinates[1]},${coordinates[0]}`;
      navigator.clipboard.writeText(text).then(
        () => {
          alert(`Координати ${text} бяха копирани в клипборда!`);
        },
        err => {
          alert('Грешка: ', err);
        }
      );
    };

    let buttonOpenSlk = createButton('Отвори SLK');
    buttonOpenSlk.onclick = () => {
      let coordinates = getCoordinates(true);
      let scale = getScale();
      let url = `http://gis.cezbg.corp/cadastre?x=${coordinates[1]}&y=${coordinates[0]}&scale=${scale}`;
      window.open(url, '_blank');
    };

    item.appendChild(buttonCopyCoordinates);
    item.appendChild(buttonOpenSlk);

    container.appendChild(item);
  }
};
