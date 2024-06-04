import { View, html } from 'rune-ts';
import {ButtonAction} from '../../../components/atoms/ButtonAction/ButtonAction'

export type Home = {
};

export class HomeView extends View {
    override template({ }: Home) {
        return html` 
            <div>
                ${new ButtonAction({label: "테스트"})}
                ${new ButtonAction({label: "테스트"})}
                ${new ButtonAction({label: "테스트"})}
                ${new ButtonAction({label: "테스트"})}
                ${new ButtonAction({label: "테스트"})}
                ${new ButtonAction({label: "테스트"})}
                ${new ButtonAction({label: "테스트"})}
                ${new ButtonAction({label: "테스트"})}
                ${new ButtonAction({label: "테스트"})}
                ${new ButtonAction({label: "테스트"})}
                ${new ButtonAction({label: "테스트"})}
            </div> 
        `;
    }
}