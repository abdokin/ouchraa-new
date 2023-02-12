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
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('PackageID')->unique();
            $table->string('TrackingNumber');
            $table->string('Reference');
            $table->string('ShipperPhone');
            $table->string('ShipperName');
            $table->string('ShipperAddress');
            $table->string('ShipperEmail')->nullable();
            $table->string('ShipperCin')->nullable();
            $table->foreignId('ShipperCity')->references('id')->on('cities')->onDelete('cascade');
            $table->string('CustomerPhone');
            $table->string('CustomerEmail')->nullable();
            $table->string('CustomerName');
            $table->string('CustomerAddress');
            $table->foreignId('CustomerCity')->references('id')->on('cities')->onDelete('cascade');
            $table->string('CustomerCin')->nullable();
            $table->float('Latitude')->nullable();
            $table->float('Longitude')->nullable();
            $table->string('ProductDescription')->nullable();
            $table->decimal('Amount')->default(0);
            $table->foreignId('ShipperID')->nullable()->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('CreatedBy')->nullable()->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('FistMileHub')->references('id')->on('shipment_providers')->cascadeOnDelete();
            $table->foreignId('LastMileHub')->references('id')->on('shipment_providers')->cascadeOnDelete();
            // UploadID
            $table->string('UploadID')->nullable();

            $table->decimal('Weight')->default(0);
            $table->decimal('ShippingFee')->default(0);
            $table->decimal('DeclaredValue')->default(0);
            $table->boolean('ProofDistributedObject')->default(false);
            $table->boolean('Fragile')->default(false);
            $table->boolean('CheckPackage')->default(false);
            $table->boolean('Printed')->default(false);
            $table->foreignId('ShipmentProviderID')->references('id')->on('shipment_providers')->cascadeOnDelete();
            $table->foreignId('WorkflowID')->references('id')->on('work_flows')->cascadeOnDelete();
            $table->foreignId('StatusID')->references('id')->on('statuses')->cascadeOnDelete();
            $table->foreignId('ActionID')->references('id')->on('actions')->cascadeOnDelete();
            $table->foreignId('UpdatedBy')->nullable()->references('id')->on('users');
            $table->decimal('AmountToCollect')->default(0);
            $table->string('DeliveryRun')->nullable()->references('id')->on('delivery_runs');
            $table->decimal('Attempts')->default(0);
            $table->foreignId('DriverID')->nullable()->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('MasterBag')->nullable();
            // ->references('id')->on('master_bags')
            $table->foreignId('LocationID')->references('id')->on('cities')->cascadeOnDelete();
            $table->foreignId('ReasonID')->nullable()->references('id')->on('reasons');
            $table->boolean('Scheduled')->default(false);
            $table->bigInteger('ReturnID')->nullable();
            // ->references('id')->on('package_returns')->cascadeOnDelete();
            $table->bigInteger('TransactionID')->nullable()->references('id')->on('transactions')->cascadeOnDelete();
            $table->string('tracking_number_prefix')->default('MC');
            $table->foreignId('ShippingMethod')->references('id')->on('work_flows')->cascadeOnDelete();
            $table->decimal('perCoast')->default(0);
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
        Schema::dropIfExists('packages');
    }
};