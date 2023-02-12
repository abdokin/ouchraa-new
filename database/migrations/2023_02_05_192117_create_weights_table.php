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
        Schema::create('weights', function (Blueprint $table) {
            $table->id();
            $table->decimal('WeightFrom');
            $table->decimal('WeightTo');
            $table->decimal('DoorDelivery');
            $table->decimal('FailedDelivery');
            $table->decimal('PickupStation');
            $table->decimal('CustomerReturn');
            $table->boolean('Status')->default(false);
            $table->string('Note')->nullable();
            $table->foreignId('UpdatedBy')->nullable()->references('id')->on('users');
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
        Schema::dropIfExists('weights');
    }
};
