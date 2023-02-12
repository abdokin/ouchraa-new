<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Routes;

class RouteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MO_Routes = array(
            array('id' => '1', 'RouteName' => 'Casa Agence to MRK', 'FromHub' => '1', 'ToHub' => '7', 'RouteProcesses' => '1,10,7', 'RouteWorkflow' => 'FORWARD', 'CreatedBy' => '', 'CreatedAt' => '', 'UpdatedBy' => '', 'UpdatedAt' => ''),
            array('id' => '2', 'RouteName' => 'Center Distribution to Rabat Agence', 'FromHub' => '', 'ToHub' => '', 'RouteProcesses' => '10', 'RouteWorkflow' => '', 'CreatedBy' => '', 'CreatedAt' => '', 'UpdatedBy' => '', 'UpdatedAt' => ''),
            array('id' => '3', 'RouteName' => 'Center Distribution to Agadir Agence', 'FromHub' => '', 'ToHub' => '', 'RouteProcesses' => '10', 'RouteWorkflow' => '', 'CreatedBy' => '', 'CreatedAt' => '', 'UpdatedBy' => '', 'UpdatedAt' => ''),
            array('id' => '4', 'RouteName' => 'NETWORK - JAD', 'FromHub' => '', 'ToHub' => '', 'RouteProcesses' => '10', 'RouteWorkflow' => '', 'CreatedBy' => '', 'CreatedAt' => '', 'UpdatedBy' => '', 'UpdatedAt' => ''),
            array('id' => '5', 'RouteName' => 'NETWORK - FES', 'FromHub' => '', 'ToHub' => '', 'RouteProcesses' => '10', 'RouteWorkflow' => '', 'CreatedBy' => '', 'CreatedAt' => '', 'UpdatedBy' => '', 'UpdatedAt' => ''),
            array('id' => '6', 'RouteName' => 'NETWORK - TGR', 'FromHub' => '', 'ToHub' => '', 'RouteProcesses' => '10', 'RouteWorkflow' => '', 'CreatedBy' => '', 'CreatedAt' => '', 'UpdatedBy' => '', 'UpdatedAt' => ''),
            array('id' => '7', 'RouteName' => 'NETWORK - MRK', 'FromHub' => '', 'ToHub' => '', 'RouteProcesses' => '10', 'RouteWorkflow' => '', 'CreatedBy' => '', 'CreatedAt' => '', 'UpdatedBy' => '', 'UpdatedAt' => '')
        );
        collect($MO_Routes)->each(function ($m) {
            Routes::create($m);
        });
    }
}