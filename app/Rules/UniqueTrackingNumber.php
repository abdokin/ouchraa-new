<?php

namespace App\Rules;

use App\Models\Package;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class UniqueTrackingNumber implements Rule
{
    public $user;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
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
        $Reference = Package::where('ShipperID', $this->user->id)->where('TrackingNumber', $value)->select('TrackingNumber')->first();
        if (is_null($Reference)) {
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
        return 'The Tracking number must be unique.';
    }
}