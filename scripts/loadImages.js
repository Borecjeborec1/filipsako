function loadImages() {
  for (let i = 0; i < dirArr.length; ++i) {
    images["player" + dirArr[i]] = new Image()
    images["player" + dirArr[i]].src = `${imgPath}filip-${dirArr[i]}.png`
    images["lepik0" + dirArr[i]] = new Image()
    images["lepik0" + dirArr[i]].src = `${imgPath}lepik-${dirArr[i]}.png`
    images["lepik1" + dirArr[i]] = new Image()
    images["lepik1" + dirArr[i]].src = `${imgPath}lepik-${dirArr[i]}-mid.png`
    images["lepik2" + dirArr[i]] = new Image()
    images["lepik2" + dirArr[i]].src = `${imgPath}lepik-${dirArr[i]}-angry.png`
  }
  for (let i = 0; i < lavTypes; ++i) {
    images["block" + i] = new Image()
    images["block" + i].src = imgPath + `lavice${i}.png`
  }
  images.tblock = new Image()
  images.tblock.src = imgPath + "katedra.png"
  images.food = new Image()
  images.food.src = imgPath + "pascika.png"
  images.barel = new Image()
  images.barel.src = imgPath + "sud.png"
  images.mys = new Image()
  images.mys.src = imgPath + "myslenka.png"
}

