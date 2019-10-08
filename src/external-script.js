var getCoordinates = (transform = false) => {
  let mapCenter = window.mainMap.OlMapInstance.getView().getCenter();
  let coordinates = transform ? window.ol.proj.transform(mapCenter, 'EPSG:8122', 'EPSG:25835') : coordinates;
  return coordinates.map(c => c.toFixed(3));
};

window.onload = function() {
  let container = document.querySelector('div.map-control.map-control-inner');
  if (container) {
    let item = document.createElement('span');
    item.className = 'mc-controlbox';

    let button = document.createElement('button');
    button.appendChild(document.createTextNode('Get Coordinates'));
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
          alert(`Coordinates ${coordinates} were copied to clipboard!`);
        },
        err => {
          alert('Could not copy text: ', err);
        }
      );
    };

    item.appendChild(button);

    container.appendChild(item);
  }
};