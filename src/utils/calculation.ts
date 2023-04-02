interface Point {
  x: number
  y: number
}

export function shortenDistance(startPoint: Point, endPoint: Point, distance: number) {
  // 计算向量
  const dx = endPoint.x - startPoint.x
  const dy = endPoint.y - startPoint.y
  const length = Math.sqrt(dx * dx + dy * dy)

  // 计算缩短后的向量
  const shortenedLength = length - distance
  const shortenedDx = dx / length * shortenedLength
  const shortenedDy = dy / length * shortenedLength

  // 计算缩短后的点
  const shortenedPoint = {
    x: startPoint.x + shortenedDx,
    y: startPoint.y + shortenedDy,
  }

  return shortenedPoint
}

export function angleToRadian(angle: number) {
  return angle / 180 * Math.PI
}

export function getPointOnCircle(centerX: number, centerY: number, radius: number, angle: number) {
  const angleInRadians = angleToRadian(angle)
  const x = centerX + radius * Math.cos(angleInRadians)
  const y = centerY + radius * Math.sin(angleInRadians)
  return { x, y }
}
