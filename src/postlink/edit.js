/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ComboboxControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { query, postTitle, postLink, queryParams } = attributes;
	const { useSelect } = wp.data;

	// const posts = useSelect( ( select ) => {
	// 	return select( 'core' ).getEntityRecords( 'postType', 'ANY', { status: 'publish'} );
	// });

	// if(posts.length >= 1) {
	// 	posts.map( (post, index) => {
	// 		filteredPosts.push({
	// 			value: post.id,
	// 			label: post.title,
	// 		});
	// 	});

	// 	setAttributes({
	// 		options: filteredPosts,
	// 	});

	// }


	// const posts = apiFetch( { path: addQueryArgs('/wp/v2/posts', queryParams || {}) } ).then( ( posts ) => {
	// 	let filteredPosts = [];

	// 	if(posts.length >= 1) {
	// 		posts.map( (post, index) => {
	// 			filteredPosts.push({
	// 				value: post.id,
	// 				label: post.title.rendered,
	// 			});
	// 		});

	// 		setAttributes({
	// 			options: filteredPosts,
	// 		});

	// 	}
	// } );

	// console.log(posts);

	const options = [
		{
			'value': 1,
			'label': 'Small',
			'url': 'https://small.local',
		},
		{
			'value': 2,
			'label': 'Medium',
			'url': 'https://medium.local',
		},
		{
			'value': 3,
			'label': 'Large',
			'url': 'https://large.local',
		},
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __('Settings', 'dmg-media-postlink') }>
					<ComboboxControl
						__nextHasNoMarginBottom
						label={ __(
							'Select Post',
							'dmg-media-postlink'
						) }
						value={ query || '' }
						// isLoading={ isLoading }
						options={ options || [] }
						onChange={ (value) => {
							console.log(value);

							setAttributes({
								query: value,
								postLink: "permalink",
								postTitle: "post title",
							});
						} }
						onFilterValueChange={ ( inputValue ) => setAttributes({
								options: options.filter( ( option ) =>
									option.value === inputValue
								),
							})
						}
					/>
				</PanelBody>
			</InspectorControls>
			<p { ...useBlockProps() }>
				Read More: <a href={ postLink }>{ postTitle }</a>
			</p>
		</>
	);
}
