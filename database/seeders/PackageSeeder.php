<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Auth\User;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        Package::factory(100)->create([
            'ShipperID' => User::first()->id,
        ]);
    }
}