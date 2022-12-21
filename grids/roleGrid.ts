import axios from 'axios'
import baseGrid from 'motor-nx-core/grids/baseGrid'
import modelRepository from '../api/role'

export default function roleGrid() {
  const repository = modelRepository(axios)

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-admin.roles'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
