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

const providerColour = new Map<string, string[]>([
  ['a', ['#FFFFFF', '#000000']],
  ['z', ['#0089A7', '#FFFFFF']],
  ['g', ['#A00000', '#FFFFFF']],
  ['m', ['#CB1B45', '#FFFFFF']],
  ['o', ['#EFBB24', '#FFFFFF']],
  ['b', ['#1B813E', '#FFFFFF']],
])

function getColour(provider: string) {
  const c = providerColour.get(provider)
  if (c)
    return `background: ${c[0]}; color: ${c[1]};`
  return ''
}

function maxJoin(arr : string[], max : number) {
  if (arr.length > max)
    return `${arr.slice(0, max).join(', ')}, etc.`
  return arr.join(', ')
}

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
let isLoad: boolean = $ref(false)
const checked: string | string[] = $ref('a')
let isMultiCol = $ref(false)

async function search() {
  isLoad = true
  let provider = checked
  isMultiCol = checked === 'a'
  if (checked === 'a') provider = Object.keys(providers)
  data = await getBooks(name, provider)
  isLoad = false
}
</script>

<template>
  <div class="mx-auto">
    <div class="flex-col md:(flex-row space-x-4)">
      <div v-for="(pname, index) in providers" :key="index" style="display: inline-block;">
        <input :id="index" v-model="checked" type="radio" :value="index">
        <label :for="index" class="mr-1">&nbsp;{{ pname }}</label>
      </div>
    </div>

    <input
      v-model="name" placeholder="Search..." border="light-800 2" class="p-2 my-4 rounded-lg"
      type="search"
      @keydown.enter="search"
    >
  </div>

  <Loader v-if="isLoad" />

  <div v-if="data" class="md:(flex-row space-x-4)">
    <template v-for="(result, prov) in data">
      <div
        v-if="!result.success"
        :key="`${prov}-err`"
        class="flex-col space-y-4"
        :class="isMultiCol ? 'md:w-1/4' : ''"
      >
        <p :key="providersMap.get(prov)" :style="getColour(prov)" class="boo-round">
          {{ providersMap.get(prov) }} (-1)
        </p>
        <p style="font-style: italic;">
          Error: {{ result.err?.msg }} {{ result.err?.source ? `from ${result.err?.source}` : '' }}
        </p>
      </div>
      <div
        v-else :key="`${prov}-ok`"
        class="md:(flex-col) space-y-4"
        :class="isMultiCol ? 'md:w-1/4' : ''"
      >
        <template v-if="isMultiCol">
          <p :key="providersMap.get(prov)" :style="getColour(prov)" class="boo-round">
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
            <span v-if="b.authors && b.authors.length" style="font-style: italic;">
              <br>
              {{ isMultiCol ? `by ${maxJoin(b.authors, 3)}` : `by ${b.authors.join(', ')}` }}
            </span>
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.badge {
  @apply rounded-md bg-gray-400 text-light-200 px-1 py-0.5 uppercase;
}
.boo-round {
  @apply rounded-sm px-1 py-0.5;
}
</style>
