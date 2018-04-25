/* eslint-disable no-console */
/**
 * External dependencies
 */
import { noop, get } from 'lodash';
import isShallowEqual from 'shallowequal';

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { Component, compose } from '@wordpress/element';
import { withContext, withAPIData } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Edit from './edit';
import { BlockEditContextProvider } from './context';

export class BlockEdit extends Component {
	constructor( props ) {
		super( props );
		this.state = {};
	}

	getChildContext() {
		const {
			id: uid,
			user,
			createInnerBlockList,
		} = this.props;

		return {
			BlockList: createInnerBlockList( uid ),
			canUserUseUnfilteredHTML: get( user.data, [
				'capabilities',
				'unfiltered_html',
			], false ),
		};
	}

	static getDerivedStateFromProps( nextProps, prevState ) {
		if ( nextProps.isSelected === get( prevState, [ 'context', 'isSelected' ] ) ) {
			return null;
		}

		return {
			context: {
				isSelected: nextProps.isSelected,
			},
		};
	}

	componentDidUpdate( prevProps, prevState ) {
		const notEqual = ! isShallowEqual( prevProps, this.props );
		console.log( 'BlockEdit did update:', notEqual, ! isShallowEqual( prevState, this.state ) );
		if ( notEqual ) {
			for ( const key in prevProps ) {
				if ( prevProps.hasOwnProperty( key ) ) {
					if ( prevProps[ key ] !== this.props[ key ] ) {
						console.log( 'BlockEdit prop changed:', key );
					}
				}
			}
		}
	}

	shouldComponentUpdate( nextProps, nextState ) {
		return ! isShallowEqual( this.props, nextProps ) || ! isShallowEqual( this.state, nextState );
	}

	render() {
		console.log( 'BlockEdit render' );
		return (
			<BlockEditContextProvider value={ this.state.context }>
				<Edit { ...this.props } />
			</BlockEditContextProvider>
		);
	}
}

BlockEdit.childContextTypes = {
	BlockList: noop,
	canUserUseUnfilteredHTML: noop,
};

export default compose( [
	withSelect( ( select ) => ( {
		postType: select( 'core/editor' ).getEditedPostAttribute( 'type' ),
	} ) ),
	withAPIData( ( { postType } ) => ( {
		user: `/wp/v2/users/me?post_type=${ postType }&context=edit`,
	} ) ),
	withContext( 'createInnerBlockList' )(),
] )( BlockEdit );
