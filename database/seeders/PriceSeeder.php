<?php

namespace Database\Seeders;

use App\Models\Price;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {


    $MO_Pricing = array(

      array('id' => '1', 'FirstMileHub' => '1', 'CityID' => '1', 'DoorDelivery' => '30.00', 'FailedDelivery' => '25.00', 'PickupStation' => '20.00', 'CustomerReturn' => '30.00', 'updated_at' => '2021-12-17 21:08:51', 'UpdatedBy' => '1', 'Status' => true),
      array('id' => '2', 'FirstMileHub' => '1', 'CityID' => '1', 'DoorDelivery' => '30.00', 'FailedDelivery' => '25.00', 'PickupStation' => '20.00', 'CustomerReturn' => '30.00', 'updated_at' => '2021-12-17 21:08:51', 'UpdatedBy' => '1', 'Status' => true)
    );

    collect($MO_Pricing)->each(function ($m) {
      Price::create($m);
    });
  }
}