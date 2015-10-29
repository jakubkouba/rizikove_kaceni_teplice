<?php
/** Template Name: Profile */
use rk\FrontendHelper;

$view['post'] = Timber::get_post();

$featured_images = get_fields();
$view['featured_images'] = FrontendHelper::get_featured_images($featured_images, 'mobile');
$cert_images = array_flip(preg_grep('/cert/', array_flip($featured_images)));
$view['certificates_title'] = __('Certificates', 'sage');

$certificates = [];
foreach ($cert_images as $title => $img_id) {
    switch($title){
        case 'arboriculture_cert': $title = __('Arboriculture', 'sage');
            break;
        case 'high_ground_work_cert': $title = __('Height ground work', 'sage');
            break;
        case 'insurance_contract_cert': $title = __('Insurance', 'sage');
    }

    $certificates["$title"] = wp_get_attachment_image($img_id, 'cert-desktop', false, array('id' => $title));
}
$view['certificates'] = $certificates;

Timber::render('profile.twig', $view);