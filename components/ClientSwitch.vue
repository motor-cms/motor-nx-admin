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

</script>
