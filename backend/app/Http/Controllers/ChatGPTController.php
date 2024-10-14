<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Client;
use App\Models\Chat;
use App\Models\User;

class ChatGPTController extends Controller
{
    protected $client;

    public function __construct()
    {
        $this->client = \OpenAI::client(env('OPENAI_API_KEY'));
    }

    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'use_ai' => 'required|boolean',
        ]);

        if ($request->use_ai) {
            $response = $this->getAIResponse($request->message);
        } else {
            // Here you would implement logic to route the message to a human agent
            $response = "Message received. A human agent will respond shortly.";
        }

        $chat = Chat::create([
            'sender_id' => $request->user_id,
            'receiver_id' => $request->use_ai ? null : 1, // Assuming 1 is the ID for the AI or system
            'message' => $request->message,
            'is_ai_response' => $request->use_ai,
        ]);

        if ($request->use_ai) {
            Chat::create([
                'sender_id' => 1, // AI or system ID
                'receiver_id' => $request->user_id,
                'message' => $response,
                'is_ai_response' => true,
            ]);
        }

        return response()->json([
            'message' => $response,
            'is_ai_response' => $request->use_ai,
        ]);
    }

    private function getAIResponse($message)
    {
        $response = $this->client->chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => $this->getSystemPrompt()],
                ['role' => 'user', 'content' => $message],
            ],
        ]);

        return $response->choices[0]->message->content;
    }

    private function getSystemPrompt()
    {
        return "You are an AI assistant for a KYC (Know Your Customer) application.
                Provide helpful and accurate information about KYC processes,
                document requirements, and general customer support.
                If you're unsure about specific details, recommend the user
                to contact a human agent for more personalized assistance.";
    }
}
