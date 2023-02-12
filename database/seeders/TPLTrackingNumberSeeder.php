<?php

namespace Database\Seeders;

use App\Models\PlTrackingNumber;
use App\Models\Role;
use App\Models\TPLTrackingNumber;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TPLTrackingNumberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MOD_3LPTRack = array(
            array('id' => '1', 'TrackingNumber' => 'ED111111111', 'ShipmentProvider' => 2, 'Status' => false, 'PackageID' => ''),
            array('id' => '2', 'TrackingNumber' => 'ED111111112', 'ShipmentProvider' => 2, 'Status' => false, 'PackageID' => ''),
            array('id' => '3', 'TrackingNumber' => 'ED111111113', 'ShipmentProvider' => 2, 'Status' => false, 'PackageID' => ''),
            array('id' => '4', 'TrackingNumber' => 'ED111111114', 'ShipmentProvider' => 2, 'Status' => false, 'PackageID' => ''),

        );
        collect($MOD_3LPTRack)->each(function ($m) {
            TPLTrackingNumber::create($m);
        });
    }
}