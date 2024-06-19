<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVacinasTable extends Migration
{
    public function up()
    {
        Schema::create('vacinas', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->text('descricao');
            $table->integer('doses_necessarias');
            $table->datetime('data_campanha');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('vacinas');
    }

}
