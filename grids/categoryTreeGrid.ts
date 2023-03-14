
import baseGrid from '@zrm/motor-nx-core/grids/baseGrid'
import modelRepository from '../api/categoryTree'

export default function categoryTreeGrid() {
  const repository = modelRepository()

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-admin.category_trees'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
