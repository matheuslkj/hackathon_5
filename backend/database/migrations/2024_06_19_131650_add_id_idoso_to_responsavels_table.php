<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('responsavels', function (Blueprint $table) {
            $table->unsignedBigInteger('id_idoso');
            $table->foreign('id_idoso')->references('id')->on('idosos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('responsavels', function (Blueprint $table) {
            $table->dropForeign(['id_idoso']);
            $table->dropColumn('id_idoso');
        });
    }
};
