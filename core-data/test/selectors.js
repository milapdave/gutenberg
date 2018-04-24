/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { getMedia, getPostType } from '../selectors';

describe( 'getMedia', () => {
	it( 'should return undefined for unknown media', () => {
		const state = deepFreeze( {
			media: {},
		} );
		expect( getMedia( state, 1 ) ).toBe( undefined );
	} );

	it( 'should return a media element by id', () => {
		const state = deepFreeze( {
			media: {
				1: { id: 1 },
			},
		} );
		expect( getMedia( state, 1 ) ).toEqual( { id: 1 } );
	} );
} );

describe( 'getPostType', () => {
	it( 'should return undefined for unknown post type', () => {
		const state = deepFreeze( {
			postTypes: {},
		} );
		expect( getPostType( state, 'post' ) ).toBe( undefined );
	} );

	it( 'should return a post type by slug', () => {
		const state = deepFreeze( {
			postTypes: {
				post: { slug: 'post' },
			},
		} );
		expect( getPostType( state, 'post' ) ).toEqual( { slug: 'post' } );
	} );
} );
