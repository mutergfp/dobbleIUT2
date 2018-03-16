export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const fetchImages = () => {
  return fetch('http://localhost:82/images')
    .then(res => res.json());
}
