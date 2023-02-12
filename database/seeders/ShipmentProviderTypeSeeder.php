<?php

namespace Database\Seeders;

use App\Models\ShipmentProviderType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShipmentProviderTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MO_ShipmentType = array(
            array('id' => '1', 'ShipmentType' => 'Own Fleet'),
            array('id' => '2', 'ShipmentType' => '3PL Integrated'),
            array('id' => '3', 'ShipmentType' => '3PL No-Integrated')
        );
        collect($MO_ShipmentType)->each(function ($m) {
            ShipmentProviderType::create($m);
        });
    }
}