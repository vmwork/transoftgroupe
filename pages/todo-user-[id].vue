<template>
  <div>
    <div v-if="!isloaded" class="page-loader">
      <img class="loader" src="~/assets/img/loader.svg" alt="Loader" />
    </div>
    <div v-else class="todo-page">
      <div class="todo-page-header">
        <span> {{ userName?.name }}</span>
        <button @click="backOnMainPage">Back</button>
      </div>

      <div class="todo-page-data" v-for="todo in todoses" :key="todo.id">
        <div class="todo-page-data--description">{{ todo.title }}</div>
        <div class="todo-page-data--state">
          <div
            class="data--state"
            :class="todoses[0].completed ? 'success' : 'waiting'"
          >
            <span v-if="todoses[0].completed">Success</span>
            <span v-else>Waiting</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UseGetTodos from '~/composables/useGetTodos';
import UseGetUsers from '~/composables/UseGetUsers';
const { todoses, getTodos, isloaded } = await UseGetTodos();

const { getUserName, userName } = await UseGetUsers();
const route = useRoute();
const router = useRouter();
const userId = ref();
const backOnMainPage = () => {
  router.go(-1);
};
userId.value = +route.fullPath.split('user-')[1];
getUserName(userId.value);
getTodos(userId.value);
</script>

<style lang="scss" scoped>
.todo-page-header {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 100px;
  span {
    font-size: 24px;
    font-weight: bold;
    border-radius: 5px;

    box-shadow: 10px 5px 5px #513409;
    padding: 10px;
  }
}
.todo-page-data {
  display: flex;
  justify-content: space-between;
  border: 1px solid $bg-dark-gary;
  background-color: $bg-gray;
  border-radius: 5px;
  padding: 0px 25px;
  margin: 10px 0px;
  box-shadow: 10px 5px 5px #513409;

  .todo-page-data--description {
    width: 75%;
    padding: 10px 0px;
    border-right: 1px solid $bg-dark-gary;
  }
  .todo-page-data--state {
    padding: 10px 0px;
  }
  .data--state {
    padding: 0px 10px;
    border-radius: 5px;
    &.waiting {
      background: #edb258;
      color: #513409;
    }
    &.success {
      background: #6dc822;
      color: #26450c;
    }
  }
}
</style>
