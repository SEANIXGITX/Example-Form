import { defineStore } from "pinia";
import { reactive } from "vue";

export const btnStore = defineStore("buttons", () => {
    // states
    const btnStates = reactive({
        btnSubmit: true,
        btnEdit: false,
        btnCancel: false
    })

    return { btnStates }
})