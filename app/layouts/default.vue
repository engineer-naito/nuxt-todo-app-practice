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
  navigateTo("/");
};
</script>

<template>
  <div>
    <header class="bg-white shadow mb-4">
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
          class="text-xl font-bold"
        >
          Todos
        </NuxtLink>
        <div>
          <button
            v-if="isAuthenticated"
            btn-p
            border="~ green"
            rounded
            @click="signOut"
          >
            Sign Out
          </button>
          <NuxtLink
            v-else
            to="/login"
            btn-p
            bg-green
            text-white
            rounded
          >
            Sign In
          </NuxtLink>
        </div>
      </nav>
    </header>
    <main class="container mx-auto py-8">
      <slot />
    </main>
  </div>
</template>
