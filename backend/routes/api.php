<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\GenderController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// User routes
Route::apiResource('users', UserController::class);

// Region routes
Route::apiResource('regions', RegionController::class);

// Gender routes
Route::apiResource('genders', GenderController::class);
