<template>
  <SelectField v-if="user" v-model="user.client_id" :options="clients">
  </SelectField>
</template>
<script setup lang="ts">
import SelectField from "@zrm/motor-nx-core/components/admin/partials/SelectField.vue";
import {storeToRefs} from "pinia";


const {clients, loadClients} = useFormData()
//const { client } = storeToRefs(useClientStore());
const { user } = storeToRefs(useUserStore());

await loadClients();

if (user.value && !user.value.client_id) {
  user.value.client_id = clients.value[0].value;
}
</script>
