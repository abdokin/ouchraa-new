<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            // ['name' => 'Administrator', 'slug' => 'admin'],
            ['name' => 'Own Team', 'slug' => 'own-team'],
            ['name' => 'Shipper', 'slug' => 'shipper'],
            ['name' => 'Driver', 'slug' => 'driver'],
            // ['name' => 'All', 'slug' => '*'],
        ];

        collect($roles)->each(function ($role) {
            Role::create($role);
        });
    }
}
