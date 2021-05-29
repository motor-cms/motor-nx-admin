import axios from 'axios'
import baseGrid from 'motor-core/grids/baseGrid'
import modelRepository from '../api/client'

export default function clientGrid() {
  const repository = modelRepository(axios)

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-backend.clients'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
