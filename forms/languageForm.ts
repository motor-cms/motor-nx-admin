import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import modelRepository from '../api/language'
import {languages} from 'countries-list'
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {useFormData} from "@zrm/motor-nx-admin/composables/formData";
import {InferType, number, object, string} from "yup";

export default function languageForm() {
  // Load i18n module
  const {t, tm} = useI18n()

  // Validation schema
  const schema = object({
    id: number().min(1).nullable(),
    native_name: string().min(3).required().label(t('motor-admin.languages.native_name')),
    english_name: string().min(3).required().label(t('motor-admin.languages.english_name')),
    iso_639_1: string().required().label(t('motor-admin.languages.iso_639_1')),
  })

  type LanguageForm = InferType<typeof schema>;

  // Record
  const model = ref<LanguageForm>({
    id: null,
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
