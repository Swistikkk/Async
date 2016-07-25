let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
xhr.responseType = 'json';
xhr.send();

let promise = new Promise((resolve, reject) => {
  xhr.addEventListener('load', () => {
    let response = xhr.response;
    resolve(response);
  })
});

let cities = promise.then((response) => {
  let cities = [];

  for(let i = 0; i < response.length; i++) {
    cities[cities.length] = response[i].name;
  }

  cities.sort((a, b) => {
    if(a > b) {
      return 1;
    } else if( a < b) {
      return -1;
    }
  });

  function setCities() {
    input.addEventListener('keyup', (e) => {
      let value = input.value;
      container.innerHTML = "";

      for(let i = 0; i < cities.length; i++) {
        if(cities[i].indexOf(value) != -1) {
          let div = document.createElement('div');
          div.innerText = cities[i];
          container.appendChild(div);
        }
      }
    })
  };

  setCities();
});
