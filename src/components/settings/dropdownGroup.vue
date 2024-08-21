<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue';
import InputWithLabel from '../elements/InputWithLabel.vue';
const props = defineProps(["settings"])
const emit = defineEmits(["changed"])

const values = ref(props.settings)

const updateSettingsObject = () => {
    const settings_object: {[key: string]: string | unknown} = {}
    Object.entries(values.value).forEach(setting => {
        settings_object[setting[0]] = (setting[1] as HTMLInputElement).value || setting[1]
    })
    return settings_object
}

onBeforeMount(()=>{
    const settings_object: {[key: string]: string | unknown} = updateSettingsObject()
    emit("changed",settings_object) 
})

watch(values.value, () => {
    const settings_object: {[key: string]: string | unknown} = updateSettingsObject()
    emit("changed",settings_object) 
})

</script>

<template>
<div v-for="val,key in values">
    <InputWithLabel type="text" class="my-2" :label="key" :value="val" v-model="values[key]" ></InputWithLabel>
</div>
</template>