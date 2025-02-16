<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

	$postID = 1;

	// echo '<pre>',print_r($block),'</pre>';

?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php _e('Read More:'); ?> <a href="<?= get_the_permalink($postID) ?>"><?= get_the_title($postID) ?></a>
</p>
