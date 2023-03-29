
import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/client'
import { countries } from 'countries-list'
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {boolean, InferType, number, object, string} from "yup";

export default function clientForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = object({
    id: number().min(1).nullable(),
    name: string().min(3).required(),
    slug: string().min(3).required(),
    address: string().min(3).nullable(),
    zip: string().min(5).nullable(),
    city: string().min(3).nullable(),
    country_iso_3116_1: string().min(2).max(2).nullable(),
    website: string().url().nullable(),
    description: string().nullable(),
    is_active: boolean().nullable(),
    contact_name: string().nullable(),
    contact_email: string().email(),
    contact_phone: string().nullable(),
  })

  type ClientForm = InferType<typeof schema>;

  // Record
  const model = ref<ClientForm>({
    id: null,
    name: '',
    slug: '',
    address: '',
    zip: '',
    city: '',
    country_iso_3116_1: 'DE',
    website: '',
    description: '',
    is_active: false,
    contact_name: '',
    contact_email: '',
    contact_phone: '',
  })

  const countryOptions = []
  for (const [key, value] of Object.entries(countries)) {
    countryOptions.push({ label: value.emoji + ' ' + value.name, value: key })
  }

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-admin.clients',
    'admin.motor-admin.clients',
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
    countryOptions,
  }
}
