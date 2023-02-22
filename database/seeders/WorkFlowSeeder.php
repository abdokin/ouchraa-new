<?php

namespace Database\Seeders;

use App\Models\WorkFlow;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkFlowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MO_Workflow = array(
            array('id' => '1', 'Code' => 'PDO', 'WorkflowName' => 'Pickup Drop off'),
            array('id' => '2', 'Code' => 'PDH', 'WorkflowName' => 'Pickup Delivery to hub'),
            array('id' => '3', 'Code' => 'FPS', 'WorkflowName' => 'Forward Pickup station'),    
            array('id' => '4', 'Code' => 'FDC', 'WorkflowName' => 'Forward Delivery to customers'),
            array('id' => '5', 'Code' => 'RDV', 'WorkflowName' => 'Reverse Delivery to vendors'),
            array('id' => '6', 'Code' => 'RPS', 'WorkflowName' => 'Reverse Pickup station'),
            array('id' => '7', 'Code' => 'RRH', 'WorkflowName' => 'Reverse Return to hub'),
            array('id' => '8', 'Code' => 'RRC', 'WorkflowName' => 'Retrievers Return from the customers')
        );
        collect($MO_Workflow)->each(function ($workFlow) {
            WorkFlow::create($workFlow);
        });
    }
}