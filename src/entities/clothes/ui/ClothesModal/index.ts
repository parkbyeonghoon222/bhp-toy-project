import { CustomEventWithDetail, Enable, html, on, View } from "rune-ts";
import "./clothesModal.scss";
import { CloseIcon } from "../../../../shared/components/atoms/Icon/icons";
import {
  ButtonAction,
  ButtonActionProps,
} from "../../../../shared/components/atoms/ButtonAction/ButtonAction";
import { concat, each, filter, map, pipe, some, toArray } from "@fxts/core";
import {
  ARTICLE_TYPES,
  MATER_CATEGORIES,
  SUB_CATEGORIES,
} from "../../../../shared/constants";

export type ClothesModal = {};

export class ClothesModalEvent extends CustomEventWithDetail<ClothesModal> {}

export interface ExtendedButtonActionProps extends ButtonActionProps {
  isSelected: boolean;
}

export class CategoryItemEvent extends CustomEventWithDetail<ButtonActionProps> {}

class CategoryItem extends ButtonAction {
  isSelected: boolean = false;

  constructor(props: ExtendedButtonActionProps) {
    super(props);
    this.isSelected = props.isSelected ?? false;
  }

  setOn() {
    this.isSelected = !this.isSelected;
    this.data.type = this.isSelected ? "lightBlue" : "line";
    this.redraw();
  }

  @on("click")
  private _click() {
    this.setOn();
    this.dispatchEvent(CategoryItemEvent, { detail: this.data, bubbles: true });
  }
}

export class ClothesModalEnable extends Enable {
  constructor(public override view: ClothesModalView) {
    super(view);
  }

  override onRender() {
    this.view.subCategoryButtons = this._createCategories(
      SUB_CATEGORIES,
      "subCategory",
    );
    this.view.articleTypeButtons = this._createCategories(
      ARTICLE_TYPES,
      "articleType",
    );
    this.view.masterCategoryButtons = this._createCategories(
      MATER_CATEGORIES,
      "masterCategory",
    );
    this._checkSubmitState();
    this.view.redraw();
  }

  private _deleteQueryFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete("articleType");
    queryParams.delete("subCategory");
    queryParams.delete("masterCategory");
    return queryParams;
  }

  private _gotoInitPage(queryParams: URLSearchParams) {
    queryParams.set("page", "1");
    window.location.href =
      window.location.pathname + "?" + queryParams.toString();
  }

  @on("click", ".clothes__modal--backdrop, .modal__header--close")
  private _clickClose() {
    this.view.showModal();
  }

  @on("click", ".modal__bottom > button:nth-of-type(2)")
  private _gotoPageByFilter() {
    const queryParams = this._deleteQueryFromUrl();
    pipe(
      this._getSelectedCategory(this.view.articleTypeButtons),
      each((value) => {
        queryParams.append("articleType", value);
      }),
    );
    pipe(
      this._getSelectedCategory(this.view.subCategoryButtons),
      each((value) => {
        queryParams.append("subCategory", value);
      }),
    );
    pipe(
      this._getSelectedCategory(this.view.masterCategoryButtons),
      each((value) => {
        queryParams.append("masterCategory", value);
      }),
    );
    this._gotoInitPage(queryParams);
  }

  @on("click", ".modal__bottom > button:nth-of-type(1)")
  private _resetFilter() {
    pipe(
      concat(this.view.articleTypeButtons, this.view.subCategoryButtons),
      filter((button) => button.isSelected),
      each((button) => {
        button.setOn();
      }),
    );
    this._checkSubmitState();
    this._gotoInitPage(this._deleteQueryFromUrl());
  }

  @on(CategoryItemEvent)
  private _checkSubmitState() {
    const isAbleSubmit = pipe(
      concat(this.view.masterCategoryButtons, this.view.articleTypeButtons),
      concat(this.view.subCategoryButtons),
      some((button) => button.isSelected),
    );
    this.view.submitButton.data.type = isAbleSubmit ? "lightBlue" : "disabled";
    this.view.resetButton.data.type = isAbleSubmit ? "lightBlue" : "disabled";
    this.view.resetButton.data.className = isAbleSubmit ? "" : "disabled";
    this.view.submitButton.data.className = isAbleSubmit ? "" : "disabled";
    this.view.submitButton.redraw();
    this.view.resetButton.redraw();
  }

  private _createCategories(
    categories: string[],
    queryName: "articleType" | "subCategory" | "masterCategory",
  ) {
    const queryParams = new URLSearchParams(window.location.search);
    const querySet = new Set(queryParams.getAll(queryName));

    return pipe(
      categories,
      map(
        (category) =>
          ({
            label: category,
            type: querySet.has(category) ? "lightBlue" : "line",
            isSelected: querySet.has(category),
          }) as ExtendedButtonActionProps,
      ),
      map((buttonProps) => new CategoryItem(buttonProps)),
      toArray,
    );
  }

  private _getSelectedCategory(buttons: CategoryItem[]) {
    return pipe(
      buttons,
      filter((button) => button.isSelected),
      map((button) => String(button.data.label)),
    );
  }
}

export class ClothesModalView extends View<ClothesModal> {
  modalHandler = new ClothesModalEnable(this);

  isActiveModal: boolean = false;
  subCategoryButtons: CategoryItem[] = [];
  articleTypeButtons: CategoryItem[] = [];
  masterCategoryButtons: CategoryItem[] = [];
  resetButton: ButtonAction = new ButtonAction({
    label: "초기화",
    size: "large",
    type: "disabled",
  });
  submitButton: ButtonAction = new ButtonAction({
    label: "상품 보기",
    size: "large",
    type: "disabled",
  });

  override template() {
    return html`
      <div class="clothes__modal" data-active="${this.isActiveModal}">
        <div class="clothes__modal--backdrop"></div>
        <div class="clothes__modal--wrapper">
          <div class="modal__header">
            상품 필터<span class="modal__header--close">${CloseIcon}</span>
          </div>
          <div class="clothes__modal--content">
            <h3>상품 분류</h3>
            <div class="clothes__modal--category">
              ${this.masterCategoryButtons}
            </div>

            <h3>상품 종류</h3>
            <div class="clothes__modal--category">
              ${this.subCategoryButtons}
            </div>
          </div>
          <div class="modal__bottom">
            ${this.resetButton} ${this.submitButton}
          </div>
        </div>
      </div>
    `;
  }

  showModal() {
    this.isActiveModal = !this.isActiveModal;
    this.redraw();
  }
}
