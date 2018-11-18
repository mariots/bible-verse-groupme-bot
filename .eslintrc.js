module.exports = {
    "extends": "airbnb-base",
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "env": {
        "es6": true
    },
    "rules": {
        // Indent with 4 spaces
        'indent': ['error', 4],
        'quote-props': ['error', 'consistent'],
        'no-console': 'off',
        'prefer-destructuring': 'off',
        'consistent-return': 'off',
        'guard-for-in': 'off',
        'no-restricted-syntax': 'off',
    }
};