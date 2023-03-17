import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import modelRepository from '../api/language'
import {languages} from 'countries-list'
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {useFormData} from "@zrm/motor-nx-admin/composables/formData";
import {object, string} from "yup";

export default function languageForm() {
  // Load i18n module
  const {t, tm} = useI18n()

  // Validation schema
  const schema = object({
    native_name: string().min(3),
    english_name: string().min(3),
    iso_639_1: string().min(2),
  })

  // Record
  const model = ref({
    id: 0,
    native_name: '',
    english_name: '',
    iso_639_1: '',
  })

  // Sanitize dates
  const sanitizer = () => {
  }

  const languageOptions = []
  for (const [key, value] of Object.entries(languages)) {
    languageOptions.push({label: value.name, value: key})
  }

  const {getData, onSubmit} = baseForm(
    'motor-admin.languages',
    'admin.motor-admin.languages',
    modelRepository(),
    model,
    schema,
    sanitizer,
  )

  const {getRelevantFormData} = useCoreFormData();

  onMounted(async () => {
    await getRelevantFormData(getData, [], []);
  })


  return {
    getData,
    onSubmit,
    model,
    languageOptions,
  }
}
