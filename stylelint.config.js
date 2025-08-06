import stylelintConfigStandardScss from "stylelint-config-standard-scss";
import stylelintConfigRecessOrder from "stylelint-config-recess-order";

export default {
  extends: [
    stylelintConfigStandardScss, // Правила для SCSS
    stylelintConfigRecessOrder, // Сортировка свойств (по группам)
  ],
  plugins: [
    "stylelint-order", // Плагин для порядка свойств
    "stylelint-scss", // Поддержка SCSS
  ],
  rules: {
    // Отключаем строгие правила именования (удобно для React + CSS Modules)
    "selector-class-pattern": null,
    "keyframes-name-pattern": null,
    "custom-property-pattern": null,
    "selector-id-pattern": null,
    'scss/percent-placeholder-pattern': null,
    'scss/at-mixin-pattern': null,

    // SCSS-специфичные правила
    "scss/dollar-variable-pattern": null, // Разрешаем любые имена переменных
    "scss/at-import-partial-extension": null, // Разрешаем импорт без `.scss`
    "scss/operator-no-newline-after": null,
    "scss/operator-no-unspaced": null,

    // Современные CSS-правила
    "alpha-value-notation": "percentage", // Прозрачность в процентах (e.g., 50%)
    "color-function-notation": "modern", // Современный синтаксис `rgb(255 0 0)`
    "function-url-quotes": "never", // Без кавычек в `url()`

    // Игнорируем некоторые предупреждения
    "no-descending-specificity": null, // Не ругаться на вложенность селекторов
    "no-empty-source": null, // Разрешаем пустые файлы (если нужно)
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
  ignoreFiles: [
    "**/*.{js,jsx,ts,tsx}", // Игнорируем JS/TS-файлы
    "**/{node_modules,dist,build,docs}/**", // Игнорируем служебные папки
  ],
};
