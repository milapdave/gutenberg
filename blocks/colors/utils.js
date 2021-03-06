/**
 * External dependencies
 */
import { find, kebabCase } from 'lodash';

/**
 * Returns the color value based on an array of named colors and the namedColor or the customColor value.
 *
 * @param {Array}   colors      Array of color objects containing the "name" and "color" value as properties.
 * @param {?string} namedColor  A string containing the color name.
 * @param {?string} customColor A string containing the customColor value.
 *
 * @return {?string} If namedColor is passed and the name is found in colors it returns the color for that name.
 * 					 Otherwise, the customColor parameter is returned.
 */
export const getColorValue = ( colors, namedColor, customColor ) => {
	if ( namedColor ) {
		const colorObj = find( colors, { name: namedColor } );
		return colorObj && colorObj.color;
	}
	if ( customColor ) {
		return customColor;
	}
};

/**
 * Returns a function that receives the color value and sets it using the attribute for named colors or for custom colors.
 *
 * @param {Array}  colors                   Array of color objects containing the "name" and "color" value as properties.
 * @param {string} colorAttributeName       Name of the attribute where named colors are stored.
 * @param {string} customColorAttributeName Name of the attribute where custom colors are stored.
 * @param {string} setAttributes            A function that receives an object with the attributes to set.
 *
 * @return {function} A function that receives the color value and sets the attributes necessary to correctly store it.
 */
export const setColorValue = ( colors, colorAttributeName, customColorAttributeName, setAttributes ) =>
	( colorValue ) => {
		const colorObj = find( colors, { color: colorValue } );
		setAttributes( {
			[ colorAttributeName ]: colorObj && colorObj.name ? colorObj.name : undefined,
			[ customColorAttributeName ]: colorObj && colorObj.name ? undefined : colorValue,
		} );
	};

/**
 * Returns a class based on the context a color is being used and its name.
 *
 * @param {string} colorContextName Context/place where color is being used e.g: background, text etc...
 * @param {string} colorName        Name of the color.
 *
 * @return {string} String with the class corresponding to the color in the provided context.
 */
export function getColorClass( colorContextName, colorName ) {
	if ( ! colorContextName || ! colorName ) {
		return;
	}

	return `has-${ kebabCase( colorName ) }-${ colorContextName }`;
}
