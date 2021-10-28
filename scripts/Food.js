class Food {
  constructor(x, y) {
    this.width = 30
    this.height = 30
    this.x = x
    this.y = y
    this.src = images.food
  }
  draw() {
    ctx.drawImage(this.src, this.x, this.y, this.width, this.height)
  }
}