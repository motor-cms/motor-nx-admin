
import baseGrid from '@zrm/motor-nx-core/grids/baseGrid'
import modelRepository from '../api/domains'

export default function configVariableGrid() {
  const repository = modelRepository()

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
      repository,
      'motor-admin.domains'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
