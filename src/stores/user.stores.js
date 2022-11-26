import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const userStore = defineStore("user", () => {
    // states
    const users = ref([{
        userFirstName: "Sergio",
        userLastName: "Ticona",
        userAge: 32,
        useridentificationDoc: "123456789",
        userGender: "Male",
        userGenderOther: ""
    },])
    const indexUser = ref(0)
    const formData = reactive({
        firstName: "",
        lastName: "",
        age: 18,
        identificationDoc: "",
        gender: "Male",
        genderOther: ""
    })

    // actions
    const addUser = () => {
        users.value.push({
            userFirstName: formData.firstName,
            userLastName: formData.lastName,
            userAge: formData.age,
            useridentificationDoc: formData.identificationDoc,
            userGender: formData.gender,
            userGenderOther: formData.genderOther
        })
        console.log(users.value)
    }

    const removeUser = (index) => {
        users.value.splice(index, 1)
    }

    const updateUser = (index) => {
        users.value[index].userFirstName = formData.firstName
        users.value[index].userLastName = formData.lastName
        users.value[index].userAge = formData.age
        users.value[index].useridentificationDoc = formData.identificationDoc
        users.value[index].userGender = formData.gender
        users.value[index].userGenderOther = formData.genderOther
    }

    return { users, formData, indexUser, addUser, removeUser, updateUser }
})