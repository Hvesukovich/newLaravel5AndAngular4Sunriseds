<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTechnologiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('technologies', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('ico')->nullable();
            $table->string('color')->default('#000000')->nullable();
            $table->text('img')->nullable();
            $table->boolean('ico_or_img')->default(true)->nullable()->comment('ico - false, img - true');
            $table->boolean('display')->default(false)->nullable()->comment('visibility of technology in projects');
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
        Schema::dropIfExists('technologies');
    }
}
