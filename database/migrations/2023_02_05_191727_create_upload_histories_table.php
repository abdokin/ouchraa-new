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
        Schema::create('upload_histories', function (Blueprint $table) {
            $table->id();
            $table->string('UploadID')->unique();
            $table->unsignedBigInteger('TotalPackage');
            $table->unsignedBigInteger('PackageSuccess');
            $table->unsignedBigInteger('PackageFailure');
            $table->foreignId('CreatedBy')->references('id')->on('users')->cascadeOnDelete();
            $table->boolean('Status');
            $table->foreignId('StatusID')->references('id')->on('statuses')->cascadeOnDelete();
            $table->foreignId('ShipmentProviderId')->references('id')->on('shipment_providers');
            $table->string('LogFile');
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
        Schema::dropIfExists('upload_histories');
    }
};