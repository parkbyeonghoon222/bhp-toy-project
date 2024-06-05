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
          }
        }
      }
    </style>`;
  }
}
