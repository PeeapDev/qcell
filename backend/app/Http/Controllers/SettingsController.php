<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;

class SettingsController extends Controller
{
    public function getSettings()
    {
        $settings = Cache::remember('app_settings', 3600, function () {
            return [
                'logo' => $this->getLogoUrl(),
                'title' => config('app.name'),
                'timeFormat' => config('app.time_format', '24'),
                'googleMapsApiKey' => config('services.google.maps_api_key'),
                'footerText' => config('app.footer_text', 'All rights reserved'),
                'googleAnalytics' => config('services.google.analytics_id'),
                'timezone' => config('app.timezone'),
                'dateFormat' => config('app.date_format', 'Y-m-d'),
                'emailConfirmation' => config('auth.email_confirmation', true),
                'recaptchaSiteKey' => config('services.recaptcha.site_key'),
                'recaptchaSecretKey' => config('services.recaptcha.secret_key'),
            ];
        });

        return response()->json($settings);
    }

    public function updateSettings(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'timeFormat' => 'sometimes|in:12,24',
            'googleMapsApiKey' => 'sometimes|string',
            'footerText' => 'sometimes|string',
            'googleAnalytics' => 'sometimes|string',
            'timezone' => 'sometimes|string',
            'dateFormat' => 'sometimes|string',
            'emailConfirmation' => 'sometimes|boolean',
            'recaptchaSiteKey' => 'sometimes|string',
            'recaptchaSecretKey' => 'sometimes|string',
        ]);

        foreach ($validatedData as $key => $value) {
            $this->updateConfig($key, $value);
        }

        if ($request->hasFile('logo')) {
            $this->updateLogo($request->file('logo'));
        }

        Cache::forget('app_settings');

        return response()->json(['message' => 'Settings updated successfully']);
    }

    private function updateConfig($key, $value)
    {
        $configKey = $this->getConfigKey($key);
        if ($configKey) {
            config([$configKey => $value]);
            // You might want to update the .env file here for persistence
            // Be cautious with this approach in production
        }
    }

    private function getConfigKey($key)
    {
        $configMap = [
            'title' => 'app.name',
            'timeFormat' => 'app.time_format',
            'googleMapsApiKey' => 'services.google.maps_api_key',
            'footerText' => 'app.footer_text',
            'googleAnalytics' => 'services.google.analytics_id',
            'timezone' => 'app.timezone',
            'dateFormat' => 'app.date_format',
            'emailConfirmation' => 'auth.email_confirmation',
            'recaptchaSiteKey' => 'services.recaptcha.site_key',
            'recaptchaSecretKey' => 'services.recaptcha.secret_key',
        ];

        return $configMap[$key] ?? null;
    }

    private function updateLogo($file)
    {
        $path = $file->store('public/logos');
        $this->updateConfig('logo', Storage::url($path));
    }

    private function getLogoUrl()
    {
        $logoPath = config('app.logo');
        return $logoPath ? Storage::url($logoPath) : null;
    }

    public function updateEmailConfirmation(Request $request)
    {
        $request->validate([
            'emailConfirmation' => 'required|boolean',
        ]);

        Config::set('auth.email_confirmation', $request->emailConfirmation);

        // In a production environment, you'd want to persist this setting
        // to a database or update the .env file

        Cache::forget('app_settings');

        return response()->json(['message' => 'Email confirmation setting updated successfully']);
    }
}
