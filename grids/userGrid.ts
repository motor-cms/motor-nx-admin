import baseGrid from 'motor-nx-core/grids/baseGrid'
import modelRepository from '../api/user'

export default function userGrid() {
  const repository = modelRepository()

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-admin.users'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
