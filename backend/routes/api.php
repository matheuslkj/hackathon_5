<?php

use App\Http\Controllers\api\v1\AgendamentoController;
use App\Http\Controllers\Api\v1\ResponsavelController;
use App\Http\Controllers\Api\v1\IdosoController;
use App\Http\Controllers\api\v1\ProfissionalSaudeController;
use App\Http\Controllers\api\v1\VacinaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix' => 'v1'], function(){
    Route::apiResource('responsavels', ResponsavelController::class);
    Route::apiResource('idosos', IdosoController::class);
    Route::apiResource('vacinas', VacinaController::class);
    Route::apiResource('profissionais', ProfissionalSaudeController::class);
    Route::apiResource('agendamentos', AgendamentoController::class);
});