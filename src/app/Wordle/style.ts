import { html, View } from "rune-ts";

export class StyleView extends View<object> {
  override template() {
    return html` <style>
      body {
        margin: 0;
        position: relative;
        width: 100vw;
        height: 100vh;
      }

      #body {
        width: 100%;
        min-height: 100%;
        position: relative;
      }

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
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & .wordle__container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;

          & .wordle__game {
            width: 350px;

            display: grid;
            grid-template-columns: 62px 62px 62px 62px 62px;
            grid-gap: 5px;
            align-items: center;
          }
        }
      }

      .wordle__box {
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

      #keyboard {
        margin: 0 auto;
        width: 500px;

        & .keyboard__row {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
          gap: 10px;

          & .keyboard__box {
            user-select: none;
            cursor: pointer;
            width: 43px;
            height: 58px;
            border-radius: 5px;

            font-size: 18px;
            text-align: center;
            line-height: 58px;

            font-weight: 700;

            background-color: #d9d9d9;

            &[data-variant="correct"] {
              background: #009444;
              color: #ffffff;
            }

            &[data-variant="include"] {
              background: #99e0ff;
              color: #ffffff;
            }

            &[data-variant="incorrect"] {
              background: #6b6b6b;
              color: #ffffff;
            }

            &[data-variant="enter"] {
              width: 66px;
            }

            &[data-variant="backspace"] {
            }
          }
        }
      }

      dialog.manual__modal {
        padding: 20px 30px;
        top: 50%;
        transform: translateY(-50%);

        &::backdrop {
          background-image: linear-gradient(
            45deg,
            magenta,
            rebeccapurple,
            dodgerblue,
            green
          );
          opacity: 0.75;
        }

        & > div.manual__modal--top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;

          & > h2 {
            font-size: 30px;
          }
        }

        & > h3 {
          font-size: 24px;
          margin-bottom: 16px;
        }

        & > section.manual__modal--content {
          & > ul {
            padding: 0 20px;
            margin-bottom: 16px;
          }

          & > div.manual__modal--example {
            margin: 8px 0 20px 0;

            & > div.example__content {
              display: flex;
              gap: 10px;
              margin-bottom: 5px;
            }
          }
        }
      }
    </style>`;
  }
}
