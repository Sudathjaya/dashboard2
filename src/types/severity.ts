const severityLevels = ["error", "warning", "info", "success"] as const;

export const isValidSeverity = (
  severity: string | undefined,
): severity is (typeof severityLevels)[number] => {
  return severityLevels.includes(severity as (typeof severityLevels)[number]);
};
