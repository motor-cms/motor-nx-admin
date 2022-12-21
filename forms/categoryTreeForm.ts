import axios from 'axios'
import baseForm from 'motor-nx-core/forms/baseForm'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/categoryTree'
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';

export default function categoryTreeForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = toFormValidator(
      zod.object({
        name: zod.string().min(3),
        scope: zod.string().min(3)
      })
  )

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
    modelRepository(axios),
    model,
    schema,
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
  }
}
