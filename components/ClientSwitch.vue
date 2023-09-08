<template>
  <SelectField v-if="user" v-model="user.client_id" :options="clients">
  </SelectField>
</template>
<script setup lang="ts">
import SelectField from "~/packages/motor-nx-core/components/admin/partials/SelectField.vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "~/packages/motor-nx-core/store/user";

const {clients, loadClients} = useFormData()
//const { client } = storeToRefs(useClientStore());
const { user } = storeToRefs(useUserStore());

await loadClients(true);

watchEffect(() => {
  console.log("BIN DO", user.value, clients.value);
  if (user.value && !user.value.client_id) {
    user.value.client_id = clients.value[0].value;
  }
})
</script>
