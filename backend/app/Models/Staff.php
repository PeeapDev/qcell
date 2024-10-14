<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Staff extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'position', 'department'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
}
