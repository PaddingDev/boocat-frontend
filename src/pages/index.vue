<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import { raw } from '~/composables/getBooks'

useDark()

const providers = {
  a: 'All',
  z: 'Z-Library',
  g: 'Library Genesis',
  m: 'Mem of The World',
  o: 'Open Library',
  b: 'Online Books Page',
}

let data:raw = $ref()
const name:string = $ref()
let load:boolean = $ref(false)
const checked:string|string[] = $ref('a')

async function search() {
  load = true
  let provider = checked
  if (checked === 'a') provider = Object.keys(providers)
  data = await getBooks(name, provider)
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
      light:border="light-800 2"
      class="p-2 my-4 rounded-lg"
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
