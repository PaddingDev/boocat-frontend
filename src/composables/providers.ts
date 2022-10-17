type provider = Record<string, {
  name: string
  background: string
  text: string
}>

export const providers: provider = {
  a: { name: 'All', background: '#FFFFFF', text: '#000000' },
  z: { name: 'Z-Library', background: '#0089A7', text: '#FFFFFF' },
  g: { name: 'Library Genesis', background: '#A00000', text: '#FFFFFF' },
  m: { name: 'Mem of The World', background: '#CB1B45', text: '#FFFFFF' },
  o: { name: 'Open Library', background: '#EFBB24', text: '#FFFFFF' },
  b: { name: 'Online Books Page', background: '#1B813E', text: '#FFFFFF' },
}
