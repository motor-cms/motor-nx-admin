
import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/permissionGroup'
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {InferType, number, object, string} from "yup";

export default function permissionGroupForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = object({
    id: number().min(1).nullable(),
    name: string().min(3),
    sort_position: number().nullable(),
  })

  type PermissionGroupForm = InferType<typeof schema>;

  // Record
  const model = ref<PermissionGroupForm>({
    id: null,
    name: '',
    sort_position: null,
  })

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-admin.permission',
    'admin.motor-admin.permissions',
    modelRepository(),
    model,
    schema,
    sanitizer
  )

  const { getRelevantFormData } = useCoreFormData();

  onMounted(async () => {
    await getRelevantFormData(getData,[
    ],[
    ]);
  })

  return {
    getData,
    onSubmit,
    model,
  }
}
