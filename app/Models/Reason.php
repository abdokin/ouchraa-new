<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reason extends Model
{
    use HasFactory;
    protected $casts = [
        'Workflow' => 'array'
    ];
    // /**
    //  * Get the workFlow that owns the Reason
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    //  */
    // public function workFlow($id)
    // {
        
    //     // return Reason::where('WorkFlow;
    // }
}