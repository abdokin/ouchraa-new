<?php

namespace Database\Seeders;

use App\Models\Weight;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WeightSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MO_Weight = array(
            array(
                'id' => '1',
                'WeightFrom' => '0.00',
                'WeightTo' => '1.00',
                'DoorDelivery' => '0.00',
                'FailedDelivery' => '0.00',
                'PickupStation' => '0.00',
                'CustomerReturn' => '0.00',

                'Status' => '1',
                'Note' => '60/60/60cm & less than 1.2KG'
            ),
            array('id' => '2', 'WeightFrom' => '1.00', 'WeightTo' => '5.00', 'DoorDelivery' => '1.00', 'FailedDelivery' => '1.00', 'PickupStation' => '1.00', 'CustomerReturn' => '1.00', 'Status' => '1', 'Note' => '80/80/80cm & less than 5KG'),
            array('id' => '3', 'WeightFrom' => '5.00', 'WeightTo' => '10.00', 'DoorDelivery' => '2.00', 'FailedDelivery' => '2.00', 'PickupStation' => '2.00', 'CustomerReturn' => '2.00', 'Status' => '1', 'Note' => '100/100/100cm & less than 10KG'),
            array('id' => '4', 'WeightFrom' => '10.00', 'WeightTo' => '15.00', 'DoorDelivery' => '4.00', 'FailedDelivery' => '4.00', 'PickupStation' => '4.00', 'CustomerReturn' => '4.00', 'Status' => '1', 'Note' => '120/120/120cm & less than 20KG'),
            array('id' => '5', 'WeightFrom' => '15.00', 'WeightTo' => '30.00', 'DoorDelivery' => '5.00', 'FailedDelivery' => '5.00', 'PickupStation' => '5.00', 'CustomerReturn' => '5.00', 'Status' => '1', 'Note' => '120/120/120cm & more than 20KG')
        );
        collect($MO_Weight)->each(function ($m) {
            Weight::create($m);
        });
    }
}