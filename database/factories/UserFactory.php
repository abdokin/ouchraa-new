<?php

namespace Database\Factories;

use App\Models\ShipmentProvider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'UserName' => $this->faker->name(),
            'UserID' => $this->faker->uuid(),
            'ShipperAddress' => $this->faker->address(),
            'ShipperPhone' => $this->faker->phoneNumber(),
            'TrackingPrefix' => 'MC',
            'email' => $this->faker->unique()->safeEmail(),
            'cin' => $this->faker->text(6),
            'email_verified_at' => now(),
            'password' => $password = \Hash::make('password'),
            // password'
            'remember_token' => Str::random(10),
            'PickupDeliveryOption' => 1,
            'ReverseDeliveryOption' => 1,
            'ReverseDeliveryPrice' => 1,
            'CurrentShipmentProvider' => 1,
            'ShipperCity' => 1,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}