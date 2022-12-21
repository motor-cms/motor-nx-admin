import axios from 'axios'
import baseGrid from 'motor-nx-core/grids/baseGrid'
import modelRepository from '../api/emailTemplate'

export default function emailTemplateGrid() {
  const repository = modelRepository(axios)

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-admin.email_templates'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
