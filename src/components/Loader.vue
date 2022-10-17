<template>
  <div class="loader" m="x-auto t-8" />
  <div class="text-3xl font-semibold" m="x-auto t-8 b-4">
    <p mx-auto>
      Loading...
    </p>
  </div>
</template>
<!-- same line in flex layout -->

<style scoped>
.loader {
  border: 0.5rem solid #f3f3f3;
  border-radius: 50%;
  border-top: 0.5rem solid grey;
  width: 6.8rem;
  height: 6.8rem;
  -webkit-animation: spin 1.75s linear infinite;
  animation: spin 1.75s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
