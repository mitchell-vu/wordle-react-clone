export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feature', // New feature
        'fix', // Bug fix
        'hotfix', // Hotfix (critical bug fix)
        'docs', // Documentation
        'style', // Formatting, missing semi colons, etc; no production code change
        'refactor', // Refactoring production code
        'perf', // Performance improvements
        'test', // Adding missing tests
        'chore', // Updating build tasks, package manager, etc; no production code change
        'revert', // Reverts a previous commit
        'build', // Changes that affect the build system or external dependencies
        'ci', // Changes to CI configuration files and scripts
      ],
    ],
    'subject-case': [0],
  },
};
