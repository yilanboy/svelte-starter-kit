<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\InertiaAuthenticateMiddleware;
use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';

Route::get('/', [HomeController::class, 'index'])
    ->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard')
    ->middleware([InertiaAuthenticateMiddleware::class, 'verified']);

Route::get('/settings/profile', [ProfileController::class, 'edit'])
    ->name('settings.profile')
    ->middleware([InertiaAuthenticateMiddleware::class, 'verified']);

Route::get('/settings/password', [PasswordController::class, 'edit'])
    ->name('settings.password')
    ->middleware([InertiaAuthenticateMiddleware::class, 'verified']);
