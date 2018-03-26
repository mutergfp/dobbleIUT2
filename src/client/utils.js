import axios from 'axios';

export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}


export const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}


const BASE_URL = 'http://gi1.univ-lr.fr:7777';

export const postJoin = jwt => axios.post(`${BASE_URL}/join`, {}, {
  headers: {'Authorization': `JWT ${jwt}`}
});

export const postJouer = (jwt, symbol) => axios.post(`${BASE_URL}/jouer`, {symbol}, {
  headers: {'Authorization': `JWT ${jwt}`} 
});