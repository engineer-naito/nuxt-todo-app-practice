<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const isAuthenticated = computed(() => {
  return !!user.value;
});

const signIn = () => {
  navigateTo("/login");
};

const signOut = async () => {
  console.log("hello");
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
        px-4
        py-4
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
            px-4
            py-2
            border="~ green"
            rounded
            @click="signOut"
          >
            Sign Out
          </button>
          <button
            v-else
            px-4
            py-2
            bg-green
            rounded
            @click="signIn"
          >
            Sign In
          </button>
        </div>
      </nav>
    </header>
    <main
      container
      mx-auto
      px-4
    >
      <slot />
    </main>
  </div>
</template>
