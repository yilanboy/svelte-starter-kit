<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class VerifyEmailController extends Controller
{
    public function show(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->back();
        }

        return Inertia::render('verify/email/Page');
    }

    public function create(Request $request): RedirectResponse|Response
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->back();
        }

        $request->user()->sendEmailVerificationNotification();

        Session::flash('status', 'verification-link-sent');

        return Inertia::render('verify/email/Page');
    }

    public function store(EmailVerificationRequest $request): RedirectResponse
    {
        $request->fulfill();

        return to_route('dashboard');
    }
}
