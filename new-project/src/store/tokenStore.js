import { defineStore } from "pinia"

export const useToken = defineStore("tokenStore", {
    state: () => ({
        userInfo: {
            phone: "",
            token: ""
        }
    }),
    persist: {
        enable: true,
        strategies: [
            {
                key: "token",
                storage: localStorage
            }
        ]
    },
    actions: {
        setToken(newPh, newTk) {
            this.userInfo.phone = newPh;
            this.userInfo.token = newTk;
        }
    }
})