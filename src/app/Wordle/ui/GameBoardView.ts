import { View, html } from 'rune-ts';
import {ButtonAction} from '../../../components/atoms/ButtonAction/ButtonAction'

export type GameBoard = {
};

export class GameBoardView extends View<GameBoard> {
    override template({ }: GameBoard) {
        return html` 
            <div>
                ${new ButtonAction({label: ""})}
                ${new ButtonAction({label: ""})}
                ${new ButtonAction({label: ""})}
                ${new ButtonAction({label: ""})}
                ${new ButtonAction({label: ""})}
                ${new ButtonAction({label: ""})}
                ${new ButtonAction({label: ""})}
                ${new ButtonAction({label: ""})}
                ${new ButtonAction({label: ""})}
                ${new ButtonAction({label: ""})}
            </div> 
        `;
    }
}