import { html, View } from "rune-ts";
import "./PaginationItem.scss";

export interface PaginationItemProps {
  index: number;
  className?: string;
  isActive?: boolean;
}

export class PaginationItem extends View<PaginationItemProps> {
  constructor({
    index,
    className = "",
    isActive = false,
  }: PaginationItemProps) {
    super({ index, className, isActive });
  }

  override template() {
    return html`
      <div
        class="${this.data.className} pagination__item"
        data-active="${this.data.isActive}"
        data-index="${this.data.index}"
      >
        ${this.data.index}
      </div>
    `;
  }
}
