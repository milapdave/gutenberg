/**
 * Internal dependencies
 */
import './style.scss';
import PanelBody from './body';

function PanelColor( { colorValue, colorName, title, ...props } ) {
	return (
		<PanelBody
			{ ...props }
			title={ [
				<span className="components-panel__color-title" key="title">{ title }</span>,
				colorValue && (
					<span className="components-panel__color-area" aria-label={ colorName || colorValue } key="color" style={ { background: colorValue } } />
				),
			] }
		/>
	);
}

export default PanelColor;
