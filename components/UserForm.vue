<template>
  <AdminCommonForm
    back-route="admin.motor-admin.users"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      {{ $t('motor-admin.global.basic_information') }}
    </h6>
    <div class="row">
      <div class="col-md-12">
        <FormsCheckboxArrayField
          id="clients"
          v-model="model.clients"
          name="clients"
          :label="$t('motor-admin.clients.client')"
          :options="clients"
        />
        <FormsInputField
          id="name"
          v-model="model.name"
          type="text"
          name="name"
          :label="$t('motor-admin.users.name')"
        />
        <FormsInputField
          id="email"
          v-model="model.email"
          type="text"
          name="email"
          :label="$t('motor-admin.users.email')"
        />
        <FormsInputField
          id="password"
          v-model="model.password"
          type="password"
          name="password"
          :label="$t('motor-admin.users.password')"
        />
        <FormsFileUploadField
          id="avatar"
          v-model="model.avatar"
          name="avatar"
          :label="$t('motor-admin.users.avatar')"
        />
        <FormsCheckboxArrayField
          id="roles"
          v-model="model.roles"
          name="roles"
          :label="$t('motor-admin.roles.roles')"
          :options="roles"
        />
      </div>
    </div>
  </AdminCommonForm>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import userForm from '@zrm/motor-nx-admin/forms/userForm'
import { storeToRefs } from "pinia";
const { t } = useI18n()

const props = defineProps({
  edit: Boolean,
});

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
