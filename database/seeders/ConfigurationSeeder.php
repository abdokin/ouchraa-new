<?php

namespace Database\Seeders;

use App\Models\Configuration;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MO_Configuration = array(
            array('id' => '1','Tracking_Prefix' => 'MO','Upload_Prefix' => 'UP','Pickup_Prefix' => 'PDR','ForwardDeliveryRun_Prefix' => 'FDR','ReverseDeliveryRun_Prefix' => 'RDR','ForwardMovableUnit_Prefix' => 'FMU','ReverseMovableUnit_Prefix' => 'RMU','Loss_Deadline' => '15','Currency' => 'Dhs','VdPrice' => '10','PodPrice' => '10','FragilePrice' => '10')
          );
          collect($MO_Configuration)->each(function ($m) {
            Configuration::create($m);
        });
    }
}
