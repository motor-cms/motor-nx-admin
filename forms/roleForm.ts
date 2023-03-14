import baseForm from 'motor-nx-core/forms/baseForm'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/role'
import Repository from 'motor-nx-core/types/repository'
import permissionRepository from '../api/permission'
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import {useAppStore} from "~/packages/motor-nx-core/store/app";

export default function roleForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  // TODO: Refactor validation
  const schema = toFormValidator(
      zod.object({
        name: zod.string().min(3),
        // english_name: zod.string().min(3),
        // iso_639_1: zod.string().min(2),
      })
  )

  // Record
  const model = ref({
    id: 0,
    name: '',
    guard_name: '',
    permissions: <any>[],
  })

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-admin.roles',
    'admin.motor-admin.roles',
    modelRepository(),
    model,
    schema,
    sanitizer
  )

  const permissions = ref<Array<Record<string, any>>>([])
  const appStore = useAppStore();
  onMounted(async () => {
    try {
      appStore.isLoading(true, true);
      // Get schedules from api
      const permissionRepo: Repository = permissionRepository()
      const {data: response} = await permissionRepo.index({ per_page: 500 });
      console.log("response", response);
      const options = []
      for (let i = 0; i < response.value.data.length; i++) {
        options.push({
          name: response.value.data[i].name,
          value: response.value.data[i].id,
        })
      }
      console.log("OPTIONS", options);
      permissions.value = options
    } catch (e) {
      console.log("Error fetching permissions")
    } finally {
      appStore.isLoading(false,false);
    }
  })

  return {
    getData,
    onSubmit,
    model,
    permissions,
  }
}
