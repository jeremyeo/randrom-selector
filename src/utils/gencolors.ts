export const presetColors = [
  '#F08080',
  '#DC143C',
  '#FFD700',
  '#FFA500',
  '#FFC0CB',
  '#FF8C00',
  '#FFEF00',
  '#00CED1',
  '#48D1CC',
  '#87CEEB',
  '#6A5ACD',
  '#9400D3',
  '#8FBC8F',
  '#00FA9A',
  '#FF69B4',
  '#CD5C5C',
  '#1E90FF',
  '#FFDAB9',
  '#B0E0E6',
  '#FFE4E1',
]

export function getRandomColors(colors: string[], count: number) {
  const shuffled = colors.sort(() => 0.5 - Math.random()) // 随机打乱颜色数组顺序
  return shuffled.slice(0, count) // 返回打乱后的前 count 个颜色
}
