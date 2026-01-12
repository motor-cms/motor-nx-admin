<template>
  <Teleport to="body">
    <ZrmModal ref="modalRef" hide-reject>
      <template #header>
        <h3>Formular Verwendung{{ entityName ? ': ' + entityName : '' }}</h3>
      </template>
      <template #body>
        <div
          v-if="groupedByPage.length"
          class="usage-list"
        >
          <div
            v-for="(item, index) in groupedByPage"
            :key="item.page.id"
            class="usage-item"
          >
            <div class="page-header">
              <a
                :href="'/admin/motor-builder/builder-pages/edit/builder-page/' + item.page.id"
                target="_blank"
                class="page-title"
              >
                <fa icon="file" />
                {{ item.page.name }}
              </a>
              <span class="page-badges">
                <span v-if="item.page.is_published" class="badge published">Veröffentlicht</span>
                <span v-else class="badge draft">Entwurf</span>
              </span>
            </div>

            <h4 class="section-title">Verknüpfte E-Mail Templates</h4>
            
            <div class="email-templates-list">
              <div
                v-for="(template, templateIndex) in item.email_templates"
                :key="templateIndex"
                class="template-item"
              >
                <fa icon="envelope" />
                <a
                  :href="'/admin/motor-admin/email-templates/edit/' + template.id"
                  target="_blank"
                  class="template-link"
                >
                  <span class="template-label">{{ template.name }}</span>
                </a>
                <div class="usage-badges">
                  <span
                    class="badge"
                    :class="{'badge-user': template.type === 'user_email', 'badge-target': template.type === 'target_email'}"
                  >
                    {{ template.type_label }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="!item.email_templates.length" class="no-templates">
              Keine Email-Templates konfiguriert
            </div>
          </div>
        </div>
        <div v-else class="no-usage">
          Dieses Formular wird nicht verwendet
        </div>
      </template>
    </ZrmModal>
  </Teleport>
</template>

<script setup lang="ts">
import ZrmModal from "@zrm/motor-nx-builder/components/zrm-components/ui/ZrmModal.vue"
import { computed, ref } from 'vue'

const modalRef = ref<InstanceType<typeof ZrmModal> | null>(null)
const usageData = ref<any[]>([])
const entityName = ref<string>('')

// Group usage data by page
const groupedByPage = computed(() => {
  if (!usageData.value || !Array.isArray(usageData.value)) {
    return []
  }

  const pageMap = new Map()

  usageData.value.forEach((item: any) => {
    if (!item.builder_page) return

    const pageId = item.builder_page.id
    
    if (!pageMap.has(pageId)) {
      pageMap.set(pageId, {
        page: item.builder_page,
        email_templates: []
      })
    }

    // Add email templates to this page
    if (item.email_templates && Array.isArray(item.email_templates)) {
      item.email_templates.forEach((template: any) => {
        pageMap.get(pageId).email_templates.push(template)
      })
    }
  })

  return Array.from(pageMap.values())
})

// Expose methods to parent
const open = () => {
  modalRef.value?.open()
}

const close = () => {
  modalRef.value?.close()
}

const setData = (data: any[], name?: string) => {
  usageData.value = data
  entityName.value = name || ''
}

defineExpose({
  open,
  close,
  setData
})
</script>

<style scoped lang="scss">
.usage-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 200px;
  max-height: 60vh;
  overflow-y: auto;
  padding: 4px;
}

.usage-item {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  background: white;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-color: #F7921E;
  }
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #2c3e50;
  text-decoration: none;
  flex: 1;
  transition: color 0.2s;
  
  svg {
    color: #6c757d;
    font-size: 1rem;
  }
  
  &:hover {
    color: #F7921E;
    
    svg {
      color: #F7921E;
    }
  }
}

.page-badges {
  display: flex;
  gap: 8px;
}

.badge {
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  
  &.published {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  &.draft {
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffeaa7;
  }
  
  &.badge-user {
    background: #e3f2fd;
    color: #1976d2;
    border: 1px solid #bbdefb;
  }
  
  &.badge-target {
    background: #f3e5f5;
    color: #7b1fa2;
    border: 1px solid #e1bee7;
  }
}

.email-templates-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-left: 2rem;
}

.template-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.95rem;
  border: 1px solid #e9ecef;

  svg {
    color: #6c757d;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .template-link {
    flex: 1;
    text-decoration: none;
    color: #2c3e50;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #F7921E;

      .template-label {
        color: #F7921E;
      }
    }

    .template-label {
      transition: color 0.2s;
    }
  }

  .usage-badges {
    display: flex;
    gap: 0.5rem;
  }
}

.no-templates {
  padding: 1rem;
  text-align: center;
  color: #6c757d;
  font-style: italic;
  font-size: 0.9rem;
}

.no-usage {
  padding: 2rem;
  text-align: center;
  color: #666;
  font-size: 0.95rem;
  background: #f5f5f5;
  border-radius: 6px;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #495057;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 1rem 0 0.75rem 0;
  padding-left: 2rem;
}
</style>
