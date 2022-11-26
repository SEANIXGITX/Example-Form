<script setup>
import Form00 from "./components/Form00.vue"
import Registers from "./components/Registers.vue"
import { userStore } from "./stores/user.stores.js"

// Store
const user = userStore()

localStorage.setItem("usersArr", JSON.stringify(user.users))
</script>

<template>
  <Form00 />
  <Registers />

  

  </template>
