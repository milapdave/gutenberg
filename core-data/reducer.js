/**
 * External dependencies
 */
import { keyBy } from 'lodash';

/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { reducer as queriedDataReducer } from './queried-data';
import { onSubKey } from './utils';

/**
 * Reducer managing terms state. Keyed by taxonomy slug, the value is either
 * undefined (if no request has been made for given taxonomy), null (if a
 * request is in-flight for given taxonomy), or the array of terms for the
 * taxonomy.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export const terms = onSubKey( 'taxonomy' )( queriedDataReducer );

/**
 * Reducer managing media state. Keyed by id.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function media( state = {}, action ) {
	switch ( action.type ) {
		case 'RECEIVE_MEDIA':
			return {
				...state,
				...keyBy( action.media, 'id' ),
			};
	}

	return state;
}

/**
 * Reducer managing post types state. Keyed by slug.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function postTypes( state = {}, action ) {
	switch ( action.type ) {
		case 'RECEIVE_POST_TYPES':
			return {
				...state,
				...keyBy( action.postTypes, 'slug' ),
			};
	}

	return state;
}

export default combineReducers( {
	terms,
	media,
	postTypes,
} );
