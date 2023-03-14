import {ref} from "vue";
import Repository from "@zrm/motor-nx-core/types/repository";
import languageRepository from "@zrm/motor-nx-admin/api/language";
import clientRepository from "@zrm/motor-nx-admin/api/client";
import roleRepository from "@zrm/motor-nx-admin/api/role";

export function useFormData() {

  const languages = ref([])
  const clients = ref([])
  const roles = ref([])

  const loadRoles = async (cached: boolean) => {
    const roleRepo: Repository = roleRepository()
    const {data: roleResponse} = await roleRepo.index({}, cached);
    const roleOptions = []
    for (let i = 0; i < roleResponse.value.data.length; i++) {
      roleOptions.push({
        name: roleResponse.value.data[i].name,
        value: roleResponse.value.data[i].id,
      })
    }
    roles.value = roleOptions
  }
  const loadLanguages = async (cached: boolean) => {
    const languageRepo: Repository = languageRepository()
    const {data: languageResponse} = await languageRepo.index({}, cached);
    const languageOptions = []
    for (let i = 0; i < languageResponse.value.data.length; i++) {
      languageOptions.push({
        name: languageResponse.value.data[i].english_name,
        value: languageResponse.value.data[i].id,
      })
    }
    languages.value = languageOptions
  }

  const loadClients = async (cached: boolean) => {
    const clientRepo: Repository = clientRepository()
    const {data: clientResponse} = await clientRepo.index({}, cached);
    const clientOptions = []
    for (let i = 0; i < clientResponse.value.data.length; i++) {
      clientOptions.push({
        name: clientResponse.value.data[i].name,
        value: clientResponse.value.data[i].id,
      })
    }
    clients.value = clientOptions
  }

  return {
    loadLanguages,
    loadClients,
    loadRoles,
    languages,
    clients,
    roles
  }
}
