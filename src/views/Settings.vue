<script lang="ts" setup>
import { computed, onBeforeMount, watch } from 'vue';
import { useSettingsStore } from '../stores/settingsStore';
import Button from '../components/elements/Button.vue';
import DropdownGroup from '../components/settings/dropdownGroup.vue';
import InputWithLabel from '../components/elements/InputWithLabel.vue';
import { ApiKeys } from '../types/settings';

const settingsStore = useSettingsStore();

const settingGroups = computed(() => {
    return settingsStore.settings
})

onBeforeMount(async () => {
    await settingsStore.readSettings();
})

watch(settingGroups, ()=>console.log(settingGroups))

const saveSettings = async (): Promise<void> => {
    await settingsStore.saveSettings()
}

const setSettings = (apiKeys: ApiKeys) => {
    settingsStore.settings.apiKeys = apiKeys
}

</script>

<template>
    <div class="flex flex-col">
        <p class="text-4xl mb-2">Settings</p>
        <hr />
        <p class="text-xl mt-2 mb-4">API Keys</p>
        <div class="divide-y divide-dashed" v-for="value, key in settingGroups">
            <div v-if="typeof (value) === 'object'">
                <DropdownGroup @changed="out => setSettings(out)" :settings="value"></DropdownGroup>
            </div>
            <InputWithLabel v-else>{{ key }} -> {{ value }}</InputWithLabel>
        </div>
        <Button @click="saveSettings" :background="true" class="flex self-end">Save</Button>
    </div>
</template>

<style></style>
