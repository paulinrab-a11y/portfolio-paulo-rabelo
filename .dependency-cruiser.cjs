/**
 * Contrato de arquitetura. Rode com `npm run arch`.
 *
 * Camadas, de baixo para cima (cada uma só enxerga as de baixo):
 *   data → lib → components → app
 */
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    { name: 'sem-ciclos', comment: 'Dependência circular entre módulos.', severity: 'error', from: {}, to: { circular: true } },
    {
      name: 'data-e-pura',
      comment: 'src/data guarda só dados e tipos: não importa lib, componentes nem rotas.',
      severity: 'error',
      from: { path: '^src/data/' },
      to: { path: '^src/(lib|components|app)/' },
    },
    {
      name: 'lib-nao-ve-interface',
      comment: 'src/lib tem regras e utilitários: não importa componentes nem rotas.',
      severity: 'error',
      from: { path: '^src/lib/' },
      to: { path: '^src/(components|app)/' },
    },
    {
      name: 'componentes-nao-veem-rotas',
      comment: 'Componentes não importam arquivos de src/app.',
      severity: 'error',
      from: { path: '^src/components/' },
      to: { path: '^src/app/' },
    },
    {
      name: 'site-sem-dependencia-de-dev',
      comment: 'Código do site não importa devDependencies (exceção: testes).',
      severity: 'error',
      from: { path: '^src/', pathNot: ['.test.tsx?$'] },
      to: { dependencyTypes: ['npm-dev'], dependencyTypesNot: ['type-only'], pathNot: 'node_modules/@types/' },
    },
    {
      name: 'sem-dependencia-fantasma',
      comment: 'Pacote importado que não está no package.json.',
      severity: 'error',
      from: {},
      to: { dependencyTypes: ['npm-no-pkg', 'npm-unknown'] },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      mainFields: ['module', 'main', 'types', 'typings'],
    },
  },
};
