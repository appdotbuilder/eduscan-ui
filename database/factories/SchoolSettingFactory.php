<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SchoolSetting>
 */
class SchoolSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'school_name' => 'EduScan Demo School',
            'address' => $this->faker->address(),
            'principal' => $this->faker->name(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->companyEmail(),
            'website' => 'https://eduscan-demo.edu',
            'logo_path' => null,
            'default_entry_time' => '07:30:00',
            'default_exit_time' => '15:00:00',
            'default_late_threshold_minutes' => 15,
        ];
    }
}