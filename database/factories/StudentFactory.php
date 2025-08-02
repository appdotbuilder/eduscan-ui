<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nisn = $this->faker->unique()->numerify('##########');
        
        return [
            'nisn' => $nisn,
            'name' => $this->faker->name(),
            'class' => $this->faker->randomElement(['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C', '10A', '10B', '11A', '11B', '12A', '12B']),
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'parent_whatsapp' => $this->faker->optional(0.8)->numerify('+62##########'),
            'barcode' => 'EDU' . str_pad($nisn, 10, '0', STR_PAD_LEFT),
            'is_active' => $this->faker->boolean(95), // 95% chance of being active
        ];
    }

    /**
     * Indicate that the student is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}