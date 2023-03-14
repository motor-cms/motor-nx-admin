import baseGrid from 'motor-nx-core/grids/baseGrid'
import modelRepository from '../api/language'

export default function languageGrid() {
  const repository = modelRepository()

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-admin.languages'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
