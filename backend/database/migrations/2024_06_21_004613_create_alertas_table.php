<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlertasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alertas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idoso_id')->constrained()->onDelete('cascade');
            $table->foreignId('vacina_id')->constrained()->onDelete('cascade');
            $table->dateTime('data_alvo');
            $table->boolean('lido')->default(false); // Para marcar se o alerta foi lido
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
        Schema::dropIfExists('alertas');
    }
}

