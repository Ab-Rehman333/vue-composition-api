<template>
    <div class="practice">

        <h1 :class="{ 'active': classesPro.active, 'text-bg-dark': classesPro['fw-bold'] }">{{ fullName }}</h1>
        <h1 :class="{ classesPro }"></h1>
    </div>
</template>
  
  
<script setup>

import { computed, reactive, ref } from 'vue';
// setter and getter with computed properties 
let firstName = ref('Abdul');
let LastName = ref('Rehman');
const fullName = computed({
    get() {
        return `${firstName.value} ${LastName.value}`;
    },
    set(changedValue) {
        return [firstName.value, LastName.value] = changedValue.split(" ");
    },

})

const classesPro = reactive({
    active: true,
    "fw-bold": true,
})

</script>