<?php
/**
 * Plugin Name:       Steve Ross Dmg Media
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       steve-ross-dmg-media
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

add_action( 'init', 'dmg_media_postlink' );
function dmg_media_postlink() {
	register_block_type( __DIR__ . '/build/postlink' );
}

if(class_exists('WP_CLI')) WP_CLI::add_command( 'dmg-read-more-search', 'DMG_READ_MORE_SEARCH' );
function DMG_READ_MORE_SEARCH( $args ) {
	$args = wp_parse_args( $args, []);

	$after = (@$args[0]) ? $args[0] : date("Y-m-d H:i", time() - 30 * DAY_IN_SECONDS);
	$before = (@$args[1]) ? $args[1] : date("Y-m-d H:i");

	$posts = get_posts([
		'post_type' => 'ANY',
		's' => '<!-- wp:dmg-media/postlink ',
		'date_query' => [
			'after' => $after,
			'before' => $before,
		],
		'fields' => 'ids',
	]);

	if(!strtotime($after) || !strtotime($before)):
		WP_CLI::log("Invalid date(s) provided. Format must be YYYY-MM-DD.");
	elseif($posts):
		WP_CLI::log(implode(", ", $posts));
	else:
		WP_CLI::log("No posts found between $after and $before.");
	endif;

}
