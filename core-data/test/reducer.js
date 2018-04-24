/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { terms, media, postTypes } from '../reducer';
import { receiveTerms } from '../actions';

describe( 'terms()', () => {
	it( 'returns an empty object by default', () => {
		const state = terms( undefined, {} );

		expect( state ).toEqual( {} );
	} );

	it( 'keys by taxonomy', () => {
		const originalState = deepFreeze( {} );
		const state = terms(
			originalState,
			receiveTerms( 'categories', undefined, [ { id: 1 } ] )
		);

		expect( state ).toHaveProperty( 'categories' );
	} );
} );

describe( 'media', () => {
	it( 'returns an empty object by default', () => {
		const state = media( undefined, {} );

		expect( state ).toEqual( {} );
	} );

	it( 'returns with received media by id', () => {
		const originalState = deepFreeze( {} );
		const state = media( originalState, {
			type: 'RECEIVE_MEDIA',
			media: [ { id: 1, title: 'beach' }, { id: 2, title: 'sun' } ],
		} );

		expect( state ).toEqual( {
			1: { id: 1, title: 'beach' },
			2: { id: 2, title: 'sun' },
		} );
	} );
} );

describe( 'postTypes', () => {
	it( 'returns an empty object by default', () => {
		const state = postTypes( undefined, {} );

		expect( state ).toEqual( {} );
	} );

	it( 'returns with received post types by slug', () => {
		const originalState = deepFreeze( {} );
		const state = postTypes( originalState, {
			type: 'RECEIVE_POST_TYPES',
			postTypes: [ { slug: 'b', title: 'beach' }, { slug: 's', title: 'sun' } ],
		} );

		expect( state ).toEqual( {
			b: { slug: 'b', title: 'beach' },
			s: { slug: 's', title: 'sun' },
		} );
	} );
} );
