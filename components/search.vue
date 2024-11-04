<template>
  <div class="">
    <div class="search-user">
      <input v-model.trim="searchText" class="input-search" type="text" />
      <div class="">
        <button @click="search" class="search-user-description">Seacrh</button>
      </div>
    </div>

    <div v-if="isFind" class="search-nothing">There is nothing</div>
    <div v-if="searchData.length > 0" class="search-data">
      <MainTable :users="searchData" :currentPage="currentPage" />
    </div>
  </div>
</template>
<script setup lang="ts">
import UseGetUsers from '~/composables/UseGetUsers';
interface IUsers {
  id: number;
  name: string;
  email: string;
  phone: string;
}
const { users } = await useGetUsers();
const searchText = ref('');
const searchData = ref([]);
const isFind = ref(false);
const search = () => {
  searchData.value = [];
  if (!searchText.value) {
    return;
  }
  users.value.forEach((user: IUsers) => {
    if (user.name.includes(searchText.value)) {
      searchData.value.push(user);
    }
  });
  console.log(searchData.value.length);
  if (searchData.value.length !== 0) {
    isFind.value = false;
  } else {
    isFind.value = true;
  }
};
</script>
<style lang="scss" scoped>
.search-user,
.search-nothing {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 50px;
  .search-user-description {
    margin-left: 25px;
    box-shadow: 10px 5px 5px #513409;
    padding: 0px 10px;
    border-radius: 5px;
    height: 30px;

    border: 1px solid $bg-dark-gary;
  }
  .input-search {
    width: 360px;
    height: 25px;
    border-radius: 5px;
    border: 1px solid $bg-dark-gary;
    background-color: $bg-gray;
    box-shadow: 10px 5px 5px #513409;
  }
}
.search-data {
  border-radius: 5px;
}
</style>
