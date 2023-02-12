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
        Schema::create('shipment_providers', function (Blueprint $table) {
            $table->id();
            $table->string('ShipmentProviderName');
            $table->string('ShipmentProviderAddress');
            $table->foreignId('ShipmentProviderCity')->nullable();
            $table->string('ShipmentProviderPhone');
            $table->foreignId('CreatedBy')->nullable()->references('id')->on('users')->cascadeOnDelete();
            $table->foreignId('UpdatedBy')->nullable()->references('id')->on('users')->cascadeOnDelete();
            $table->foreignId('Type')->references('id')->on('shipment_provider_types');
            $table->boolean('Status')->default(false);
            $table->string('Logo')->nullable()->default(""); //TODO:make logo link
            $table->foreignId('TemplateID')->references('id')->on('templates')->cascadeOnDelete();
            $table->boolean('AutoTN')->default(false);
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
        Schema::dropIfExists('shipment_providers');
    }
};