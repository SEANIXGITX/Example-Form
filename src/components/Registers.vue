<script setup>
import { userStore } from "../stores/user.stores.js"
import { btnStore } from "../stores/btnState.stores.js"
import { onMounted } from "vue";

// Store
const user = userStore()
const formInput = user.formData

const buttons = btnStore()
const btnS = buttons.btnStates

// Data
// let indexEdit = 0

// Methods
const remove = (index) => {
    user.removeUser(index)
    localStorage.setItem("usersArr", JSON.stringify(user.users))
}
const edit = (index) => {
    const localUsers = JSON.parse(localStorage.getItem("usersArr"))
    formInput.firstName = localUsers[index].userFirstName
    formInput.lastName = localUsers[index].userLastName
    formInput.age = localUsers[index].userAge
    formInput.identificationDoc = localUsers[index].useridentificationDoc
    formInput.gender = localUsers[index].userGender
    formInput.genderOther = localUsers[index].userGenderOther

    btnS.btnSubmit = false
    btnS.btnEdit = true
    user.indexUser = index

}

// Lifecycle Hoocks
onMounted(() => {
    user.users = JSON.parse(localStorage.getItem("usersArr"))
})
</script>
<template>
    <div class="container">
        <h2>Registers</h2>
        <table class="table table-auto w-full">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>LastName</th>
                    <th>Age</th>
                    <th>Identification</th>
                    <th>Gender</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="us, index in user.users">
                    <td>{{ us.userFirstName }}</td>
                    <td>{{ us.userLastName }}</td>
                    <td>{{ us.userAge }}</td>
                    <td>{{ us.useridentificationDoc }}</td>
                    <td v-if="us.userGender == 'Male' ||
                    us.userGender == 'Female'">
                        {{ us.userGender }}
                    </td>
                    <td v-else>{{ us.userGenderOther }}
                    </td>
                    <td>
                        <button class="btn-small bg-secondary" @click="edit(index)">Edit
                        </button>
                        <button class="btn-small bg-red" @click="remove(index)">X
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>