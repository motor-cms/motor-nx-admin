import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import modelRepository from '../api/language'
import * as countrylist from 'countries-list'
const {languages} = countrylist;
import {useFormData} from "@zrm/motor-nx-admin/composables/formData";
import {InferType, number, object, string} from "yup";
import {storeToRefs} from "pinia";
export default function languageForm() {
  // Load i18n module
  const {t, tm} = useI18n()

  // Record
  const initialModelData = {
    id: null,
  }
  const initialFormData = {
    native_name: '',
    english_name: '',
    iso_639_1: '',
  }

  const formStore = useFormStore();
  const {model, formSchema} = storeToRefs(formStore);
  formStore.init(initialModelData, initialFormData);
  formSchema.value = {
    native_name: string().min(3).required().label(t('motor-admin.languages.native_name')),
    english_name: string().min(3).required().label(t('motor-admin.languages.english_name')),
    iso_639_1: string().required().label(t('motor-admin.languages.iso_639_1')),
  }

  // Sanitize dates
  const sanitizer = () => {
  }

  const languageOptions = []
  for (const [key, value] of Object.entries(languages)) {
    languageOptions.push({label: value.native + ' ('+value.name+')', value: key})
  }

  const {getData, onSubmit} = baseForm(
    'motor-admin.languages',
    'admin.motor-admin.languages',
    modelRepository(),
    sanitizer,
  )


  return {
    getData,
    onSubmit,
    model,
    languageOptions,
  }
}
