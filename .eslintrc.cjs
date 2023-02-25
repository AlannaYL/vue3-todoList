/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 'import/no-unresolved': 'error',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'never',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/require-default-prop': 'off'
  }
}
