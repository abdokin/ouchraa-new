<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Action;

class ActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MO_Action = array(
            array('id' => '1','ActionName' => 'Uploaded','ActionStyle' => ''),
            array('id' => '2','ActionName' => 'Added','ActionStyle' => 'badge-success'),
            array('id' => '3','ActionName' => 'Removed','ActionStyle' => 'badge-danger'),
            array('id' => '4','ActionName' => 'Dispatched','ActionStyle' => 'badge-warning'),
            array('id' => '5','ActionName' => 'Driver Confirmation','ActionStyle' => ''),
            array('id' => '6','ActionName' => 'Completed','ActionStyle' => ''),
            array('id' => '7','ActionName' => 'Created','ActionStyle' => ''),
            array('id' => '8','ActionName' => 'Edited','ActionStyle' => ''),
            array('id' => '9','ActionName' => 'Success Confirmation','ActionStyle' => 'badge-success'),
            array('id' => '10','ActionName' => 'Failed Confirmation','ActionStyle' => 'badge-danger'),
            array('id' => '11','ActionName' => 'Stocked','ActionStyle' => ''),
            array('id' => '12','ActionName' => 'Unsealed','ActionStyle' => ''),
            array('id' => '13','ActionName' => 'Received','ActionStyle' => 'badge-success'),
            array('id' => '14','ActionName' => 'Investigation','ActionStyle' => 'badge-danger'),
            array('id' => '15','ActionName' => 'Finished','ActionStyle' => ''),
            array('id' => '16','ActionName' => 'Transferred','ActionStyle' => ''),
            array('id' => '17','ActionName' => 'Scheduled','ActionStyle' => ''),
            array('id' => '18','ActionName' => 'Forced','ActionStyle' => '')
          );
        collect($MO_Action)->each(function ($m) {
            Action::create($m);
        });
    }
}
