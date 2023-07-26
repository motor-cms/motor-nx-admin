import { ref } from "vue";
import Repository from "@zrm/motor-nx-core/types/repository";
import languageRepository from "@zrm/motor-nx-admin/api/language";
import clientRepository from "@zrm/motor-nx-admin/api/client";
import roleRepository from "@zrm/motor-nx-admin/api/role";
import categoryTreeRepository from "@zrm/motor-nx-admin/api/categoryTree";
import { countries } from "countries-list";
import { useI18n } from "vue-i18n";

export function useFormData() {
  const { locale } = useI18n();
  const languages: Ref<GenericOptionPair[]> = ref([])
  const clients: Ref<GenericOptionPair[]> = ref([])
  const roles: Ref<GenericOptionPair[]> = ref([])
  const treeData = ref({})
  const categories: Ref<GenericOptionPair[]> = ref([])
  const countryOptions: Ref<GenericOptionPair[]> = ref([]);

  const salutationsPerLanguage: SalutationsPerLanguage = {
    de: ['Herr', 'Frau'],
    en: ['Mr.', 'Mrs.'],
    fr: ['Monsieur', 'Madame'],
  }

  const gendersPerLanguage: GendersPerLanguage = {
    de: [{ label: 'Männlich', value: 'm' }, { label: 'Weiblich', value: 'f' }, { label: 'Divers', value: 'd' }],
    en: [{ label: 'Male', value: 'm' }, { label: 'Female', value: 'f' }, { label: 'Divers', value: 'd' }],
    fr: [{ label: 'Masculin', value: 'm' }, { label: 'Féminin', value: 'f' }, { label: 'Divers', value: 'd' }],
  }

  // Use a Map for faster language validation
  const supportedLocales = new Set(['de', 'en', 'fr']);
  const defaultLocaleForUnsupportedLocales = 'en';

  // Helper function to validate and format the locale
  function validateLocale(loc: string) {
    return supportedLocales.has(loc) ? loc : defaultLocaleForUnsupportedLocales;
  }

  const genderOptions = computed(() => {
    const valideLocale = validateLocale(locale.value);
    return gendersPerLanguage[valideLocale];
  })

  const salutationOptions = computed(() => {
    const valideLocale = validateLocale(locale.value);
    return salutationsPerLanguage[valideLocale];
  })

  // !This is unrefactored after fixing the TODO 342134111212 it is important to test whether the refactor work or not
  // const getCategoryData = async (cached: boolean) => {
  //   const response = await categoryTreeRepository()
  //     .get(1, cached);
  //   console.log('getCategoryData', response.data);

  //   treeData.value = response.value.data
  // }

  const getCategoryData = async (cached: boolean) => {
    //TODO 342134111212: Was soll diese 1 hier? Macht keinen Sinn. Erzeugt nur einen Error Requests. 
    const response = await categoryTreeRepository().get(1, cached);
    treeData.value = response.data.value;
  }

  async function loadDataAndCreateOptions(
    response: any,
    optionsRef: Ref<Record<string, any>[]>,
    labelKey: string,
    valueKey: string,
  ) {
    const resOptions = response.value.data;

    const dataOptions = resOptions.map((item: Record<string, any>) => ({
      label: item[labelKey],
      value: item[valueKey],
    }));

    optionsRef.value = dataOptions;
  }

  const loadCategories = async (cached: boolean) => {
    const { data: repositoryResponse } = await categoryTreeRepository().index({}, cached);
    await loadDataAndCreateOptions(repositoryResponse, categories, 'name', 'id');
  }

  const loadRoles = async (cached: boolean) => {
    const { data: repositoryResponse } = await roleRepository().index({}, cached);
    await loadDataAndCreateOptions(repositoryResponse, roles, 'name', 'id');
  }

  const loadLanguages = async (cached: boolean) => {
    const { data: repositoryResponse } = await languageRepository().index({}, cached);
    await loadDataAndCreateOptions(repositoryResponse, languages, 'english_name', 'id');
  }

  const loadClients = async (cached: boolean) => {
    const { data: repositoryResponse } = await clientRepository().index({}, cached);
    await loadDataAndCreateOptions(repositoryResponse, clients, 'name', 'id');
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
