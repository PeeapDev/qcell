<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Broadcaster
    |--------------------------------------------------------------------------
    |
    | This option controls the default mechanism for broadcasting events to
    | other systems or services within your application. Supported: "pusher".
    |
    | Supported: "pusher", "log", "null"
    |
    */

    'default' => env('BROADCAST_DRIVER', 'null'),

    /*
    |--------------------------------------------------------------------------
    | Pusher Broadcaster
    |--------------------------------------------------------------------------
    |
    | If you are using the Pusher driver, you can specify the details
    | for your Pusher instance here. You should fill in your Pusher
    | application credentials and the cluster your application
    | is using.
    |
    | You should set the 'key', 'secret', and 'app_id' options according
    | to your Pusher instance. You can get your cluster from the
    | Pusher dashboard.
    |
    | For more information on the options for each driver, see
    | the full list of available options.
    |
    */

    'pusher' => [
        'driver' => 'pusher',
        'key' => env('PUSHER_APP_KEY'),
        'secret' => env('PUSHER_APP_SECRET'),
        'app_id' => env('PUSHER_APP_ID'),
        'options' => [
            'cluster' => env('PUSHER_APP_CLUSTER'),
            'useTLS' => true,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Log Broadcaster
    |--------------------------------------------------------------------------
    |
    | This option controls the default mechanism for broadcasting events
    | to other systems or services within your application. Supported:
    | "log".
    |
    | Supported: "log", "null"
    |
    */

    'log' => [
        'driver' => 'log',
    ],

    /*
    |--------------------------------------------------------------------------
    | Null Broadcaster
    |--------------------------------------------------------------------------
    |
    | This option controls the default mechanism for broadcasting events
    | to other systems or services within your application. Supported:
    | "null".
    |
    | Supported: "null"
    |
    */

    'null' => [
        'driver' => 'null',
    ],

];
