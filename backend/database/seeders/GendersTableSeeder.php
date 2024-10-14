<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gender;

class GendersTableSeeder extends Seeder
{
    public function run()
    {
        $genders = ['Male', 'Female', 'Non-binary'];
        foreach ($genders as $gender) {
            Gender::create(['name' => $gender]);
        }
    }
}
