<script setup lang="ts">
import ZrmModal from "@zrm/motor-nx-builder/components/zrm-components/ui/ZrmModal.vue"
import { ref, computed } from 'vue';

const usageData = ref<any[]>([]);
const modalRef = ref<InstanceType<typeof ZrmModal> | null>(null);
const entityName = ref<string>('');

// Group by page (unique pages)
const groupedByPage = computed(() => {
  if (!usageData.value?.length) {
    return [];
  }
  
  const pageMap = new Map();
  
  usageData.value.forEach((usage: any) => {
    if (!usage.builder_page) return;
    
    const pageId = usage.builder_page.id;
    
    if (!pageMap.has(pageId)) {
      pageMap.set(pageId, {
        page: usage.builder_page,
        forms: []
      });
    }
    
    // Add form info
    pageMap.get(pageId).forms.push({
      uuid: usage.form_component_uuid,
      name: usage.form_name || 'Formular',
      custom_content_type_id: usage.custom_content_type_id,
      usage_type: usage.usage_type
    });
  });
  
  return Array.from(pageMap.values());
});

// Expose methods
defineExpose({
  setData: (data: any[], name?: string) => {
    usageData.value = data;
    entityName.value = name || '';
  },
  open: async () => {
    if (modalRef.value) {
      await modalRef.value.open();
    }
  }
});

</script>
<template>
  <Teleport to="body">
    <ZrmModal ref="modalRef" hide-reject>
      <template #header>
        <h3>Email Template Verwendung{{ entityName ? ': ' + entityName : '' }}</h3>
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
            
            <h4 class="section-title">Verknüpfte Formulare</h4>
            
            <div class="forms-list">
              <div
                v-for="(form, formIndex) in item.forms"
                :key="formIndex"
                class="form-item"
              >
                <fa icon="envelope" />
                <a
                  v-if="form.custom_content_type_id"
                  :href="'/admin/motor-content-type/content-types/edit/' + form.custom_content_type_id"
                  target="_blank"
                  class="form-label"
                >
                  {{ form.name }}
                </a>
                <span v-else class="form-label">{{ form.name }}</span>
                <div class="usage-badges">
                  <span
                    v-for="type in form.usage_type"
                    :key="type"
                    class="badge"
                    :class="{'badge-user': type === 'user_email', 'badge-target': type === 'target_email'}"
                  >
                    {{ type === 'user_email' ? 'Benutzer' : 'Redaktion' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-usage">
          Dieses Email-Template wird nicht verwendet
        </div>
      </template>
    </ZrmModal>
  </Teleport>
</template>
<style scoped lang="scss">
:deep(.modal-dialog) {
  min-width: 80vw;
  max-width: 1200px;
}

.usage-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.usage-item {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
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
  
  .fa {
    color: #6c757d;
    font-size: 1rem;
  }
  
  &:hover {
    color: #F7921E;
    
    .fa {
      color: #F7921E;
    }
  }
}

.page-badges {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
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

.forms-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-left: 2rem;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.95rem;
  border: 1px solid #e9ecef;
  
  .fa {
    color: #6c757d;
    font-size: 1rem;
    flex-shrink: 0;
  }
  
  .form-label {
    color: #2c3e50;
    font-weight: 500;
    flex: 1;
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: #F7921E;
    }
  }
}


.no-usage {
  padding: 2rem;
  text-align: center;
  color: #666;
  font-size: 0.95rem;
  
  .fa {
    margin-right: 0.5rem;
    color: #999;
  }
}

.no-usage {
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
