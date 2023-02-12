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
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('code_postal');
            $table->string('code_pays');
            $table->string('localite');
            $table->string('province');
            $table->string('region_postal');
            $table->boolean('status')->default(false);
            $table->foreignId('LastMileHub')->nullable()->references('id')->on('shipment_providers');
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
        Schema::dropIfExists('cities');
    }
};