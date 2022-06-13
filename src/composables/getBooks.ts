import { $fetch } from 'ohmyfetch'

export type raw = Record<string, book[]>

interface book {
  id?: number
  name: string
  url: string
  authors?: string[]
  publishers?: string[]
  date?: string
  fileType?: string
  language?: string
  fileSize?: string
}

export async function getBooks(name: string, provider: string|string[]): Promise<raw> {
  return await $fetch(
    '/api/AllBooks',
    {
      method: 'POST',
      params: { name, provider },
      parseResponse: JSON.parse,
    },
  )
}
