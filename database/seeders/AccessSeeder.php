<?php

namespace Database\Seeders;

use App\Models\Access;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MO_Access = array(
            array('id' => 1, 'access_type' => 'Mass Upload'),
            array('id' => 2, 'access_type' => 'Package History'),
            array('id' => 3, 'access_type' => 'Package Creation'),
            array('id' => 4, 'access_type' => 'Package Creation Employee'),
            array('id' => 5, 'access_type' => 'Package Update'),
            array('id' => 6, 'access_type' => 'Package Cancellation'),
            array('id' => 7, 'access_type' => 'Package View'),
            array('id' => 8, 'access_type' => 'Package View Any'),
            array('id' => 9, 'access_type' => 'Package Ready to Ship'),
            array('id' => 10, 'access_type' => 'Labels Download'),
            array('id' => 11, 'access_type' => 'Customer Return'),
            array('id' => 12, 'access_type' => 'Export Generation'),
            array('id' => 13, 'access_type' => 'Switch Hub'),
            array('id' => 14, 'access_type' => 'Package Ready to Ship')




        );
        collect($MO_Access)->each(function ($MO_Acces) {
            Access::create($MO_Acces);
        });
    }
}