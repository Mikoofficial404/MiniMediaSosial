<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LikesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('likes')->insert(
[
          [
            'user_id' => 1,
            'posts_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
          ],
          [
             'user_id' => 2,
            'posts_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
          ]
        ]);

    }
}
