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
        Schema::create('package_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('PackageID')->references('id')->on('packages');
            $table->string('TrackingNumber');
            $table->string('Reference');
            $table->string('ShippingFee');
            $table->string('ShipmentProviderID');
            $table->foreignId('WorkflowID')->references('id')->on('work_flows')->cascadeOnDelete();
            $table->foreignId('StatusID')->references('id')->on('statuses')->cascadeOnDelete();
            $table->foreignId('ActionID')->references('id')->on('actions')->cascadeOnDelete();
            $table->foreignId('UpdatedBy')->references('id')->on('users')->cascadeOnDelete();
            $table->foreignId('LocationID')->references('id')->on('cities')->cascadeOnDelete();
            $table->decimal('AmountToCollect')->default(0);
            $table->foreignId('DriverID')->nullable()->references('id')->on('users')->cascadeOnDelete();
            $table->bigInteger('DeliveryRun')->nullable();
            $table->decimal('Attempts')->nullable();
            $table->bigInteger('MasterBag')->nullable();
            $table->bigInteger('ReasonID')->nullable();
            $table->boolean('Scheduled')->default(true);
            $table->bigInteger('ReturnID')->nullable();
            $table->bigInteger('TransactionID')->nullable();
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
        Schema::dropIfExists('package_histories');
    }
};