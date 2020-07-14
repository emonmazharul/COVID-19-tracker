module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier",
        "prettier/babel",
        "prettier/react"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react",
         "only-warn",
    ],
    "rules": {
    	"no-mixed-spaces-and-tabs":'off',
    	"no-misleading-character-class":'off',
    	"no-unexpected-multiline":'off',
    	"no-empty-character-class":'off',
    	"react/prop-types":'off',
    	"react/no-unescaped-entities":'off',
    }
};
