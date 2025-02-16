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
	const { query, postTitle, postLink, options, queryParams } = attributes;
	const { useSelect } = wp.data;

	const posts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'post', queryParams );
	});

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
						options={ options || [] }
						onChange={ (value) => {

							const postIndex = options.findIndex( item => item.value == value);
							const postObject = options[postIndex];

							setAttributes({
								query: value,
								postLink: postObject.link,
								postTitle: postObject.label,
							});

						} }
						onFilterValueChange={ ( inputValue ) => {
							if(isNumeric(inputValue)) {
								setAttributes({
									options: formatPostData(posts),
									queryParams: {
										include: inputValue,
									},
								});
							} else {
								setAttributes({
									options: formatPostData(posts),
									queryParams: {
										search: inputValue,
									},
								})
							}
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<p { ...useBlockProps() }>
				Read More: <a href={ postLink }>{ postTitle }</a>
			</p>
		</>
	);
}

function isNumeric(str) {
	if (typeof str != "string") return false // we only process strings!
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		   !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

function formatPostData(posts){
	let postOptions = [];

	if(posts) {
		posts.map( (post) => {
			postOptions.push({
				value: post.id,
				label: post.title.rendered,
				link: post.link,
			});
		});
	}

	return postOptions;
}
