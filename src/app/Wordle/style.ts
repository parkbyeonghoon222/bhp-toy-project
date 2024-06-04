import { html, rune, View } from 'rune-ts';

export class StyleView extends View<object> {
  override template() {
    return html`<style>
      [data-rune] * {
        box-sizing: content-box;
      }
    </style>`;
  }
}
