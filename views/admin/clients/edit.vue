<template>
  <AdminCommonForm
    back-route="admin.motor-admin.clients"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('motor-admin.clients.name')"
          :value="model.name"
        ></FormsInputField>
      </div>
      <div class="col-md-4">
        <FormsStaticField
          :label="$t('motor-admin.clients.slug')"
          :value="model.slug"
          :empty-value="$t('no_slug_yet')"
        ></FormsStaticField>
      </div>
      <div class="col-md-2">
        <FormsCheckboxField
          name="is_active"
          id="is_active"
          :label="$t('motor-admin.clients.is_active')"
          :value="model.is_active"
        ></FormsCheckboxField>
      </div>
      <div class="row">
        <div class="col-md-12">
          <FormsTextAreaField
            name="description"
            id="description"
            :label="$t('motor-admin.clients.description')"
            :value="model.description"
          ></FormsTextAreaField>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <FormsInputField
            type="text"
            name="address"
            id="address"
            :label="$t('motor-admin.global.address.address_1')"
            :value="model.address"
          ></FormsInputField>
        </div>
        <div class="col-md-6">
          <FormsInputField
            type="text"
            name="zip"
            id="zip"
            :label="$t('motor-admin.global.address.zip')"
            :value="model.zip"
          ></FormsInputField>
        </div>
        <div class="col-md-6">
          <FormsInputField
            type="text"
            name="city"
            id="city"
            :label="$t('motor-admin.global.address.city')"
            :value="model.city"
          ></FormsInputField>
        </div>
        <div class="col-md-6">
          <FormsSelect2Field
            type="text"
            name="country_iso_3166_1"
            id="country_iso_3166_1"
            :label="$t('motor-admin.global.address.country')"
            :value="model.country_iso_3166_1"
            :options="countryOptions"
          ></FormsSelect2Field>
        </div>
      </div>
      <h6 class="text-uppercase text-body text-xs font-weight-bolder">
        Contact information
      </h6>
      <div class="row">
        <div class="col-md-6">
          <FormsInputField
            type="text"
            name="contact_name"
            id="contact_name"
            :label="$t('motor-admin.clients.contact')"
            :value="model.contact_name"
          ></FormsInputField>
        </div>
        <div class="col-md-6">
          <FormsInputField
            type="text"
            name="contact_phone"
            id="contact_phone"
            :label="$t('motor-admin.global.contact.phone')"
            :value="model.contact_phone"
          ></FormsInputField>
        </div>
        <div class="col-md-6">
          <FormsInputField
            type="text"
            name="contact_email"
            id="contact_email"
            :label="$t('motor-admin.global.contact.email')"
            :value="model.contact_email"
          ></FormsInputField>
        </div>
        <div class="col-md-6">
          <FormsInputField
            type="text"
            name="website"
            id="website"
            :label="$t('motor-admin.global.contact.website')"
            :value="model.website"
          ></FormsInputField>
        </div>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from 'motor-nx-core/components/admin/common/Form.vue'
import FormsInputField from 'motor-nx-core/components/forms/InputField.vue'
import FormsSelect2Field from 'motor-nx-core/components/forms/Select2Field.vue'
import FormsTextAreaField from 'motor-nx-core/components/forms/TextAreaField.vue'
import FormsCheckboxField from 'motor-nx-core/components/forms/CheckboxField.vue'
import FormsStaticField from 'motor-nx-core/components/forms/StaticField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import form from 'motor-nx-admin/forms/clientForm'

export default defineComponent({
  name: 'admin-motor-admin-clients-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsSelect2Field,
    FormsTextAreaField,
    FormsCheckboxField,
    FormsStaticField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit, countryOptions } = form()

    // Set default action title
    const title = ref(t('motor-admin.clients.create'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('motor-admin.clients.edit')
      getData(id)
    }

    return {
      model,
      title,
      onSubmit,
      countryOptions,
    }
  },
})
</script>
