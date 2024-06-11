import { html, Page } from "rune-ts";
import "./Footer.scss";

export type Footer = Record<string, string>;

export class FooterView extends Page<Footer> {
  override template() {
    return html` <footer>아우터를 인기순으로 보여줘</footer> `;
  }
}
