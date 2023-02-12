<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $this->call([

            WorkFlowSeeder::class,
            ActionSeeder::class,
            AccessSeeder::class,
            StatusSeeder::class,
            TemplateTypeSeeder::class,
            TemplateSeeder::class,
            ShipmentProviderTypeSeeder::class,
            ShipmentProviderSeeder::class,
            CitySeeder::class,

            RoleSeeder::class,
            UserSeeder::class,
                // PackageSeeder::class,
                // PackageHistorySeeder::class,
            WeightSeeder::class,
            PriceSeeder::class,
            TPLTrackingNumberSeeder::class,
            ReasonSeeder::class,

        ]);
    }
}