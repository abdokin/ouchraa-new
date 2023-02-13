<?php

namespace App\Rules;

use App\Models\TPLTrackingNumber;
use Illuminate\Contracts\Validation\Rule;

class UniqueTplTracking implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public $hub;
    public function __construct($hub)
    {
        $this->hub = $hub;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $track = TPLTrackingNumber::where('ShipmentProvider', $this->hub)->where('TrackingNumber', $value)->select('TrackingNumber')->get()->count();
        if ($track != 0) {
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The Tracking number must be unique for hub.';
    }
}