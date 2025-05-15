<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/login', [AuthenticatedSessionController::class, 'create'])
    ->name('login')
    ->middleware('guest');;

Route::post('login', [AuthenticatedSessionController::class, 'store'])
    ->name('login.store')
    ->middleware('guest');

Route::get('/register', [RegisterController::class, 'create'])
    ->name('register')
    ->middleware('guest');

Route::post('/register', [RegisterController::class, 'store'])
    ->name('register.store')
    ->middleware('guest');

Route::get('/email/verify', [VerifyEmailController::class, 'create'])
    ->middleware('auth')
    ->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, 'store'])
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');
