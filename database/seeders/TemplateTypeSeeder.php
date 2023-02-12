<?php

namespace Database\Seeders;

use App\Models\TemplateType;
use Illuminate\Database\Seeder;

class TemplateTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MO_TemplateType = array(
            array('id' => '1', 'TemplateType' => 'Label'),
            array('id' => '2', 'TemplateType' => 'Manifest'),
            array('id' => '3', 'TemplateType' => 'E-mail'),
            array('id' => '4', 'TemplateType' => 'SMS'),
            array('id' => '5', 'TemplateType' => 'Whatsapp')
        );
        collect($MO_TemplateType)->each(function ($m) {
            TemplateType::create($m);
        });
    }
}