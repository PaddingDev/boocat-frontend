<template>
  <div mx-4>
    <Header />
    <Suspense>
      <RouterView />
    </Suspense>
    <Footer />
  </div>
</template>
