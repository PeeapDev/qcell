<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Region;

class RegionsTableSeeder extends Seeder
{
    public function run()
    {
        $regions = ['North America', 'Europe', 'Asia', 'Africa', 'South America'];
        foreach ($regions as $region) {
            Region::create(['name' => $region]);
        }
    }
}
