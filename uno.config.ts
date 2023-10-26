// uno.config.ts
import { defineConfig, presetUno, presetIcons } from 'unocss';
import { presetHeadlessUi } from 'unocss-preset-primitives';

export default defineConfig({
  presets: [
    presetUno(),
    presetHeadlessUi(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
});
