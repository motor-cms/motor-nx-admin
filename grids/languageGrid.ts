import axios from 'axios'
import baseGrid from 'motor-core/grids/baseGrid'
import modelRepository from '../api/language'

export default function languageGrid() {
  const repository = modelRepository(axios)

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-backend.languages'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
