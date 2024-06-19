<?php

use App\Http\Controllers\ResponsavelController;
use App\Http\Controllers\api\v1\VacinaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix' => 'v1'], function(){
    Route::apiResource('responsaveis', ResponsavelController::class);
});

Route::group(['prefix' => 'v1'], function(){
    Route::apiResource('vacinas', VacinaController::class);
});
