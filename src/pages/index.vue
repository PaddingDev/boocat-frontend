<script lang="ts" setup>
import { $fetch } from 'ohmyfetch'

interface book {
  id?: number,
  isbn?: Number,
  name: string,
  url: string,
  authors?: string[],
  publishers?: string[],
  date?: string,
  fileType?: string,
  language?: string,
  filesize?: string,
}

interface error {
  msg: string,
  source: string,
}

const platformName = ['All', 'Z-Library', 'Library Genesis', 'Mem of The World', 'Open Library', 'Online Books Page']
const platforms = ['AllBook', 'ZLib', 'LibGen', 'Mem', 'OpenLib', 'OnlineBooks']
let books:book[] = $ref([])
let errors: error = $ref()

const name = $ref('')
const used = $ref('AllBook')

async function search() {
  // get element which id = load
  const load = document.getElementById('load')
  if (load != null) load.innerText = 'Loading...'
  if (used === 'AllBook') {
    books = []
    for (const platform of platforms.slice(1, 5)) {
      books.push.apply(
        books,
        await $fetch(`/api/${platform}`, {
          method: 'POST',
          params: { name },
          parseResponse: JSON.parse,
        }).catch((error) => {
          errors = error.data
        }),
      )
    }
  } else {
    books = await $fetch(`/api/${used}`, {
      method: 'POST',
      params: { name },
      parseResponse: JSON.parse,
    }).catch((error) => {
      errors = error.data
    })
  }
  if (load != null) load.innerText = ''
}
</script>

<template>
  <h1 class="mx-auto text-3xl font-semibold my-4">
    Bookie
  </h1>
  <div class="mx-auto">
    <div class="flex-row space-x-4">
      <div v-for="(platform, index) in platforms" :key="platform" style="display: inline-block;">
        <input :id="platform" v-model="used" type="radio" :value="platform">
        <label :for="platform" class="mr-1">&nbsp;{{ platformName[index] }}</label>
      </div>
    </div>

    <input
      v-model="name"
      placeholder="Search..."
      class="border-(light-800 2) p-2 my-4 rounded-lg"
      @keydown.enter="search"
    >
  </div>
  <p id="load" class="mx-auto text-3xl font-semibold my-4" />
  <template v-if="books">
    <div v-for="book in books" :key="book.id" class="mx-auto">
      <a :href="book.url" target="_blank">{{ book.name }}</a>
    </div>
  </template>
  <template v-else-if="errors">
    {{ errors.msg }}
  </template>
  <footer>
    <hr>
    <p class="mx-auto">
      Copyright &copy; Bookie 2022. Powered by Vue.js & .NET 6
    </p>
  </footer>
</template>
