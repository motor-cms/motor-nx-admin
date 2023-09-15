
import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/categoryTree'

import {useFormData} from "@zrm/motor-nx-admin/composables/formData";
import {InferType, number, object, string} from "yup";
import { storeToRefs } from "pinia";
export default function categoryTreeForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Record
  const initialModelData = {
    id: null,
  }
  const initialFormData = {
    name: '',
    scope: '',
  }

  const formStore = useFormStore();
  const {model, formSchema} = storeToRefs(formStore);
  formStore.init(initialModelData, initialFormData);
  formSchema.value = {
    name: string().min(3).required().label(t('motor-admin.category_trees.name')),
    scope: string().min(5).required().label(t('motor-admin.category_trees.scope'))
  }

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-admin.category_trees',
    'admin.motor-admin.category-trees',
    modelRepository(),
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
    schema: formSchema,
    ...useFormData()
  }
}
