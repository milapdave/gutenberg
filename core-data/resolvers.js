/**
 * WordPress dependencies
 */
import apiRequest from '@wordpress/api-request';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import {
	toggleIsRequestingTerms,
	receiveTerms,
	receiveMedia,
	receivePostTypes,
} from './actions';
import { hasRequestedCategories } from './selectors';

/**
 * Requests categories from the REST API, yielding action objects on request
 * progress.
 */
export const getCategories = {
	fulfill: async function* ( state, query ) {
		yield toggleIsRequestingTerms( 'categories', query, true );
		const path = addQueryArgs( '/wp/v2/categories', query );
		const categories = await apiRequest( { path } );
		yield receiveTerms( 'categories', query, categories );
		yield toggleIsRequestingTerms( 'categories', query, false );
	},
	isFulfilled: hasRequestedCategories,
};

/**
 * Requests a media element from the REST API.
 *
 * @param {Object} state State tree
 * @param {number} id    Media id
 */
export async function* getMedia( state, id ) {
	const media = await apiRequest( { path: `/wp/v2/media/${ id }` } );
	yield receiveMedia( media );
}

/**
 * Requests a post type element from the REST API.
 *
 * @param {Object} state State tree
 * @param {number} slug  Post Type slug
 */
export async function* getPostType( state, slug ) {
	const postType = await apiRequest( { path: `/wp/v2/types/${ slug }?context=edit` } );
	yield receivePostTypes( postType );
}
