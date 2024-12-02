<template>
  <li
    class="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
  >
    <slot name="checkbox" />
    <div class="flex-1 flex items-center gap-2">
      <slot name="content" />
    </div>
    <slot name="actions" />
  </li>
</template>
