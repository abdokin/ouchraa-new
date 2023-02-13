<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('t_p_l_tracking_numbers', function (Blueprint $table) {
            $table->id();
            $table->string('TrackingNumber');
            $table->foreignId('ShipmentProvider')->references('id')->on('shipment_providers')->constrained();
            $table->boolean('Status')->default(false);
            $table->string('PackageID')->nullable();
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
        Schema::dropIfExists('t_p_l_tracking_numbers');
    }
};