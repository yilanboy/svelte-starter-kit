<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'index']);
Route::get('/about', function () {
    return inertia('About', [
        'title' => 'About',
    ]);
});
