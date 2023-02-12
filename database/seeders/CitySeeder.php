<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cities = array(
            // array("code_postal" => "CODE_POSTAL", "code_pays" => "CODE_PAYS", "localite" => "LOCALITE", "province" => "PROVINCE", "region_postal" => "REGION_POSTALE"),
            array("code_postal" => "1", "code_pays" => "MA", "localite" => "OUAHAT SIDI BRAHIM", "province" => "MARRAKECH", "region_postal" => "MARRAKECH-TENSIFT-AL HAOUZ", 'status' => true, 'LastMileHub' => 1),
            array("code_postal" => "43273", "code_pays" => "MA", "localite" => "OUARGUI", "province" => "EL KELAA DES SRAGHNA", "region_postal" => "MARRAKECH SAFI", 'status' => true, 'LastMileHub' => 2),

        );
        collect($cities)->each(function ($m) {
            City::create($m);
        });
    }
}