<script lang="ts" setup>
import { raw } from '~/composables/getBooks'
import { providers } from '~/composables/providers'

function maxJoin(arr: string[], max: number) {
  if (arr.length > max)
    return `${arr.slice(0, max).join(', ')}, etc.`
  return arr.join(', ')
}

function getColour(code: string) {
  const provider = providers[code]
  if (provider)
    return `background: ${provider.background}; color: ${provider.text};`
  return ''
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
  <div m="x-auto b-4">
    <div class="flex-col md:(flex-row space-x-4)">
      <div v-for="(p, index) in providers" :key="index" block>
        <input :id="index" v-model="checked" type="radio" :value="index">
        <label :for="index" class="mr-1">&nbsp;{{ p.name }}</label>
      </div>
    </div>

    <div class="items-baseline flex-row space-x-3">
      <input
        v-model="name" placeholder="Search..."
        border="light-800 2" class="p-2 my-4 rounded-lg w-full"
        type="search"
        @keydown.enter="search"
      >
      <button class="bg-dark-800 dark:bg-dark-400 text-light-500 rounded-md h-11 px-4" @click="search">
        Search
      </button>
    </div>
  </div>

  <Loader v-if="isLoad" />

  <div v-if="data" class="md:(flex-row space-x-4)">
    <template v-for="(result, p) in data">
      <div
        v-if="!result.success"
        :key="`${p}-err`"
        class="flex-col space-y-4"
        :class="isMultiCol ? 'md:w-1/4' : ''"
      >
        <p :key="providers[p].name" :style="getColour(p)" class="boo-round">
          {{ providers[p].name }} (-1)
        </p>
        <p italic>
          Error: {{ result.err?.msg }} {{ result.err?.source ? `from ${result.err?.source}` : '' }}
        </p>
      </div>

      <div
        v-else :key="`${p}-ok`"
        class="md:flex-col space-y-4"
        :class="isMultiCol ? 'md:w-1/4' : ''"
      >
        <template v-if="isMultiCol">
          <p :key="providers[p].name" :style="getColour(p)" class="boo-round">
            {{ providers[p].name }} ({{ result.books === undefined ? 0 : result.books.length }})
          </p>
        </template>
        <div v-for="b in result.books" :key="b.url">
          <div class="flex-row space-x-2">
            <span v-if="b.fileType" class="badge">
              {{ b.fileType }}
            </span>
            <span v-if="b.fileSize" class="badge">
              {{ b.fileSize }}
            </span>
          </div>
          <a :href="b.url" target="_blank">
            {{ b.name }}
            <span v-if="b.authors && b.authors.length" italic>
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
