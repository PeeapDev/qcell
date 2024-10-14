<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class TwilioController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'account_sid' => 'required|string',
            'auth_token' => 'required|string',
            'phone_number' => 'required|string',
        ]);

        Config::set('services.twilio.sid', $request->account_sid);
        Config::set('services.twilio.token', $request->auth_token);
        Config::set('services.twilio.from', $request->phone_number);

        // You might want to save these to the database or .env file as well

        return response()->json(['message' => 'Twilio settings updated successfully']);
    }

    public function get()
    {
        return response()->json([
            'account_sid' => Config::get('services.twilio.sid'),
            'auth_token' => Config::get('services.twilio.token'),
            'phone_number' => Config::get('services.twilio.from'),
        ]);
    }
}
