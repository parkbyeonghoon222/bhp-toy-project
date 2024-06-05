import { html, View } from "rune-ts";

export class StyleView extends View<object> {
  override template() {
    return html` <style>
      @keyframes scaleAnimation {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }

      [data-rune] * {
        box-sizing: content-box;
      }

      #wordle {
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & .wordle__container {
          width: 350px;

          display: grid;
          grid-template-columns: 62px 62px 62px 62px 62px;
          grid-gap: 5px;
          align-items: center;

          & .wordle__box {
            box-sizing: border-box;
            text-align: center;
            line-height: 62px;
            font-size: 24px;

            width: 62px;
            height: 62px;
            font-weight: 700;

            &[data-variant="disabled"] {
              border: 2px solid #a2a2a2;
              background-color: #d9d9d9;
            }

            &[data-variant="empty"] {
              border: 2px solid #a2a2a2;
            }

            &[data-variant="entered"] {
              border: 2px solid #000000;
              font-weight: 700;
              animation: scaleAnimation 0.2s ease-in-out;
            }

            &[data-variant="include"] {
              border: 2px solid #99e0ff;
              background: #99e0ff;
              color: #ffffff;
            }

            &[data-variant="incorrect"] {
              border: 2px solid #6b6b6b;
              background: #6b6b6b;
              color: #ffffff;
            }

            &[data-variant="correct"] {
              border: 2px solid #009444;
              background: #009444;
              color: #ffffff;
            }
          }
        }
      }
    </style>`;
  }
}
