import {ref} from "vue";
import Repository from "@zrm/motor-nx-core/types/repository";
import languageRepository from "@zrm/motor-nx-admin/api/language";
import clientRepository from "@zrm/motor-nx-admin/api/client";
import roleRepository from "@zrm/motor-nx-admin/api/role";
import categoryTreeRepository from "@zrm/motor-nx-admin/api/categoryTree";
import {countries} from "countries-list";
import {useI18n} from "vue-i18n";

export function useFormData() {
  const { locale } = useI18n();
  const languages = ref([])
  const clients = ref([])
  const roles = ref([])
  const treeData = ref({})
  const categories = ref([])
  const countryOptions = ref([]);
  const salutationsPerLanguage = {
    de: ['Herr', 'Frau'],
    en: ['Mr.', 'Mrs.'],
    fr: ['Monsieur','Madame'],
  }

  const gedersPerLanguage = {
    de: [{label: 'Männlich', value: 'm'}, {label: 'Weiblich', value: 'f'}, {label: 'Divers', value: 'd'}],
    en: [{label: 'Male', value: 'm'}, {label: 'Female', value: 'f'}, {label: 'Divers', value: 'd'}],
    fr:  [{label: 'Masculin', value: 'm'}, {label: 'Féminin', value: 'f'}, {label: 'Divers', value: 'd'}],
  }

  const genderOptions = computed(() => {
    return gedersPerLanguage[locale.value];
  })

  const salutationOptions = computed(() => {
    return salutationsPerLanguage[locale.value];
  })

  const getCategoryData = async (cached: boolean) => {
    const {data: response} = await categoryTreeRepository()
      .get(1, cached);
    treeData.value = response.value.data
  }

  const loadCategories = async (cached: boolean) => {
    const {data: response} = await categoryTreeRepository()
      .index({}, cached);
    const categoryOptions = []
    for (let i = 0; i < response.value.data.length; i++) {
      categoryOptions.push({
        name: response.value.data[i].name,
        value: response.value.data[i].id,
      })
    }
    categories.value = categoryOptions
  }

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

  for (const [key, value] of Object.entries(countries)) {
    countryOptions.value.push({ label: value.emoji + ' ' + value.name, value: key })
  }

  return {
    loadLanguages,
    loadClients,
    loadRoles,
    loadCategories,
    languages,
    clients,
    roles,
    treeData,
    categories,
    getCategoryData,
    countryOptions,
    salutationOptions,
    genderOptions
  }
}
