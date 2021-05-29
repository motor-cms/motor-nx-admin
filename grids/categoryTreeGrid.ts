import axios from 'axios'
import baseGrid from 'motor-core/grids/baseGrid'
import modelRepository from '../api/categoryTree'

export default function categoryTreeGrid() {
  const repository = modelRepository(axios)

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-backend.category_trees'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
