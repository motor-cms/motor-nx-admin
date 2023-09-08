import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import modelRepository from '../api/permission'
import permissionGroupAPI from '../api/permissionGroup'
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {InferType, number, object, string} from "yup";

export default function permissionForm() {
  // Load i18n module
  const {t, tm} = useI18n()

  // Validation schema
  const schema = object({
    id: number().min(1).nullable(),
    name: string().nullable(),
    permission_group_id: number().nullable(),
    guard_name: string().min(2).nullable().label(t('motor-admin.permissions.guard_name')),
    itemName: string().min(2).nullable().label(t('motor-admin.permissions.name')),
  })

  type LanguageForm = InferType<typeof schema>;

  // Record
  const model = ref<LanguageForm>({
    id: null,
    name: '',
    permission_group_id: 0,
    guard_name: '',
    itemName: '',
  })

  const sanitizer = async (formData: any) => {
    //Remove itemName key from formData
    delete formData.itemName;
  }

  const route = useRoute()

  const {getData, onSubmit, form} = baseForm(
    'motor-admin.permissions',
    'admin.motor-admin.permissions.' + route.params.permissiongroupid,
    modelRepository(),
    model,
    schema,
    sanitizer,
  )

  return {
    getData,
    onSubmit,
    model,
    form
  }
}
