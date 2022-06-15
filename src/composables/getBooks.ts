import { $fetch } from 'ohmyfetch'

export type raw = Record<string, resultModel>

interface errModel {
  msg: string
  source?: string
}
interface resultModel {
  success: boolean
  books?: bookInfo[]
  err?: errModel
}

interface bookInfo {
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
      method: 'GET',
      params: { name, provider },
      parseResponse: JSON.parse,
    },
  )
}
