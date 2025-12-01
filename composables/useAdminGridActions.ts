import emailTemplate from "@zrm/motor-nx-admin/api/emailTemplate";

export function useAdminGridActions() {
  const { t } = useI18n();
  const gridStore = useGridStore();

  const duplicateEmailTemplates = {
    name: t("motor-admin.email_templates.duplicate"),
    label: t("motor-admin.email_templates.duplicate"),
    func: async () => {
      const data = {
        action: "duplicate",
        data: JSON.parse(JSON.stringify(gridStore.selectedItems)),
        all: JSON.parse(JSON.stringify(gridStore.allSelected)),
      };
      await emailTemplate().duplicate(data);
    },
    icon: "plus",
  };

  return {
    duplicateEmailTemplates,
  };
}
