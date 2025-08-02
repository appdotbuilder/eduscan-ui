<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClassSchedule>
 */
class ClassScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $classes = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C', '10A', '10B', '11A', '11B', '12A', '12B'];
        
        return [
            'class_name' => $this->faker->unique()->randomElement($classes),
            'entry_time' => '07:30:00',
            'exit_time' => '15:00:00',
            'late_threshold_minutes' => $this->faker->randomElement([10, 15, 20]),
            'is_active' => $this->faker->boolean(90), // 90% chance of being active
        ];
    }

    /**
     * Indicate that the schedule is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}