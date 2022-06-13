<script lang="ts" setup>
import { $fetch } from 'ohmyfetch'

interface book {
  id?: number,
  name: string,
  url: string,
  authors?: string[],
  publishers?: string[],
  date?: string,
  fileType?: string,
  language?: string,
  fileSize?: string,
}

interface raw {
  a?: book[]
  z?: book[]
  g?: book[]
  m?: book[]
  o?: book[]
  b?: book[]
}

const providers = {
  a: 'All',
  z: 'Z-Library',
  g: 'Library Genesis',
  m: 'Mem of The World',
  o: 'Open Library',
  b: 'Online Books Page',
}

let data:raw = $ref()
const name = $ref('')
let load:boolean = $ref(false)
const checked:string|string[] = $ref('a')

async function search() {
  load = true
  let provider = checked
  if (checked === 'a') provider = Object.keys(providers)
  data = await $fetch(
    '/api/AllBooks',
    {
      method: 'POST',
      params: { name, provider },
      parseResponse: JSON.parse,
    },
  )
  load = false
}
</script>

<template>
  <h1 class="mx-auto text-3xl font-semibold my-4">
    Bookie
  </h1>
  <div class="mx-auto">
    <div class="flex-row space-x-4">
      <div v-for="(name, index) in providers" :key="index" style="display: inline-block;">
        <input :id="index" v-model="checked" type="radio" :value="index">
        <label :for="name" class="mr-1">&nbsp;{{ name }}</label>
      </div>
    </div>

    <input
      v-model="name"
      placeholder="Search..."
      class="border-(light-800 2) p-2 my-4 rounded-lg"
      @keydown.enter="search"
    >
  </div>

  <div v-if="load" class="mx-auto text-3xl font-semibold my-4">
    Loading...
  </div>

  <template v-if="data">
    <template v-for="provider in data">
      <div v-for="b in provider" :key="b.url" class="flex-row">
        {{ b.fileType }}
        {{ b.fileSize }}
        <a :href="b.url" target="_blank">{{ b.name }}</a>
        {{ b.authors ? `by ${b.authors.join(', ')}` : '' }}
      </div>
    </template>
  </template>

  <Footer />
</template>
