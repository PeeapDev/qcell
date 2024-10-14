<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class SMTPController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'host' => 'required|string',
            'port' => 'required|integer',
            'username' => 'required|string',
            'password' => 'required|string',
            'encryption' => 'required|string|in:tls,ssl',
            'from_address' => 'required|email',
            'from_name' => 'required|string',
        ]);

        Config::set('mail.mailers.smtp.host', $request->host);
        Config::set('mail.mailers.smtp.port', $request->port);
        Config::set('mail.mailers.smtp.username', $request->username);
        Config::set('mail.mailers.smtp.password', $request->password);
        Config::set('mail.mailers.smtp.encryption', $request->encryption);
        Config::set('mail.from.address', $request->from_address);
        Config::set('mail.from.name', $request->from_name);

        // You might want to save these to the database or .env file as well

        return response()->json(['message' => 'SMTP settings updated successfully']);
    }

    public function get()
    {
        return response()->json([
            'host' => Config::get('mail.mailers.smtp.host'),
            'port' => Config::get('mail.mailers.smtp.port'),
            'username' => Config::get('mail.mailers.smtp.username'),
            'password' => Config::get('mail.mailers.smtp.password'),
            'encryption' => Config::get('mail.mailers.smtp.encryption'),
            'from_address' => Config::get('mail.from.address'),
            'from_name' => Config::get('mail.from.name'),
        ]);
    }
}
