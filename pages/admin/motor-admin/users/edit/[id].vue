<template>
    <AdminCommonForm
      back-route="admin.motor-admin.users"
      :title="title"
      @submit="onSubmit"
    >
      <h6 class="text-uppercase text-body text-xs font-weight-bolder">
        Basic information
      </h6>
      <div class="row">
        <div class="col-md-12">
          <FormsSelectField
            name="client_id"
            id="client_id"
            :label="$t('motor-admin.clients.client')"
            :options="clients"
            v-model="model.client_id"
          ></FormsSelectField>
          <FormsInputField
            type="text"
            name="name"
            id="name"
            :label="$t('motor-admin.users.name')"
            v-model="model.name"
          ></FormsInputField>
          <FormsFileField
            name="avatar"
            id="avatar"
            :label="$t('motor-admin.users.avatar')"
            v-model="model.avatar"
          ></FormsFileField>
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
<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import AdminCommonForm from 'motor-nx-core/components/admin/common/Form.vue'
import FormsSelectField from 'motor-nx-core/components/forms/SelectField.vue'
import FormsInputField from 'motor-nx-core/components/forms/InputField.vue'
import FormsFileField from '~/packages/motor-nx-core/components/forms/FileUploadField.vue'
import FormsCheckboxArrayField from 'motor-nx-core/components/forms/CheckboxArrayField.vue'
import { useI18n } from 'vue-i18n'
import form from 'motor-nx-admin/forms/userForm'

export default defineComponent({
  name: 'admin-motor-admin-users-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsFileField,
    FormsSelectField,
    FormsCheckboxArrayField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load form
    const { model, onSubmit, clients, roles } = form()

    // Set default action title
    const title = ref(t('motor-admin.users.edit'))

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

    return {
      model,
      title,
      onSubmit,
      clients,
      roles,
    }
  },
})
</script>
