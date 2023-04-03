export function splitStringBySize(str: string, size: number) {
  return Array.from(str.match(new RegExp(`.{1,${size}}`, 'g')) || [])
}
