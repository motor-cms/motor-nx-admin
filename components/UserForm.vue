<template>
    <AdminCommonForm
      back-route="admin.motor-admin.users"
      :title="title"
      @submit="onSubmit"
    >
      <h6 class="text-uppercase text-body text-xs font-weight-bolder">
        {{ $t('motor-admin.global.basic_information')}}
      </h6>
      <div class="row">
        <div class="col-md-12">
          <FormsCheckboxArrayField
            name="clients"
            id="clients"
            :label="$t('motor-admin.clients.client')"
            :options="clients"
            v-model="model.clients"
          ></FormsCheckboxArrayField>
          <FormsInputField
            type="text"
            name="name"
            id="name"
            :label="$t('motor-admin.users.name')"
            v-model="model.name"
          ></FormsInputField>
          <FormsInputField
            type="text"
            name="email"
            id="email"
            :label="$t('motor-admin.users.email')"
            v-model="model.email"
          ></FormsInputField>
          <FormsInputField
            type="password"
            name="password"
            id="password"
            :label="$t('motor-admin.users.password')"
            v-model="model.password"
          ></FormsInputField>
          <FormsFileUploadField
            name="avatar"
            id="avatar"
            :label="$t('motor-admin.users.avatar')"
            v-model="model.avatar"
          ></FormsFileUploadField>
          <FormsCheckboxArrayField
            name="roles"
            id="roles"
            :label="$t('motor-admin.roles.roles')"
            v-model="model.roles"
            :options="roles"
          ></FormsCheckboxArrayField>
        </div>
      </div>
    </AdminCommonForm>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import userForm from '@zrm/motor-nx-admin/forms/userForm'
import {storeToRefs} from "pinia";
const {t} = useI18n()

const props = defineProps({
  edit: Boolean,
});

// Load i18n module
const { t } = useI18n()
const title = props.edit? t('motor-admin.users.edit') : t('motor-admin.users.create')
const { userHasClient } = storeToRefs(useUserStore());

// Load form
const { model, onSubmit, clients, roles, form, getData, loadClients, loadRoles} = userForm()

// Sanitize roles
watch(model, () => {
  const checkAgainst = Object.entries(model.value.roles)

  const options = []
  for (const object of checkAgainst) {
    const checkObject: any = object
    if (checkObject[1]) {
      options.push(checkObject[1]['id'])
    }
  }

  model.value.roles = options
})
watch(model, () => {
  const checkAgainst = Object.entries(model.value.clients)

  const options = []
  for (const object of checkAgainst) {
    const checkObject: any = object
    if (checkObject[1]) {
      options.push(checkObject[1]['id'])
    }
  }

  model.value.clients = options
})

if (props.edit) {
  await getData();
}
await loadClients();
await loadRoles();

</script>
