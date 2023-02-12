<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShipmentProvider extends Model
{
    use HasFactory;
    protected $fillable = [
        'ShipmentProviderName',
        'ShipmentProviderAddress',
        'ShipmentProviderCity',
        'ShipmentProviderPhone',
        'Type',
        'Logo',
        'TemplateID',
        'AutoTN'
    ];
    public function owner()
    {
        return $this->belongsTo(User::class, 'CreatedBy')->select('id', 'UserName', 'ShipperPhone');
    }

    /**
     * Get the city that owns the ShipmentProvider
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class, 'ShipmentProviderCity');
    }
    public function hubtype(): BelongsTo
    {
        return $this->belongsTo(ShipmentProviderType::class, 'Type');
    }
    /**
     * Get the template that owns the ShipmentProvider
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class, 'TemplateID');
    }
}