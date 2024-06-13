import { html, Page } from "rune-ts";
import "./Header.scss";

export type Header = Record<string, string>;

export class HeaderView extends Page<Header> {
  override template() {
    return html` <header></header> `;
  }
}
