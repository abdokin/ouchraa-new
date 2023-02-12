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
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->string('RouteName');
            $table->foreignId('FromHub')->references('id')->on('shipment_providers');
            $table->foreignId('ToHub')->references('id')->on('shipment_providers');
            $table->string('RouteProcesses');
            $table->foreignId('RouteWorkflow')->references('id')->on('work_flows');
            $table->foreignId('CreatedBy')->references('id')->on('users');
            $table->foreignId('UpdatedBy')->references('id')->on('users');
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
        Schema::dropIfExists('routes');
    }
};
