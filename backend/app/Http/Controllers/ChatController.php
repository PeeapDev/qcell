<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Events\NewChatMessage;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $chat = Chat::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        broadcast(new NewChatMessage($chat))->toOthers();

        return response()->json($chat, 201);
    }

    public function getMessages(Request $request)
    {
        $messages = Chat::where(function ($query) use ($request) {
            $query->where('sender_id', auth()->id())
                  ->where('receiver_id', $request->user_id);
        })->orWhere(function ($query) use ($request) {
            $query->where('sender_id', $request->user_id)
                  ->where('receiver_id', auth()->id());
        })->orderBy('created_at', 'asc')->get();

        return response()->json($messages);
    }
}
