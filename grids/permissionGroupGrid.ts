import baseGrid from '@zrm/motor-nx-core/grids/baseGrid'
import modelRepository from '../api/permissionGroup'
import { useRouter } from 'vue-router'

import { useI18n } from 'vue-i18n'
import { ref } from 'vue'



export default function categoryGrid() {
  const repository = modelRepository()

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-admin.permission_groups'
  );
  return { rows, meta, refreshRecords, handleCellEvent }
}
