
import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/categoryTree'
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {useMediaFormData} from "@zrm/motor-nx-media/composables/formData";
import {object, string} from "yup";

export default function categoryTreeForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = object({
    name: string().min(3),
    scope: string().min(3)
  })

  // Record
  const model = ref({
    id: 0,
    name: '',
    scope: '',
  })

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-admin.category_trees',
    'admin.motor-admin.category-trees',
    modelRepository(),
    model,
    schema,
    sanitizer
  )

  const { getRelevantFormData } = useCoreFormData()
  const { getCategoryData } = useMediaFormData();

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
