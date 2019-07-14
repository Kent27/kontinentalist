<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'user_id' => rand(1,2),
        'title' => $faker->words(3, true),
        'content' => $faker->paragraphs(3, true)       
    ];
});
