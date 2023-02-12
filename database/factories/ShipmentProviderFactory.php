<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\ShipmentProviderType;
use App\Models\Template;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShipmentProvider>
 */
class ShipmentProviderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'adress' => $this->faker->address(),
            'phone' => $this->faker->phoneNumber(),
            'city_id' => City::first()->id,
            'type' => ShipmentProviderType::first()->id,
            'template_id' =>Template::first()->id,
        ];
    }
}
