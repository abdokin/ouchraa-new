<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\MorphPivot;

class UserRole extends MorphPivot
{
    protected $fillable = [
        'user_id', 'role_id',
    ];
}
