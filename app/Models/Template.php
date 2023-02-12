<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Template extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'code',
        'type',
        'status'
    ];
    /**
     * Get the templateType that owns the Template
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function templateType(): BelongsTo
    {
        return $this->belongsTo(TemplateType::class, 'TemplateType');
    }
}