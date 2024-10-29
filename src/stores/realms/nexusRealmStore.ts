import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNexusRealmStore = defineStore('realm_nexus', () => {
  const realmBoardText = ref('{"hello":"json", "arr": [0,2], "m": {}}')
  return { realmBoardText }
})
