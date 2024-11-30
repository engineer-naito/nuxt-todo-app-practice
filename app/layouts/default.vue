<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const isAuthenticated = computed(() => {
  return !!user.value;
});

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <header
      bg-white
      shadow
      mb-4
    >
      <nav
        container
        mx-auto
        p-4
        flex
        justify-between
        items-center
      >
        <NuxtLink
          to="/"
          text-xl
          font-bold
        >
          Todos
        </NuxtLink>
        <div>
          <button
            v-if="isAuthenticated"
            p="x-4 y-2"
            border="~ green"
            rounded
            @click="signOut"
          >
            Sign Out
          </button>
          <NuxtLink
            v-else
            to="/login"
            p="x-4 y-2"
            bg-green
            rounded
          >
            Sign In
          </NuxtLink>
        </div>
      </nav>
    </header>
    <main
      container
      mx-auto
      py-8
    >
      <slot />
    </main>
  </div>
</template>
