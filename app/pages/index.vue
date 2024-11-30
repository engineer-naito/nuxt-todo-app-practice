<template>
  <div
    flex="~ col"
    items-center
    justify-center
    gap-4xl
    bg-gray-100
    h-2xl
  >
    <h1
      text-4xl
      font-bold
      text-green-600
    />
    <NuxtLink
      to="/login/"
      text-lg
      text-white
      bg-green-500
      p="x-4 y-2"
      rounded
      shadow
      hover:bg-green-600
      mt-4
    >
      Sign In
    </NuxtLink>
  </div>
</template>
