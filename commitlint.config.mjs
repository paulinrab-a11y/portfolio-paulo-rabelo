/** Mensagens de commit no padrão Conventional Commits (https://www.conventionalcommits.org) */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Corpo e rodapé podem ter URLs e linhas de coautoria longas
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
    'subject-case': [0],
  },
};
