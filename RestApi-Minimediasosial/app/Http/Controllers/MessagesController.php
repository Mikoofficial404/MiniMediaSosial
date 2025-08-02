<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class MessagesController extends Controller
{
    public function store(Request $request)
    {

        $user = JWTAuth::parseToken()->authenticate();
        $validate = Validator::make($request->all(), [
            'reciver_id' => 'required',
            'messages_content' => 'required',
        ]);

        if($validate->fails())
        {
            return response()->json([
                'messages' => $validate->errors(),
                'success' => false,
            ]);
        }

        $messages = Message::create([
            'sender_id' => $user->id,
            'reciver_id' => $request->reciver_id,
            'messages_content' => $request->messages_content,
        ]);

        return response()->json([
            'messages' => 'Pesan Terkirim',
            'success' => true,
            'data' => $messages,
        ]);
    }

    public function show($id)
    {
         $user = JWTAuth::parseToken()->authenticate();
        $message = Message::find($id);

        return response()->json([
            'messages' => 'Get Messages',
            'success' => true,
            'data' => $message,
        ]);
    }

    public function getMessage(int $user_id)
    {
         $user = JWTAuth::parseToken()->authenticate();
        $message = Message::where('reciver_id', $user_id)->get();

        return response()->json([
            'messages' => 'Berhasil mengambil pesan-pesan berdasarkan user',
            'success' => true,
            'data' => $message,
        ]);
    }

    public function destroy($id)
    {
         $user = JWTAuth::parseToken()->authenticate();
        $message = Message::find($id);

        $message->delete();

        return response()->json([
            'messages' => 'deleted Messages',
            'success' => true,
        ]);
    }
}
