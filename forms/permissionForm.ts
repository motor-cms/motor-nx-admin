import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import modelRepository from '../api/permission'
import permissionGroupAPI from '../api/permissionGroup'
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {InferType, number, object, string} from "yup";
import {storeToRefs} from "pinia";

export default function permissionForm() {
  // Load i18n module
  const {t, tm} = useI18n()

  // Record
  const initialModelData = {
    name: '',
    permission_group_id: 0,
  }

  const initialFormData = {
    name: '',
    guard_name: '',
  }

  const formStore = useFormStore();
  const {model, formSchema} = storeToRefs(formStore);
  formStore.init(initialModelData, initialFormData);
  formSchema.value = {
    name: string().min(3).label(t('motor-admin.permissions.name')),
    guard_name: string().min(2).nullable().label(t('motor-admin.permissions.guard_name')),
  }

  const sanitizer = async (formData: any) => {
    //Remove itemName key from formData
    delete formData.itemName;
  }

  const route = useRoute()

  const {getData, onSubmit, form} = baseForm(
    'motor-admin.permissions',
    'admin.motor-admin.permissions.' + route.params.permissiongroupid,
    modelRepository(),
    sanitizer,
  )

  return {
    getData,
    onSubmit,
    model,
    form
  }
}
