<script lang="ts" setup>
import { raw } from '~/composables/getBooks'

const providers = new Map<string, string>([
  ['a', 'All'],
  ['z', 'Z-Library'],
  ['g', 'Library Genesis'],
  ['m', 'Mem of The World'],
  ['o', 'Open Library'],
  ['b', 'Online Books Page'],
])

let data:raw = $ref()
const name:string = $ref()
let load:boolean = $ref(false)
const checked:string|string[] = $ref('a')
let isMultiCol = $ref(false)

async function search() {
  load = true
  let provider = checked
  isMultiCol = checked === 'a'
  if (checked === 'a') provider = Array.from(providers.keys())
  data = await getBooks(name, provider)
  load = false
}
</script>

<template>
  <div class="mx-auto">
    <div class="flex-row space-x-4">
      <div v-for="(pname, index) in providers" :key="index" style="display: inline-block;">
        <input :id="pname[0]" v-model="checked" type="radio" :value="pname[0]">
        <label :for="pname[0]" class="mr-1">&nbsp;{{ pname[1] }}</label>
      </div>
    </div>

    <input
      v-model="name"
      placeholder="Search..."
      border="light-800 2"
      class="p-2 my-4 rounded-lg"
      @keydown.enter="search"
    >
  </div>

  <div v-if="load" class="mx-auto text-3xl font-semibold my-4">
    Loading...
  </div>

  <div v-if="data" class="flex-row space-x-4">
    <template v-for="(result, prov) in data">
      <div v-if="!result.success" :key="result.err?.msg">
        {{ result.err }}
      </div>
      <div v-else :key="result.books![0].url" class="flex-col space-y-4" :class="isMultiCol ? 'w-1/4' : ''">
        <template v-if="isMultiCol">
          <p :key="providers.get(prov)">
            {{ providers.get(prov) }}
          </p>
        </template>
        <div v-for="b in result.books" :key="b.url">
          <div class="flex-row space-x-2">
            <span
              v-if="b.fileType"
              class="rounded-md bg-gray-400 text-light-200 px-1 py-0.5 uppercase"
            >
              {{ b.fileType }}
            </span>
            <span
              v-if="b.fileSize"
              class="rounded-md bg-gray-400 text-light-200 px-1 py-0.5 uppercase"
            >
              {{ b.fileSize }}
            </span>
          </div>
          <a :href="b.url" target="_blank">
            {{ b.name }}
          </a>
          {{ b.authors && b.authors.length ? `by ${b.authors.join(', ')}` : '' }}
        </div>
      </div>
    </template>
  </div>
</template>
