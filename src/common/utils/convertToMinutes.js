const convertToMinutes = (duration) => {
  let minutes = Math.floor(duration / 60)
  let seconds = Math.floor(duration - minutes * 60)
  // Chuyển đổi sang chuỗi dạng mm:ss
  let minutesStr = minutes.toString().padStart(2, '0')
  let secondsStr = seconds.toString().padStart(2, '0')
  return `${minutesStr}:${secondsStr}`
}

export default convertToMinutes
