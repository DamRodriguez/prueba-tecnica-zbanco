export function getIsGithub() {
  const isGithub = import.meta.env.VITE_IS_GITHUB === "true";
  return isGithub;
};
