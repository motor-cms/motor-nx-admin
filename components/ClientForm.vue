
<template>
  <AdminCommonForm
    back-route="admin.motor-admin.clients"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      {{ $t('motor-admin.global.basic_information')}}
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          id="name"
          v-model="model.name"
          type="text"
          name="name"
          :label="$t('motor-admin.clients.name')"
        ></FormsInputField>
      </div>
      <div class="col-md-4">
        <FormsStaticField
          id="slug"
          name="slug"
          :label="$t('motor-admin.clients.slug')"
          :value="model.slug"
          :empty-value="$t('motor-admin.clients.no_slug_yet')"
        ></FormsStaticField>
      </div>
      <div class="col-md-2">
        <FormsCheckboxField
          id="is_active"
          v-model="model.is_active"
          name="is_active"
          :label="$t('motor-admin.clients.is_active')"
        ></FormsCheckboxField>
      </div>
      <div class="row">
        <div class="col-md-12">
          <FormsTextAreaField
            id="description"
            v-model="model.description"
            name="description"
            :label="$t('motor-admin.clients.description')"
          ></FormsTextAreaField>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <FormsInputField
            id="address"
            v-model="model.address"
            type="text"
            name="address"
            :label="$t('motor-admin.global.address.address_1')"
          ></FormsInputField>
        </div>
        <div class="col-md-6">
          <FormsInputField
            id="zip"
            v-model="model.zip"
            type="text"
            name="zip"
            :label="$t('motor-admin.global.address.zip')"
          ></FormsInputField>
        </div>
        <div class="col-md-6">
          <FormsInputField
            id="city"
            v-model="model.city"
            type="text"
            name="city"
            :label="$t('motor-admin.global.address.city')"
          ></FormsInputField>
        </div>
        <div class="col-md-6">
          <FormsSelectField
            id="country_iso_3166_1"
            v-model="model.country_iso_3166_1"
            type="text"
            name="country_iso_3166_1"
            :label="$t('motor-admin.global.address.country')"
            :options="countryOptions"
          ></FormsSelectField>
        </div>
      </div>
      <h6 class="text-uppercase text-body text-xs font-weight-bolder">
        {{ $t('motor-admin.clients.contact_information')}}
      </h6>
      <div class="row">
        <div class="col-md-6">
          <FormsInputField
            id="contact_name"
            v-model="model.contact_name"
            type="text"
            name="contact_name"
            :label="$t('motor-admin.clients.contact')"
          ></FormsInputField>
        </div>
        <div class="col-md-6">
          <FormsInputField
            id="contact_phone"
            v-model="model.contact_phone"
            type="text"
            name="contact_phone"
            :label="$t('motor-admin.global.contact.phone')"
          ></FormsInputField>
        </div>
        <div class="col-md-6">
          <FormsInputField
            id="contact_email"
            v-model="model.contact_email"
            type="text"
            name="contact_email"
            :label="$t('motor-admin.global.contact.email')"
          ></FormsInputField>
        </div>
        <div class="col-md-6">
          <FormsInputField
            id="website"
            v-model="model.website"
            type="text"
            name="website"
            :label="$t('motor-admin.global.contact.website')"
          ></FormsInputField>
        </div>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script setup lang="ts">
import form from '@zrm/motor-nx-admin/forms/clientForm'
// Load i18n module
const { t } = useI18n()

const props = defineProps({
  edit: Boolean,
});

const title = props.edit? t('motor-admin.clients.edit') : t('motor-admin.clients.create');
// Load form
const { model, onSubmit, countryOptions, getData } = form()

if (props.edit) {
  await getData();
}

watch(() => model.value.name , () => {
  model.value.slug = model.value.name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}, { immediate: true })
</script>
