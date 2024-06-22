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
        Schema::table('idosos', function (Blueprint $table) {
            $table->dropColumn('senha'); // Remove a coluna password
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('idosos', function (Blueprint $table) {
            $table->string('password'); // Adiciona novamente a coluna password caso a migração seja revertida
        });
    }
};
