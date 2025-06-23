<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PasswordController extends Controller
{
    public function edit()
    {
        return Inertia::render('settings/password/Page', [
            'title' => 'Password settings',
        ]);
    }
}
