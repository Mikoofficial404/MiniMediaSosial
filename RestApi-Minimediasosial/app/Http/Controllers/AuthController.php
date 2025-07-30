<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'fullname' => 'required|string',
            'email' => 'required|email|string|max:255',
            'password' => 'required|string|min:6',
        ]);

        if($validate->fails())
        {
            return response()->json([
                'messages' => $validate->errors(),
                'success' => false,
            ]);
        }

        $user = User::create([
            'fullname' => $request->get('fullname'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password'))
        ]);
        // Jika Validasi Oke

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'messages' => 'Register User',
            'success' => true,
            'data' => $user,
            'token' => $token,
        ]);
    }

    public function login(Request $request)
    {

        //Cara 1

        // $crendentials = $request->only('email', 'password');

        // $token = JWTAuth::attempt($crendentials);

        // if(!$token){
        //     return response()->json([
        //         'error' => 'invalid crendtials'
        //     ], 401);
        // }

        // return response()->json([
        //     'messages' => 'Login Berhasil',
        //     'token' => $token,
        // ]);

        //Cara 2

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
                'success' => false,
            ], 422);
        }

        $credentials = $request->only('email', 'password');

        if (! $token = auth()->guard('api')->attempt($credentials)) {
            return response()->json([
                'message' => 'Maaf email atau Password Salah',
                'success' => false,
            ], 401);
        }

        return response()->json([
            'message' => 'Login Success',
            'success' => true,
            'token' => $token,
            'user' => auth()->guard('api')->user(),
        ], 200);

    }
}
