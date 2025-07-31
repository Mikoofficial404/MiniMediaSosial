<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class CommentsContoller extends Controller
{
    public function store(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $validate = Validator::make($request->all(), [
            'posts_id' => 'required',
            'content' => 'required|max:255|string'
        ]);

        if($validate->fails())
        {
            return response()->json([
                'messages' => $validate->errors(),
                'success' => false,
            ], 400);
        }

        $comment = Comment::create([
            'posts_id' => $request->posts_id,
            'user_id' => $user->id,
            'content' => $request->content,
        ]);

        return response()->json([
            'messages' => 'Comment Created',
            'success' => true,
            'data' => $comment,
        ]);
    }


    public function destroy($id)
    {
        $comment = Comment::find($id);

        $comment->delete();

        return response()->json([
            'message' => 'Comment Deleted',
            'succes' => true,
        ]);
    }
}
