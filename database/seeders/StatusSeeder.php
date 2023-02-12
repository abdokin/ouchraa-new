<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MO_Status = array(
            array('id' => '1', 'StatusName' => 'Pending', 'StatusStyle' => 'bg-warning'),
            array('id' => '2', 'StatusName' => 'Ready to Ship', 'StatusStyle' => 'bg-info'),
            array('id' => '3', 'StatusName' => 'Picked', 'StatusStyle' => 'bg-success'),
            array('id' => '4', 'StatusName' => 'Cancel', 'StatusStyle' => 'bg-danger'),
            array('id' => '5', 'StatusName' => 'In Transit', 'StatusStyle' => 'bg-danger'),
            array('id' => '6', 'StatusName' => 'At the Hub', 'StatusStyle' => 'bg-purple'),
            array('id' => '8', 'StatusName' => 'Delivered', 'StatusStyle' => 'bg-success'),
            array('id' => '9', 'StatusName' => 'Not Delivered', 'StatusStyle' => 'bg-danger'),
            array('id' => '11', 'StatusName' => 'Returned', 'StatusStyle' => 'bg-success'),
            array('id' => '12', 'StatusName' => 'Not Returned', 'StatusStyle' => 'bg-danger'),
            array('id' => '13', 'StatusName' => 'Lost', 'StatusStyle' => 'bg-danger'),
            array('id' => '15', 'StatusName' => 'In Progress', 'StatusStyle' => 'bg-info'),
            array('id' => '16', 'StatusName' => 'Closed', 'StatusStyle' => 'bg-success'),
            array('id' => '17', 'StatusName' => 'Not Picked', 'StatusStyle' => 'bg-danger'),
            array('id' => '18', 'StatusName' => 'Completed', 'StatusStyle' => 'bg-success'),
            array('id' => '19', 'StatusName' => 'Not Accepted', 'StatusStyle' => 'bg-danger'),

        );

        collect($MO_Status)->each(function ($m) {
            Status::create($m);
        });
    }
}