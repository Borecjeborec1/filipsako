const canvas = document.getElementById("canvas")
canvas.width = 800
canvas.height = 600
const ctx = canvas.getContext("2d")

const player = {
  x: 5,
  y: blockOffset,
  width: charSize,
  height: charSize,
  speed: 4,
  facing: "right",
  lastFacing: "",
  colliding: false
}
const lepik = {
  x: canvas.width - blockGap * 2,
  y: blockGap * 2,
  width: charSize,
  height: charSize,
  speed: 5,
  facing: "left",
  lastFacing: "",
  colliding: false
}

const barel = {
  x: canvas.width - charSize,
  y: blockOffset - 5,
  width: charSize,
  height: charSize + 10,
  speed: 4,
  dir: 1
}
const mys = {
  x: canvas.width,
  y: canvas.height - blockGap,
  width: charSize * 3 - 10,
  height: charSize - 10,
  speed: 4,
}
function handleBarel(isBarel) {
  animCounter++
  if (!isBarel) {
    if (barel.x < player.x + player.width &&
      barel.x + barel.width > player.x &&
      barel.y < player.y + player.height &&
      barel.height + barel.y > player.y) {
      gameover = true
    }
    // if (animCounter % 2 == 0) {
    //   if (barel.sX < 253 * 2) {
    //     barel.sX += barel.fWidth
    //   } else {
    //     barel.sX = 0
    //     barel.sY < barel.fHeight * 2 ? barel.sY += barel.fHeight : barel.sY = 0
    //   }
    // }
    barel.dir == 1 ? barel.x -= barel.speed : barel.x += barel.speed
    barel.dir = barel.x < 0 || barel.x > canvas.width - barel.width ? !barel.dir : barel.dir
    barel.speed < 6 ? barel.speed += 0.003 : barel.speed = 6
    ctx.drawImage(images.barel, barel.x, barel.y, barel.width, barel.height)
    // ctx.drawImage(images.mys, barel.sX, barel.sY, barel.fWidth, barel.fHeight, barel.x, barel.y, barel.width, barel.height)
  } else {
    if (mys.x < player.x + player.width &&
      mys.x + mys.width > player.x &&
      mys.y < player.y + player.height &&
      mys.height + mys.y > player.y) {
      gameover = true
    }
    // if (animCounter % 2 == 0) {
    //   if (mys.sX < 253 * 2) {
    //     mys.sX += mys.fWidth
    //   } else {
    //     mys.sX = 0
    //     mys.sY < mys.fHeight * 2 ? mys.sY += mys.fHeight : mys.sY = 0
    //   }
    // }
    mys.x > 0 ? mys.x -= mys.speed : mys.x = canvas.width - blockGap * 2
    mys.speed < 8 ? mys.speed += 0.001 : mys.speed = 8
    ctx.drawImage(images.mys, mys.x, mys.y, mys.width, mys.height)
    // ctx.drawImage(images.mys, mys.sX, mys.sY, mys.fWidth, mys.fHeight, mys.x, mys.y, mys.width, mys.height)
  }



}

function handleParticles() {
  for (let i = 0; i < particles.length; ++i) {
    particles[i].draw()
    particles[i].update()
  }
  if (particles[0].opacity < 0) {
    playAnim = false
    particles.length = 0
  }
}
function spawnParticles(isLepik) {
  if (!isLepik) {
    for (let i = 0; i < pParticlesCount; ++i) {
      particles.push(new Particle(player.x + player.width / 2, player.y + player.height / 2, colorArray[Math.floor(Math.random() * colorArray.length)], pParticlesLifetime))
    }
  } else {
    for (let i = 0; i < lParticlesCount; ++i) {
      particles.push(new Particle(lepik.x + lepik.width / 2, lepik.y + lepik.height / 2, "red", lParticlesLifetime))
    }
  }

}

function spawnBlocks() {
  let blocksY = startBlockY
  let blocksX = -startBlockX
  while (true) {
    blocksY += blockGap
    if (blocksY >= (Math.floor(Math.random() * (blockGap * 6 - blockGap * 3)) + (blockGap * 3))) {
      blocksX += 120
      blocksY = startBlockY
    }
    if (blocksX > canvas.width - 200) {
      for (let i = startBlockY; i <= startBlockY + 3 * blockGap; i += blockGap) {
        blocks.push(new tBlock(blocksX, i))
      }
      break
    }
    if (Math.floor(Math.random() * foodRate)) {
      if (endBlockY - blocksY > canvas.height / 2 + foodGap) {
        foods.push(new Food(blocksX + startBlockY, blocksY + foodOffset));
        foods.push(new Food(blocksX + startBlockY, endBlockY - blocksY + foodOffset));
      }
    }
    if (!Math.floor(Math.random() * foodRate)) {
      if (blocksX + foodOffset > -startBlockX + foodOffset) {
        foods.push(new Food(blocksX + foodOffset, foodGap - foodGap / 3));
        foods.push(new Food(blocksX + foodOffset, canvas.height - (foodGap * 2 - foodGap / 3)));
      }

    }
    blocks.push(new Block(blocksX, blocksY));
    blocks.push(new Block(blocksX, endBlockY - blocksY));
  }
}
function handleBlocks() {
  let c = 0
  let l = 0
  for (i = 0; i < blocks.length; ++i) {
    blocks[i].draw()
    if (blocks[i].x < player.x + player.width &&
      blocks[i].x + blocks[i].width > player.x &&
      blocks[i].y < player.y + player.height &&
      blocks[i].height + blocks[i].y > player.y) {
      player.colliding = true
      !player.lastFacing ? player.lastFacing = player.facing : 0
    } else {
      c++
    }
    if (blocks[i].x < lepik.x + lepik.width &&
      blocks[i].x + blocks[i].width > lepik.x &&
      blocks[i].y < lepik.y + lepik.height &&
      blocks[i].height + blocks[i].y > lepik.y) {
      lepik.colliding = true
      !lepik.lastFacing ? lepik.lastFacing = lepik.facing : 0
    } else {
      l++
    }
  }
  if (c == blocks.length) { player.colliding = false; player.lastFacing = "" }
  if (l == blocks.length) { lepik.colliding = false; lepik.lastFacing = "" }

}

