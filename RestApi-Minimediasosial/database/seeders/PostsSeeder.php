<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        DB::table('posts')->insert(
[
           [
             'user_id' => 1,
            'content' => $faker->text(),
            'image_path' => 'https://placehold.co/300x300',
            'created_at' => now(),
            'updated_at' => now(),
           ],
           [
            'user_id' => 2,
            'content' => $faker->text(),
            'image_path' => 'https://placehold.co/300x300',
            'created_at' => now(),
            'updated_at' => now(),
           ]
        ]);
    }
}
