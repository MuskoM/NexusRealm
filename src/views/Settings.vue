<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue';
import { useSettingsStore } from '../stores/settingsStore';
import DropdownGroup from '../components/settings/dropdownGroup.vue';
import InputWithLabel from '../components/elements/InputWithLabel.vue';

const settingsStore = useSettingsStore();

const settingGroups = computed(()=>{
    return settingsStore.settings
})

onBeforeMount(async ()=>{
    await settingsStore.readSettings();
})
</script>

<template>
<p class="text-4xl mb-2">Settings</p>
<hr/>
<p class="text-xl mt-2 mb-4">API Keys</p>
<div class="divide-y divide-dashed" v-for="value, key in settingGroups">
    <div v-if="typeof(value) === 'object'">
        <DropdownGroup :settings="value"></DropdownGroup>
    </div>
    <InputWithLabel v-else>{{ key }} -> {{ value }}</InputWithLabel>
</div>
</template>

<style>
</style>
