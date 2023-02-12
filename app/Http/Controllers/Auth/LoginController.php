<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function create() {
        return inertia('Auth/Login');
    }

    public function store(Request $request) {
        $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);
        $credentials = [
            'username' => $request['email'],
            'password' => $request['password'],
        ];
        // dd($request->only('email', 'password'));
        $user = User::where('email', $request['email'])->first();
        if(!$user || !Hash::check($request['password'], $user->password)){
            throw ValidationException::withMessages([
                'email' => 'The provide credentials does not match our record.',
            ]);
        }
        if( Auth::login($user, true)) {
            session()->regenerate();
            return redirect('/dashboard')->with([
                'type' => 'success',
                'message' => 'You are logged in.'
            ]);
        }

        throw ValidationException::withMessages([
            'email' => 'The provide credentials does not match our record.',
        ]);
    }

    public function destroy() {
        Auth::logout();

        return redirect('/login')->with([
            'type' => 'success', 'message' => 'You are now logout.',
        ]);
    }
}
