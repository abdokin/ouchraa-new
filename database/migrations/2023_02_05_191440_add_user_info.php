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
        Schema::table('users', function (Blueprint $table) {
            $table->string('ShipperAddress')->nullable();
            $table->foreignId('ShipperCity')->references('id')->on('cities')->constrained();
            $table->string('ShipperPhone');
            $table->foreignId('CreatedBy')->nullable()->references('id')->on('users');
            $table->foreignId('UpdatedBy')->nullable()->references('id')->on('users');
            $table->boolean('ShipmentProviderOwner')->default(true);
            $table->date('LastLogin')->default(now());
            $table->json('ShipmentProviderAccess')->default('[1]');
            $table->string('AccessRole')->nullable();
            $table->boolean('UserStatus')->default(true);
            $table->string('cin')->nullable();
            $table->foreignId('CurrentShipmentProvider')->references('id')->on('shipment_providers');
            $table->string('TrackingPrefix')->default('MC'); //TODO
            $table->float('Discount')->default(0);
            $table->foreignId('DriverID')->nullable()->references('id')->on('users');
            $table->foreignId('PickupDeliveryOption')->references('id')->on('work_flows');
            $table->decimal('PickupDeliveryPrice')->default(1);
            // options
            $table->foreignId('ReverseDeliveryOption')->references('id')->on('work_flows');
            $table->decimal('ReverseDeliveryPrice')->default(1);
            $table->decimal('DeclaredValue')->default(0);
            $table->boolean('ProofDistributedObject')->default(false);
            $table->boolean('Fragile')->default(false);
            $table->string('ApiKey')->nullable();

            // shipment provider config
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};