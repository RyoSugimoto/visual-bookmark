import boundaries from 'eslint-plugin-boundaries'
import { defineConfig } from 'eslint/config'
import tsParser from '@typescript-eslint/parser'

/**
 * ESLintでは、Boundariesプラグインによるimportの制限のみを行なう。
 * LinterやFormatterは基本的にBiomeで行なう。
 * 
 * ※将来的に、Biomeによるimport制限機能が安定してきたら、ESLintの使用を完全にやめて全面的にBiomeに乗り換えることを検討する。
 */

export default defineConfig([
  {
    /**
     * NOTE: TypeScriptを使用する場合の設定方法
     * @see https://github.com/javierbrea/eslint-plugin-boundaries?tab=readme-ov-file#usage-with-typescript
     */

    files: ['src/**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      // NOTE: TypeScriptのパーサーを設定しないとESLintがTSの構文を理解しない。公式ドキュメントなどではこのことが明記されていない場合があるので注意。
      parser: tsParser,
    },

    // NOTE: `plugins` の各キーは `rules` のキーのプレフィックス部分（ `/` より前）と一致させる必要がある。 `boundaries` の各ルールは `'boundaries/'` から始まるので、その場合はキーを `'boundaries'` にしておけばよい。
    plugins: { boundaries },

    rules: {
      // ...boundaries.configs.recommended.rules,

      // NOTE: `'boundaries/element-types'` の設定は、必ず `...boundaries.configs.recommended.rules` の次に書く。

      'boundaries/element-types': [2, {
        default: 'disallow',
        rules: [
          /**
           * ルールの定義方法
           * `'from'` には `import` する側の型（A）を指定、
           * `'allow'` には `import` される側の型（B）を指定する
           * ファイルAで `import ~ from B` が許可される。
           */
          {
            // `app` ディレクトリ以下のファイルで、何が `import` できるのかを設定
            from: 'app',
            allow: ['action', 'action-handler', 'app', 'component', 'di', 'schema', 'style', 'util'],
          },
          {
            from: 'action',
            allow: ['action', 'domain', 'schema', 'service', 'util'],
          },
          {
            from: 'concrete',
            allow: ['concrete', 'domain', 'lib', 'service', 'util'],
          },
          {
            from: 'component',
            allow: ['component', 'util'],
          },
          {
            from: 'di',
            allow: ['domain', 'concrete', 'service', 'util'],
          },
          {
            from: 'domain',
            allow: ['domain', 'util'],
          },
          {
            from: 'service',
            allow: ['domain', 'service', 'util'],
          },
          {
            from: ['testfile'],
            allow: ['action', 'concrete', 'domain', 'lib', 'service', 'util']
          },
          {
            from: 'middleware',
            allow: ['action', 'di', 'schema', 'util']
          },
          {
            from: 'instrumentation',
            allow: ['util']
          },
        ],
      }],
      'boundaries/external': [2, {
        default: 'allow',
        rules: [
          {
            disallow: ['next'],
            from: ['action', 'component', 'concrete', 'di', 'domains', 'hooks', 'lib', 'schema', 'services', 'styles', 'utils'],
          },
          {
            disallow: ['node:*'],
            from: ['action', 'action-handler', 'app', 'component', 'di', 'domains', 'hooks', 'lib', 'schema', 'services', 'styles', 'utils'],
          },
        ],
      }],
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },

      /**
       * NOTE: typeの設定がうまくいっているか確認するには、 `boundaries` プラグインのデバッグモードでESLintを実行する。
       * `ESLINT_PLUGIN_BOUNDARIES_DEBUG=1 npx eslint`
       * 
       * NOTE: `pattern` の指定方法の注意
       * `pattern` に `src/schema/*` のような指定をすると、そのディレクトリの直下のファイルが無視される。そうしないためには `src/schema` とだけ設定する。
       * もしくは `src/schema\/**\/*.ts` のように書き、 `mode: 'file` とする。 */

      'boundaries/elements': [
        {
          type: 'action',
          pattern: 'src/actions',
        },
        {
          type: 'app',
          pattern: 'src/app',
        },
        {
          type: 'component',
          pattern: 'src/components',
        },
        {
          type: 'concrete',
          pattern: 'src/concretes',
        },
        {
          type: 'di',
          pattern: 'src/di',
        },
        {
          type: 'domain',
          pattern: 'src/domains',
        },
        {
          type: 'lib',
          pattern: 'src/lib',
        },
        {
          type: 'schema',
          pattern: 'src/schema',
        },
        {
          type: 'service',
          pattern: 'src/services',
        },
        {
          type: 'style',
          pattern: 'src/styles',
        },
        {
          type: 'util',
          pattern: 'src/utils',
        },
        {
          type: 'testfile',
          pattern: '*.test.{ts,js,tsx,jsx}',
          mode: 'file',
        },
        {
          type: 'middleware',
          pattern: 'src/middleware.ts',
          mode: 'file',
        },
        {
          type: 'instrumentation',
          pattern: 'src/instrumentation.ts',
          mode: 'file',
        },
      ],
    },
  },
])
