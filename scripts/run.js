canvas.style.display = "none"
document.getElementById("play").addEventListener("click", () => {
  document.getElementById("play").style.display = "none"
  canvas.style.display = ""
  loadImages()
  spawnBlocks()
  handleMovement()
  animate()
  let bgAudio = document.createElement("audio")
  bgAudio.volume = .2
  bgAudio.src = audioPath + "bg.wav"
  bgAudio.play()
  bgAudio.addEventListener('ended', () => bgAudio.play());
})


