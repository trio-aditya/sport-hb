<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Register
    public function register(Request $request)
    {
        // Validasi data
        $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ];

        $validator = Validator::make($request->all(), $rules);

        // cek validasi
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed.',
                'data' => $validator->errors()
            ], 401);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Registration successful.',
            'token' => $token,
            'user' => $user
        ], 200);
    }

    // Login
    public function login(Request $request)
    {
        $rules = [
            'email' => 'required|email',
            'password' => 'required'
        ];

        $validator = Validator::make($request->all(), $rules);

        // cek validasi
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Login failed.',
                'data' => $validator->errors()
            ], 401);
        }

        // cek email dan password dalam database
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid email or password'
            ], 401);
        }

        //jika email dan password valid
        $data = User::where('email', $request->email)->first();

        return response()->json([
            'status' => true,
            'message' => 'Login process completed successfully.',
            'token' => $data->createToken('auth_token')->plainTextToken,
            'user' => [
                'name' => $data->name,
                'email' => $data->email
            ]
        ], 200);
    }

    //Logout
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Logout completed.'
        ], 200);
    }

    // Profile
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }
}
