<script lang="ts" setup>
import { raw } from '~/composables/getBooks'

const providersMap = new Map<string, string>([
  ['a', 'All'],
  ['z', 'Z-Library'],
  ['g', 'Library Genesis'],
  ['m', 'Mem of The World'],
  ['o', 'Open Library'],
  ['b', 'Online Books Page'],
])

const providers = {
  a: 'All',
  z: 'Z-Library',
  g: 'Library Genesis',
  m: 'Mem of The World',
  o: 'Open Library',
  b: 'Online Books Page',
}

let data: raw = $ref()
const name: string = $ref()
let load: boolean = $ref(false)
const checked: string | string[] = $ref('a')
let isMultiCol = $ref(false)

async function search() {
  load = true
  let provider = checked
  isMultiCol = checked === 'a'
  if (checked === 'a') provider = Object.keys(providers)
  data = await getBooks(name, provider)
  load = false
}
</script>

<template>
  <div class="mx-auto">
    <div class="flex-col md:(flex-row space-x-4)">
      <div v-for="(pname, index) in providers" :key="index" style="display: inline-block;">
        <input :id="index" v-model="checked" type="radio" :value="index">
        <label :for="pname" class="mr-1">&nbsp;{{ pname }}</label>
      </div>
    </div>

    <input
      v-model="name" placeholder="Search..." border="light-800 2" class="p-2 my-4 rounded-lg"
      @keydown.enter="search"
    >
  </div>

  <div v-if="load" class="mx-auto text-3xl font-semibold my-4">
    Loading...
  </div>

  <div v-if="data" class="md:(flex-row space-x-4)">
    <template v-for="(result, prov) in data">
      <div
        v-if="!result.success"
        :key="result.err?.msg"
        class="flex-col space-y-4"
        :class="isMultiCol ? 'md:w-1/4' : ''"
      >
        <p :key="providersMap.get(prov)">
          {{ providersMap.get(prov) }} (-1)
        </p>
        {{ result.err?.msg }} {{ result.err?.source ? `from ${result.err?.source}` : '' }}
      </div>
      <div
        v-else :key="providersMap.get(prov)"
        class="md:(flex-col) space-y-4"
        :class="isMultiCol ? 'md:w-1/4' : ''"
      >
        <template v-if="isMultiCol">
          <p :key="providersMap.get(prov)">
            {{ providersMap.get(prov) }} ({{ result.books === undefined ? 0 : result.books.length }})
          </p>
        </template>
        <div v-for="b in result.books" :key="b.url">
          <div class="md:(flex-row space-x-2)">
            <span v-if="b.fileType" class="badge">
              {{ b.fileType }}
            </span>
            <span v-if="b.fileSize" class="badge">
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

<style scoped>
.badge {
  @apply rounded-md bg-gray-400 text-light-200 px-1 py-0.5 uppercase;
}
</style>
