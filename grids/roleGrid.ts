import axios from 'axios'
import baseGrid from 'motor-core/grids/baseGrid'
import modelRepository from '../api/role'

export default function roleGrid() {
  const repository = modelRepository(axios)

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-backend.roles'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
