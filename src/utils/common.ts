export function splitStringBySize(str: string, size: number) {
  return str.match(new RegExp(`.{1,${size}}`, 'g')) || []
}
