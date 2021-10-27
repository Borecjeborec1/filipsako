class tBlock {
  constructor(x, y) {
    this.width = 50
    this.height = 50
    this.x = x
    this.y = y
  }
  draw() {
    ctx.drawImage(images.tblock, this.x, this.y, this.width, this.height)
  }
}
class Block {
  constructor(x, y) {
    this.width = 50
    this.height = 50
    this.x = x
    this.y = y
    this.src = images["block" + Math.floor(Math.random() * lavTypes)]
  }
  draw() {
    ctx.drawImage(this.src, this.x, this.y, this.width, this.height)
  }
}

