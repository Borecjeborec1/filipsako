class Food {
  constructor(x, y) {
    this.width = 30
    this.height = 30
    this.x = x
    this.y = y
  }
  draw() {
    ctx.drawImage(images.food, this.x, this.y, this.width, this.height)
  }
}