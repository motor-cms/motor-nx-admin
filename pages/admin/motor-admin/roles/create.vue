<template>
  <AdminCommonForm back-route="admin.motor-admin.roles" :title="title" @submit="onSubmit">
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      {{ $t("motor-admin.global.basic_information") }}
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('motor-admin.roles.name')"
          v-model="model.name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsSelectField
          type="text"
          name="guard_name"
          id="guard_name"
          :label="$t('motor-admin.roles.guard_name')"
          :options="['web', 'api']"
          v-model="model.guard_name"
        ></FormsSelectField>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <FormsCheckboxArrayField
          name="permissions"
          id="permissions"
          :label="$t('motor-admin.permissions.permissions')"
          v-model="model.permissions"
          :options="permissions.filter((p) => p.guard_name == model.guard_name)"
        ></FormsCheckboxArrayField>
      </div>
    </div>
    <!-- {{permissions}} -->
  </AdminCommonForm>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import form from "@zrm/motor-nx-admin/forms/roleForm";

// Load i18n module
const { t } = useI18n();

// Load router
const router = useRouter();

// Load form
const { model, getData, onSubmit, permissions, loadPermissions } = form();

// Set default action title
const title = ref(t("motor-admin.roles.create"));

// Sanitize roles
watch(model, () => {
  const checkAgainst = Object.entries(model.value.permissions);

  const options = [];
  for (const object of checkAgainst) {
    const checkObject: any = object;
    if (checkObject[1]) {
      options.push(checkObject[1]["id"]);
    }
  }

  model.value.permissions = options;
});
watch(
  () => model.value.guard_name,
  () => {
    model.value.permissions = [];
  }
);

await loadPermissions();
</script>
