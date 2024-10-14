<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'max_size',
        'current_size',
        'estimated_wait_time',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Relationship with users in the queue
    public function users()
    {
        return $this->belongsToMany(User::class, 'queue_user')
                    ->withPivot('position', 'joined_at')
                    ->withTimestamps();
    }
}
