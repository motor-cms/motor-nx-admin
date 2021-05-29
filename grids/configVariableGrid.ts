import axios from 'axios'
import baseGrid from 'motor-core/grids/baseGrid'
import modelRepository from '../api/configVariable'

export default function configVariableGrid() {
  const repository = modelRepository(axios)

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'motor-backend.config_variables'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
