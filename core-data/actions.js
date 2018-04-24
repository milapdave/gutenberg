/**
 * External dependencies
 */
import { castArray } from 'lodash';

/**
 * Internal dependencies
 */
import {
	toggleIsRequesting,
	receiveQueriedItems,
} from './queried-data';

/**
 * Returns an action object used in signalling whether a request for a given
 * terms of a taxonomy is in progress.
 *
 * @param {string}  taxonomy     Data type requested.
 * @param {?Object} query        Optional terms query.
 * @param {boolean} isRequesting Whether a request is in progress.
 *
 * @return {Object} Action object.
 */
export function toggleIsRequestingTerms( taxonomy, query, isRequesting ) {
	return {
		...toggleIsRequesting( query, isRequesting ),
		taxonomy,
	};
}

/**
 * Returns an action object used in signalling that terms have been received
 * for a given taxonomy.
 *
 * @param {string}   taxonomy Taxonomy name.
 * @param {?Object}  query    Optional terms query.
 * @param {Object[]} terms    Terms received.
 *
 * @return {Object} Action object.
 */
export function receiveTerms( taxonomy, query, terms ) {
	return {
		...receiveQueriedItems( query, terms ),
		taxonomy,
	};
}

/**
 * Returns an action object used in signalling that media have been received.
 *
 * @param {Array|Object} media Media received.
 *
 * @return {Object} Action object.
 */
export function receiveMedia( media ) {
	return {
		type: 'RECEIVE_MEDIA',
		media: castArray( media ),
	};
}

/**
 * Returns an action object used in signalling that post types have been received.
 *
 * @param {Array|Object} postTypes Post Types received.
 *
 * @return {Object} Action object.
 */
export function receivePostTypes( postTypes ) {
	return {
		type: 'RECEIVE_POST_TYPES',
		postTypes: castArray( postTypes ),
	};
}
