<?php

namespace Database\Factories;

use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AttendanceRecord>
 */
class AttendanceRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $attendanceDate = $this->faker->dateTimeBetween('-30 days', 'now');
        $scanType = $this->faker->randomElement(['scan_in', 'scan_out']);
        
        // Generate realistic scan times
        if ($scanType === 'scan_in') {
            $scanTime = Carbon::instance($attendanceDate)->setTime(
                random_int(6, 9), // 6-9 AM
                random_int(0, 59)
            );
        } else {
            $scanTime = Carbon::instance($attendanceDate)->setTime(
                random_int(14, 17), // 2-5 PM
                random_int(0, 59)
            );
        }
        
        // Determine status based on scan time (for scan_in)
        $status = 'present';
        if ($scanType === 'scan_in' && $scanTime->hour >= 8) {
            $status = $this->faker->randomElement(['present', 'late']); // Mix of present and late
        }
        
        return [
            'student_id' => Student::factory(),
            'attendance_date' => $attendanceDate->format('Y-m-d'),
            'scan_type' => $scanType,
            'scan_time' => $scanTime,
            'status' => $status,
            'notes' => $this->faker->optional(0.1)->sentence(), // 10% chance of notes
        ];
    }

    /**
     * Indicate that the attendance is late.
     */
    public function late(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'late',
        ]);
    }

    /**
     * Indicate that this is a scan-in record.
     */
    public function scanIn(): static
    {
        return $this->state(fn (array $attributes) => [
            'scan_type' => 'scan_in',
        ]);
    }

    /**
     * Indicate that this is a scan-out record.
     */
    public function scanOut(): static
    {
        return $this->state(fn (array $attributes) => [
            'scan_type' => 'scan_out',
        ]);
    }
}