function handleFood() {
  for (i = 0; i < foods.length; ++i) {
    if (foods[i].x < player.x + player.width &&
      foods[i].x + foods[i].width > player.x &&
      foods[i].y < player.y + player.height &&
      foods[i].height + foods[i].y > player.y) {
      if (!Math.floor(Math.random() * 5)) {
        let audio = document.createElement("audio")
        audio.src = audioPath + "eat.mp3"
        audio.play()
      }
      foods[i].x = 1000
      score++
    }
    foods[i].draw()
  }
}

function handlePlayer() {
  switch (player.facing) {
    case "left":
      if (player.x > 0 && player.lastFacing != player.facing) player.x -= player.speed
      break;
    case "right":
      if (player.x + player.width < canvas.width && player.lastFacing != player.facing) player.x += player.speed
      break;
    case "up":
      if (player.y > 0 && player.lastFacing != player.facing) player.y -= player.speed
      break;
    case "down":
      if (player.y + player.height < canvas.height && player.lastFacing != player.facing) player.y += player.speed
      break;
  }
  ctx.drawImage(images["player" + player.facing], player.x, player.y, player.width, player.height)
}

function handleLepik() {
  if (lepik.x < player.x + player.width &&
    lepik.x + lepik.width > player.x &&
    lepik.y < player.y + player.height &&
    lepik.height + lepik.y > player.y) {
    gameover = true
  }

  if (liborRotation % lrCounter == 0) {
    if (liborRotation == 0) lepik.facing = dirArr[Math.floor(Math.random() * dirArr.length / 2)]
    if (liborRotation == lrCounter) lepik.facing = "left"
    if (liborRotation > lrCounter) lepik.facing = dirArr[Math.floor(Math.random() * dirArr.length)]
  }
  switch (lepik.facing) {
    case "left":
      if (lepik.x > 0 && lepik.lastFacing != lepik.facing) lepik.x -= lepik.speed
      break;
    case "right":
      if (lepik.x + lepik.width < endBlockY && lepik.lastFacing != lepik.facing) lepik.x += lepik.speed
      break;
    case "up":
      if (lepik.y > 0 && lepik.lastFacing != lepik.facing) lepik.y -= lepik.speed
      break;
    case "down":
      if (lepik.y + lepik.height < canvas.height && lepik.lastFacing != lepik.facing) lepik.y += lepik.speed
      break;
  }
  ctx.drawImage(images["lepik" + cleared + lepik.facing], lepik.x, lepik.y, lepik.width, lepik.height)

  liborRotation++
}

function handleMovement() {
  document.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
      case "a":
      case "arrowleft":
        if (player.x > 0) {
          player.facing = "left"
        }
        break;
      case "d":
      case "arrowright":
        if (player.x + player.width < canvas.width) {
          player.facing = "right"
        }
        break;
      case "s":
      case "arrowdown":
        if (player.y + player.height < canvas.height) {
          player.facing = "down"
        }
        break;
      case "w":
      case "arrowup":
        if (player.y > 0) {
          player.facing = "up"
        }
        break;
    }
  })
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  handleBlocks()
  handleFood()
  handlePlayer()
  handleLepik()
  if (cleared > 0) {
    handleBarel(true)
    if (cleared > 1)
      handleBarel(false)
  }
  if (playAnim) handleParticles()
  if (score == foods.length) {
    let audio = document.createElement("audio")
    audio.src = audioPath + "juhu.mp3"
    audio.play()
    cleared++
    if (cleared != totalClear) {
      spawnBlocks()
      spawnParticles(false)
      playAnim = true
      lepik.speed += 2
      lrCounter -= 5
    }
  }
  if (!gameover && cleared != 3) return requestAnimationFrame(animate)
  if (cleared == 3) {
    gameWon()
  }
  document.getElementById("refresh").style.display = "block"
}

let addedEndParticles = false
function gameWon() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  handleBlocks()
  handleFood()
  handlePlayer()
  if (!addedEndParticles) spawnParticles(true)
  handleParticles()
  addedEndParticles = true
  if (particles[0]) {
    return requestAnimationFrame(gameWon)
  }
  document.getElementById("refresh").style.display = "block"
}
