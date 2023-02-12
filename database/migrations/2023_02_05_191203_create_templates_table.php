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
        Schema::create('templates', function (Blueprint $table) {
            $table->id();
            $table->string('TemplateName');
            $table->text('TemplateCode');
            $table->foreignId('TemplateType')->references('id')->on('template_types');
            $table->foreignId('UpdatedBy')->nullable()->references('id')->on('users');
            $table->foreignId('CreatedBy')->nullable()->references('id')->on('users');
            $table->boolean('Status')->default(true);
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
        Schema::dropIfExists('templates');
    }
};
