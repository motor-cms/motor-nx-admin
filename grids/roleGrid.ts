
import baseGrid from '@zrm/motor-nx-core/grids/baseGrid'
import modelRepository from '../api/role'

export default function roleGrid() {
  const repository = modelRepository()

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-admin.roles'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
