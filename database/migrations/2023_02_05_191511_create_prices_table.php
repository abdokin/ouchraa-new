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
        Schema::create('prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('FirstMileHub')->nullable()->references('id')->on('shipment_providers');
            $table->foreignId('CityID')->references('id')->on('cities');
            $table->decimal('DoorDelivery');
            $table->decimal('FailedDelivery');
            $table->decimal('PickupStation');
            $table->decimal('CustomerReturn');
            $table->foreignId('UpdatedBy')->nullable()->references('id')->on('users');
            $table->boolean('Status')->default(true);
            $table->foreignId('CreatedBy')->nullable()->references('id')->on('users');

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
        Schema::dropIfExists('prices');
    }
};