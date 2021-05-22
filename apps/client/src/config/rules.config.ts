export function loadRulesConfig() {
  return {
    namespace: 'rules',
    values: {
      maxParticipants: Number.parseInt(process.env.REACT_APP_RULES_MAXIMUM_PARTICIPANTS, 10) || 10,
    },
  };
}
