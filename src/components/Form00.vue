<script setup>
import { computed } from "vue";
import { userStore } from "../stores/user.stores.js"
import { btnStore } from "../stores/btnState.stores.js"
import useVuelidate from "@vuelidate/core"
import { required, minLength, helpers, numeric } from "@vuelidate/validators"

// Data
// let indexEdit = 0
var isValid = false

// Store
const user = userStore()
const formInput = user.formData

const buttons = btnStore()
const btnS = buttons.btnStates

// Validates
const containUser = (value) => {
    if (!value.includes("*")) {
        return true
    }
}
const adults = (value) => {
    if (value >= 18) {
        return true
    }
}
const rules = computed(() => {
    return {
        firstName: {
            required: helpers.withMessage("this field is required!!", required),
            // minLength: minLength(10), 
            minLength: helpers.withMessage("This field must contain 6 or more characters!!", minLength(6)),
            containUser: helpers.withMessage("Do not put strange characters in this field!!", containUser)
        },
        lastName: {
            required: helpers.withMessage("this field is required!!", required),
            // minLength: minLength(10), 
            minLength: helpers.withMessage("This field must contain 6 or more characters!!", minLength(6)),
            containUser: helpers.withMessage("Do not put strange characters in this field!!", containUser)
        },
        age: {
            required: helpers.withMessage("this field is required!!", required),
            numeric: helpers.withMessage("In this field plase insert positive value", numeric),
            adults: helpers.withMessage("Age must be over 17 years old", adults),
        },
        identificationDoc: { required: helpers.withMessage("this field is required!!", required) },
        gender: { required: helpers.withMessage("this field is required!!", required) },
        // genderOther: {  }
    }
})
const v$ = useVuelidate(rules, formInput)

// Methods
const add = async () => {
    isValid = await v$.value.$validate()
    if (isValid) {

        user.addUser()
        formInput.firstName = ""
        formInput.lastName = ""
        formInput.age = 18
        formInput.identificationDoc = ""
        formInput.gender = "Male"
        formInput.genderOther = ""

        localStorage.setItem("usersArr", JSON.stringify(user.users))
    } else {
        alert("invalid form!")
    }
}
const update = async (index) => {
    isValid = await v$.value.$validate()

    if (isValid) {
        user.updateUser(index)
        localStorage.setItem("usersArr", JSON.stringify(user.users))

        formInput.firstName = ""
        formInput.lastName = ""
        formInput.age = 18
        formInput.identificationDoc = ""
        formInput.gender = "Male"
        formInput.genderOther = ""

        btnS.btnEdit = false
        btnS.btnSubmit = true
    } else {
        alert("invalid form!!")
    }

}
const cancelEdit = () => {
    formInput.firstName = ""
    formInput.lastName = ""
    formInput.age = 18
    formInput.identificationDoc = ""
    formInput.gender = "Male"
    formInput.genderOther = "Male"
    btnS.btnSubmit = true
    btnS.btnEdit = false
}

// Lifecycle Hooks
</script>

<template>
    <div class="container">
        <h1>Example Form</h1>
        <div class="border border-primary
            shadow-xl mt-2 p-8">
            <h2>Form 00-1</h2>
            <form class="grid grid-cols-3
                gap-4 border
                border-secondary
                rounded-xl p-8" @submit.prevent="add">
                <div>
                    <label>First Name:</label>
                    <input type="text" class="focus:outline-none" v-model="formInput.firstName">
                    <!-- ERRORS -->
                    <ul v-for="error in v$.firstName.$errors" :key="error.$uid">
                        <li class="error" v-if="!isValid">{{ error.$message }}</li>
                    </ul>
                    <!-- END ERRORS -->
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" class="focus:outline-none" v-model="formInput.lastName">
                    <!-- ERRORS -->
                    <ul v-for="error in v$.lastName.$errors" :key="error.$uid">
                        <li class="error" v-if="!isValid">{{ error.$message }}</li>
                    </ul>
                    <!-- END ERRORS -->
                </div>
                <div>
                    <label>Age:</label>
                    <input type="text" class="focus:outline-none" v-model="formInput.age">
                    <!-- ERRORS -->
                    <ul v-for="error in v$.age.$errors" :key="error.$uid">
                        <li class="error" v-if="!isValid">{{ error.$message }}</li>
                    </ul>
                    <!-- END ERRORS -->
                </div>
                <div>
                    <label>identification document:</label>
                    <input type="text" class="focus:outline-none" v-model="formInput.identificationDoc">
                    <!-- ERRORS -->
                    <ul v-for="error in v$.identificationDoc.$errors" :key="error.$uid">
                        <li class="error" v-if="!isValid">{{ error.$message }}</li>
                    </ul>
                    <!-- END ERRORS -->
                </div>
                <div class="col-span-2">
                    <label>Gender:</label>
                    <select v-model="formInput.gender">
                        <option value="Male" selected>Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" placeholder="Tell us...." class="focus:outline-none mt-4 "
                        v-if="formInput.gender == 'Other'" v-model="formInput.genderOther">
                    <!-- ERRORS -->
                    <!-- <span
                        v-for="error in v$.genderOther.$errors"
                        :key="error.$uid">{{ error.$message }}
                    </span> -->
                    <!-- END ERRORS -->
                </div>

                <div class="flex justify-between">
                    <button type="submit" class="btn-primary" v-if="btnS.btnSubmit === true">Submit
                    </button>
                    <button type="button" class="btn-primary" v-if="btnS.btnEdit === true"
                        @click="update(user.indexUser)">Update
                    </button>
                    <button type="button" class="btn-secondary" v-if="btnS.btnEdit === true"
                        @click="cancelEdit()">Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>