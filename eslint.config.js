import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'antfu/top-level-function': 'off',
  },
  formatters: {
    css: true,
  },
  overrides: {
    vue: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
  },
})
