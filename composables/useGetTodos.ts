export default async () => {
  interface ITodos {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
  const config = useRuntimeConfig();
  const isloaded = ref(false);
  const todoses = ref<ITodos>([]);
  const getTodos = async (id: string) => {
    isloaded.value = false;
    try {
      const { data: todos } = await useAsyncData('todos', () =>
        $fetch(`${config.public.apiBase}todos?userId=${id}`)
      );
      todoses.value = todos.value;
      isloaded.value = true;
    } catch (err) {
      console.log(err);
    }
  };

  return { todoses, getTodos, isloaded };
};
