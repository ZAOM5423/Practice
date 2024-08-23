import { defineStore } from "pinia"

export const useCurrentCity = defineStore("currentCityStore", {
    state: () => ({
        newCity: "北京"
    }),
    persist: {
        enabled: true,
        strategies: [
            {
                key: "city",
                storage: localStorage
            }
        ]
    }
})