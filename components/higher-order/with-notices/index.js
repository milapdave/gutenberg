/**
 * External dependencies
 */
import uuid from 'uuid/v4';

/**
 * WordPress dependencies
 */
import { Component, createHigherOrderComponent } from '@wordpress/element';

/**
 * Override the default edit UI to include notices if supported.
 *
 * @param  {function|Component} BlockEdit Original component.
 * @return {Component}                    Wrapped component.
 */
export default createHigherOrderComponent( ( BlockEdit ) => {
	return class WrappedBlockEdit extends Component {
		constructor() {
			super( ...arguments );

			this.addNotice = this.addNotice.bind( this );
			this.removeNotice = this.removeNotice.bind( this );

			this.state = {
				notices: [],
			};
		}

		/**
		* Function passed down to blocks as a prop that adds a new notice.
		*
		* @param {Object} notice  Notice to add.
		*/
		addNotice( notice ) {
			const noticeToAdd = notice.id ? notice : { ...notice, id: uuid() };
			this.setState( ( state ) => ( {
				notices: [ ...state.notices, noticeToAdd ],
			} ) );
		}

		/**
		* Removes a notice by id.
		*
		* @param {string} id  Id of the notice to remove.
		*/
		removeNotice( id ) {
			this.setState( ( state ) => ( {
				notices: state.notices.filter( ( notice ) => notice.id !== id ),
			} ) );
		}

		render() {
			const createErrorNotice = ( msg ) => this.addNotice( { status: 'error', content: msg } );
			const notices = {
				noticeList: this.state.notices,
				createNotice: this.addNotice,
				createErrorNotice,
				removeNotice: this.removeNotice,
			};
			return (
				<BlockEdit key="block-edit"
					{ ...this.props }
					notices={ notices } />
			);
		}
	};
} );
