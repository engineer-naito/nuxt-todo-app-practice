<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

watchEffect(() => {
  if (user.value) {
    navigateTo("/todos");
  }
});

const email = ref("");
const password = ref("");
const error: Ref<string | null> = ref(null);

async function handleSubmit() {
  error.value = null;
  try {
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (loginError) {
      error.value = loginError.message;
      return;
    }
    navigateTo("/todos");
  }
  catch (err) {
    error.value = `${err}`;
    console.error(err);
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-16">
      Sign In
    </h1>
    <form
      space-y-8
      p-8
      border="~ green"
      @submit.prevent="handleSubmit"
    >
      <div>
        <label class="block mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          required
          w-full
          p="x-4 y-2"
          border
          rounded
        >
      </div>
      <div>
        <label
          block
          mb-1
        >Password</label>
        <input
          v-model="password"
          type="password"
          required
          w-full
          p="x-4 y-2"
          border
          rounded
        >
      </div>
      <button
        type="submit"
        w-full
        p="x-4 y-2"
        bg-green
        text-white
        border
        rounded
      >
        Login
      </button>
    </form>
    <p
      v-if="error"
      class="text-red-500 text-lg mt-4"
    >
      {{ error }}
    </p>
  </div>
</template>
