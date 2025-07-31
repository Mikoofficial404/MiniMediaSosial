<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class LikesController extends Controller
{
    public function store(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $validate = Validator::make($request->all(), [
            'posts_id' => 'required',
        ]);

            if($validate->fails())
        {
            return response()->json([
                'messages' => $validate->errors(),
                'success' => false,
            ], 400);
        }

        $like = Like::create([
            'posts_id' => $request->posts_id,
            'user_id' => $user->id,
        ]);

        return response()->json([
            'messages' => 'Berhasil Like',
            'success' => true,
            'data' => $like,
        ], 201);
    }

    public function destroy($id)
    {
        $like = Like::find($id);

        $like->delete();

        return response()->json([
            'messages' => 'Unlike',
            'success' => true,
        ]);
    }
}
