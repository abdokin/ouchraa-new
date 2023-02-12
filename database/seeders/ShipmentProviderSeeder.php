<?php

namespace Database\Seeders;

use App\Models\ShipmentProvider;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShipmentProviderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MO_ShipmentProvider = array(
            array('id' => '1', 'ShipmentProviderName' => 'CAS-HUB', 'ShipmentProviderAddress' => 'Casa', 'ShipmentProviderCity' => 1, 'ShipmentProviderPhone' => '', 'created_at' => '2021-10-12 13:39:42', 'updated_at' => '2021-10-12 13:39:42', 'Type' => 1, 'Status' => true, 'Logo' => '', 'TemplateID' => '1', 'AutoTN' => '1'),
            array('id' => '2', 'ShipmentProviderName' => 'RBT-XPEED-HUB', 'ShipmentProviderAddress' => 'Rabat', 'ShipmentProviderCity' => 2, 'ShipmentProviderPhone' => '', 'created_at' => '2021-10-12 13:39:42', 'updated_at' => '2021-12-09 20:50:34', 'Type' => 1, 'Status' => true, 'Logo' => '', 'TemplateID' => '1', 'AutoTN' => '1'),
        );
        collect($MO_ShipmentProvider)->each(function ($m) {
            ShipmentProvider::create($m);
        });
        // ShipmentProvider::factory(1)->create();
    }
}