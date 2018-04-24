/**
 * Internal dependencies
 */
import {
	getQueriedItems,
	isRequestingQueryItems,
	hasRequestedQueryItems,
} from './queried-data';

/**
 * Returns all the available terms for the given taxonomy.
 *
 * @param {Object}  state    Data state.
 * @param {string}  taxonomy Taxonomy name.
 * @param {?Object} query    Optional terms query.
 *
 * @return {Array} Categories list.
 */
export function getTerms( state, taxonomy, query ) {
	if ( ! state.terms.hasOwnProperty( taxonomy ) ) {
		return [];
	}

	return getQueriedItems( state.terms[ taxonomy ], query );
}

/**
 * Returns all the available categories.
 *
 * @param {Object}  state Data state.
 * @param {?Object} query Optional categories query.
 *
 * @return {Array} Categories list.
 */
export function getCategories( state, query ) {
	return getTerms( state, 'categories', query );
}

/**
 * Returns true if a request is in progress for terms data of a given taxonomy,
 * or false otherwise.
 *
 * @param {Object}  state    Data state.
 * @param {string}  taxonomy Taxonomy name.
 * @param {?Object} query    Optional terms query.
 *
 * @return {boolean} Whether a request is in progress for taxonomy's terms.
 */
export function isRequestingTerms( state, taxonomy, query ) {
	if ( ! state.terms.hasOwnProperty( taxonomy ) ) {
		return false;
	}

	return isRequestingQueryItems( state.terms[ taxonomy ], query );
}

/**
 * Returns true if a request has been issued for terms data of a given
 * taxonomy, or false otherwise.
 *
 * @param {Object}  state    Data state.
 * @param {string}  taxonomy Taxonomy name.
 * @param {?Object} query    Optional terms query.
 *
 * @return {boolean} Whether a request has been issued for taxonomy's terms.
 */
export function hasRequestedTerms( state, taxonomy, query ) {
	if ( ! state.terms.hasOwnProperty( taxonomy ) ) {
		return false;
	}

	return hasRequestedQueryItems( state.terms[ taxonomy ], query );
}

/**
 * Returns true if a request is in progress for categories data, or false
 * otherwise.
 *
 * @param {Object}  state Data state.
 * @param {?Object} query Optional categories query.
 *
 * @return {boolean} Whether a request is in progress for categories.
 */
export function isRequestingCategories( state, query ) {
	return isRequestingTerms( state, 'categories', query );
}

/**
 * Returns true if a request has been issued for categories data, or false
 * otherwise.
 *
 * @param {Object}  state Data state.
 * @param {?Object} query Optional categories query.
 *
 * @return {boolean} Whether a request has been issued for categories.
 */
export function hasRequestedCategories( state, query ) {
	return hasRequestedTerms( state, 'categories', query );
}

/**
 * Returns the media object by id.
 *
 * @param {Object} state Data state.
 * @param {number} id    Media id.
 *
 * @return {Object?}     Media object.
 */
export function getMedia( state, id ) {
	return state.media[ id ];
}

/**
 * Returns the Post Type object by slug.
 *
 * @param {Object} state Data state.
 * @param {number} slug  Post Type slug.
 *
 * @return {Object?}     Post Type object.
 */
export function getPostType( state, slug ) {
	return state.postTypes[ slug ];
}
