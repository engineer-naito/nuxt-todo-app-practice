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
    <h1
      text-2xl
      font-bold
      mb-6
    >
      Sign In
    </h1>
    <form
      space-y-4
      @submit.prevent="handleSubmit"
    >
      <div>
        <label
          block
          mb-1
        >Email</label>
        <input
          v-model="email"
          type="email"
          required
          w-full
          px-4
          py-2
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
          px-4
          py-2
          border
          rounded
        >
      </div>
      <div>
        <button
          type="submit"
          w-full
          px-4
          py-2
          bg-green-500
          rounded
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>
