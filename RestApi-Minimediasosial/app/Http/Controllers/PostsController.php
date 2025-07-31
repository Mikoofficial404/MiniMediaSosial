<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class PostsController extends Controller
{
    public function index()
    {
        $posts = Post::with(['user', 'comments', 'likes'])->get();

        return response()->json([
            'success' => true,
            'data' => $posts,
        ]);
    }

    public function store(Request $request)
{
    $user = JWTAuth::parseToken()->authenticate();
    $validate = Validator::make($request->all(), [
        'content' => 'required|string|max:255',
        'image_path' => 'nullable|image|mimes:jpg,jpeg,png,svg|max:2048', // ini 'image_path'
    ]);

    if($validate->fails())
    {
        return response()->json([
            'success' => false,
            'messages' => $validate->errors(),
        ], 400);
    }

    $imagePath = null;

    if ($request->hasFile('image_path')) {
        $file = $request->file('image_path');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('uploads/images'), $filename);
        $imagePath = 'uploads/images/' . $filename;
    }else {
        $imagePath = null;
    }

    $posts = Post::create([
        'user_id' => $user->id,
        'content' => $request->content,
        'image_path' => $imagePath,
    ]);

    return response()->json([
        'success' => true,
        'messages' => 'Posts Created',
        'data' => $posts,
    ], 201);
}


    public function show($id)
    {
        $post = Post::find($id);

        if(!$post){
            return response()->json([
                'messages' => 'Product Not Found',
                'succes' => false,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get Posts',
            'data' => $post
        ]);
    }

    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(),[
            'content' => 'required|string|max:255',
            'image_url' => 'nullable',
        ]);

        if($validate->fails()){
            return response()->json([
                'success' => false,
                'messages' => $validate->errors(),
            ]);
        }

        //tampung data baru
        $post = Post::find($id);
        $post->content = $request->content;
        $post->image_url = $request->image_url;

        $post->save();

        return response()->json([
            'messages' => 'Post Updated',
            'succes' => true,
            'data' => $post,
        ]);
    }

    public function destroy(int $id)
    {
       $user = JWTAuth::parseToken()->authenticate();
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Post not found',
                'success' => false,
            ], 404);
        }


        if ($post->user_id !== $user->id) {
            return response()->json([
                'message' => 'Unauthorized: You can only delete your own posts',
                'success' => false,
            ], 403);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post Deleted',
            'success' => true,
        ]);
    }
}
