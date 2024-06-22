<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('responsavels', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('cpf', 11)->unique();
            $table->string('telefone');
            $table->string('endereco');
            $table->string('senha');
            $table->unsignedBigInteger('idoso_id');
            $table->timestamps();

            $table->foreign('idoso_id')->references('id')->on('idosos')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('responsavels');
    }
};
