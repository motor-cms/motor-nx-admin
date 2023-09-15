import { ref } from "vue";
import languageRepository from "@zrm/motor-nx-admin/api/language";
import clientRepository from "@zrm/motor-nx-admin/api/client";
import roleRepository from "@zrm/motor-nx-admin/api/role";
import permissionRepository from "@zrm/motor-nx-admin/api/permission";
import categoryRepository from "@zrm/motor-nx-admin/api/category";
import categoryTreeRepository from "@zrm/motor-nx-admin/api/categoryTree";
import { countries } from "countries-list";
import { useI18n } from "vue-i18n";
import DraggableContent from "~/packages/motor-nx-core/types/draggable-content";

export function useFormData() {
  const router = useRouter()
  const { locale } = useI18n();
  const languages: Ref<GenericOptionPair[]> = ref([])
  const clients: Ref<GenericOptionPair[]> = ref([])
  const roles: Ref<GenericOptionPair[]> = ref([])
  const permissions: Ref<GenericOptionPair[]> = ref([])
  const treeData: Ref<DraggableContent | null> = ref(null)
  const categories: Ref<GenericOptionPair[]> = ref([])
  const countryOptions: Ref<GenericOptionPair[]> = ref([]);

  const remoteTreeRootData: Ref<DraggableContent | null> = ref(null)
  const remoteTreeData: Ref<DraggableContent[]> = ref([])

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

  const currentCategoryTreeID: string = router.currentRoute.value.params.categorytreeid as string

  const getCategoryTreeData = async () => {
    const responseCurrentTree = await categoryTreeRepository().get(currentCategoryTreeID);
    if (!responseCurrentTree.data.value) {
      return;
    }

    const tree: DraggableContent = responseCurrentTree.data.value.data;
    // console.log("Result getCategoryTreeData", tree);
    remoteTreeRootData.value = tree;
  }

  watch(remoteTreeRootData, (initiallyLoadedTreeRoot) => {
    const tree = initiallyLoadedTreeRoot;

    if (tree && remoteTreeData.value.length) {
      tree.children = remoteTreeData.value;
    }

    treeData.value = tree;
  }, { immediate: true });


  const getCategoryDataByScope = async (scope: string) => {
    const responseCurrentTree = await categoryTreeRepository().byScope(scope);
    treeData.value = responseCurrentTree.data.value.data;
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

  const loadRoles = async () => {
    const { data: repositoryResponse } = await roleRepository().index({});
    await loadDataAndCreateOptions(repositoryResponse, roles, 'name', 'id');
  }

  const loadPermissions = async () => {
    const { data: repositoryResponse } = await permissionRepository().all({ per_page: 500 });
    await loadDataAndCreateOptions(repositoryResponse, permissions, 'name', 'id');
  }

  const loadLanguages = async () => {
    const { data: repositoryResponse } = await languageRepository().index({});
    await loadDataAndCreateOptions(repositoryResponse, languages, 'english_name', 'id');
  }

  const loadClients = async () => {
    const { data: repositoryResponse } = await clientRepository().index({});
    await loadDataAndCreateOptions(repositoryResponse, clients, 'name', 'id');
  }

  for (const [key, value] of Object.entries(countries)) {
    countryOptions.value.push({ label: value.emoji + ' ' + value.name, value: key })
  }

  return {
    loadLanguages,
    loadClients,
    loadPermissions,
    loadRoles,
    loadCategories,
    languages,
    clients,
    roles,
    treeData,
    categories,
    getCategoryTreeData,
    getCategoryDataByScope,
    countryOptions,
    salutationOptions,
    genderOptions,
    permissions,

  }
}
