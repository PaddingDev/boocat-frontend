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
  <div class="mx-auto text-3xl font-semibold my-4" style="display: inline-block;">
    <a href="/">
      <h1>
        Bookie
      </h1>
      <sup>Search Engine</sup>
    </a>
  </div>
  <div class="mx-auto">
    <div class="flex-row space-x-4">
      <div v-for="(pname, index) in providers" :key="index" style="display: inline-block;">
        <input :id="index" v-model="checked" type="radio" :value="index">
        <label :for="pname" class="mr-1">&nbsp;{{ pname }}</label>
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
    <template v-for="result in data">
      <template v-if="result.success">
        <div v-for="b in result.books" :key="b.url" class="flex-row">
          <a :href="b.url" target="_blank">
            {{ b.fileType }}
            {{ b.fileSize }}
            {{ b.name }}
            {{ b.authors != null && b.authors.length > 0 ? `by ${b.authors.join(', ')}` : '' }}
          </a>
        </div>
      </template>
      <template v-else>
        <template v-if="result.err">
          <p :key="result.err.msg">
            {{ result.err.msg }}
          </p>
        </template>
        <template v-else>
          Parse failed!
        </template>
      </template>
    </template>
  </template>

  <Footer />
</template>
