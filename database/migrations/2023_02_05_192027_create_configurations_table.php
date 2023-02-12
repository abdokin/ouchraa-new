<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('configurations', function (Blueprint $table) {
            $table->id();
            $table->string('Tracking_Prefix');
            $table->string('Upload_Prefix');
            $table->string('Pickup_Prefix');
            $table->string('ForwardDeliveryRun_Prefix');
            $table->string('ReverseDeliveryRun_Prefix');
            $table->string('ForwardMovableUnit_Prefix');
            $table->string('ReverseMovableUnit_Prefix');
            $table->string('Loss_Deadline');
            $table->string('Currency');
            $table->string('VdPrice');
            $table->string('PodPrice');
            $table->string('FragilePrice');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('configurations');
    }
};
