import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/role'
import Repository from '@zrm/motor-nx-core/types/repository'
import permissionRepository from '../api/permission'
import {useAppStore} from "@zrm/motor-nx-core/store/app";
import {array, InferType, number, object, string} from "yup";

export default function roleForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  // TODO: Refactor validation
  const schema = object({
    id: number().min(1).nullable(),
    name: string().min(3).required(),
    guard_name: string().min(3).required(),
    permissions: array().nullable(),
  })

  type RoleForm = InferType<typeof schema>;

  // Record
  const model = ref<RoleForm>({
    id: null,
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
