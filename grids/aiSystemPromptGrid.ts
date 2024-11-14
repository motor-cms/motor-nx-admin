import baseGrid from "@zrm/motor-nx-core/grids/baseGrid";
import modelRepository from "../api/aiSystemPrompt";

export default function emailTemplateGrid() {
  const repository = modelRepository();

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    "motor-admin.ai_system_prompts",
  );

  return { rows, meta, refreshRecords, handleCellEvent };
}
