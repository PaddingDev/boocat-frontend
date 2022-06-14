<script lang="ts" setup>
import { useDark } from '@vueuse/core'

useDark()
</script>

<template>
  <div class="mx-auto text-3xl font-semibold my-4" style="display: inline-block;">
    <a href="/">
      <h1>
        Bookie
      </h1>
      <sup>About</sup>
    </a>
  </div>
  <div class="mx-auto">
    <pre>
♡　  / l 、 　 　
　  （°˙ ꒳ · ｡7 　
　   l、    ヽ 　 　
　   じし  _, )ノ
    </pre>
  </div>
  <div class="mx-auto">
    <h2 class="text-2xl font-semibold my-3">
      Project Information
    </h2>
    <div>
      <p>
        Bookie is a book aggregation search engine created by KevinZonda & Percy Ma.
      </p>
      <p>
        Technology Stack: .NET, C#, Vue, TypeScript, Azure Function
      </p>
      <p>
        FrontEnd Source Code: <a href="https://github.com">GitHub</a>
        <br>
        BackEnd Source Code: <a href="https://github.com/KevinZonda/Bookie">https://github.com/KevinZonda/Bookie</a>
      </p>
    </div>
    <h2 class="text-2xl font-semibold my-3">
      Project Story
    </h2>
    <div>
      <p>
        The inspiration for this project came from worldmiao.two, a book aggregation search
        engine rumoured to have been created by a few Peking University students. However,
        several days after we heard about the site, it broke down. But it is really fancy and
        make KevinZonda think about it day and night. Finally, KevinZonda understood that it's
        his dream website. But it did not belong to him, more important, it was broken. Kevin
        cries for days and the site still had no symptoms of recovering.
      </p>
      <p>
        <span style="font-style: italic;">IELTS Writing Score</span>: <span style="color:red">2.5</span>/9.0
      </p>
      <p>
        <span style="font-style: italic;">Final Grade</span>: <span style="color:red">F<sup>-</sup></span>
      </p>
      <p>
        <span style="font-style: italic;">Teacher Comments</span>: Full of grammatical and lexical mistakes. Come to my office after class.
      </p>
    </div>
    <h2 class="text-2xl font-semibold my-3">
      Authors
    </h2>
    <div>
      <a href="https://github.com/KevinZonda" class="text-1xl font-semibold my-1">
        <h3 style="font-size: 1.2em;">KevinZonda <sub>(GitHub @ KevinZonda)</sub></h3>
      </a>
      <p>
        API creator. NET developer. B.Sc. Computer Science Student at the University of Birmingham.
      </p>
    </div>
    <div>
      <a href="https://github.com/kecrily" class="text-1xl font-semibold my-1">
        <h3 style="font-size: 1.2em;">Percy Ma <sub>(GitHub @ kecrily)</sub></h3>
      </a>
      <p>
        Front-end developer.
      </p>
    </div>
    <a href="/">
      &lt; Back to Home
    </a>
  </div>

  <Footer />
</template>
