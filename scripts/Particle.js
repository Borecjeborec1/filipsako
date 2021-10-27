class Particle {
  constructor(x, y, color = "black", opacityMinus) {
    this.width = Math.random() * 8
    this.height = Math.random() * 5
    this.x = x
    this.y = y
    this.color = color
    this.speedX = Math.random() * 15
    this.speedY = Math.random() * 15
    this.opacity = 1
    this.direX = Math.floor(Math.random() * 2)
    this.direY = Math.floor(Math.random() * 2)
    this.opacityMinus = opacityMinus
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  update() {
    if (this.opacity > 0) {
      this.opacity -= this.opacityMinus
      if (this.direX) {
        this.x += this.speedX
      } else {
        this.x -= this.speedX
      }
      if (this.direY) {
        this.y += this.speedY
      } else {
        this.y -= this.speedY
      }
    } else {
      this.x = 1000
    }

  }
}
