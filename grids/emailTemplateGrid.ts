
import baseGrid from '@zrm/motor-nx-core/grids/baseGrid'
import modelRepository from '../api/emailTemplate'

export default function emailTemplateGrid() {
  const repository = modelRepository()

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-admin.email_templates'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
