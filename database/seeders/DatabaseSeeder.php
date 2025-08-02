<?php

namespace Database\Seeders;

use App\Models\AttendanceRecord;
use App\Models\ClassSchedule;
use App\Models\SchoolSetting;
use App\Models\Student;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        User::factory()->create([
            'name' => 'EduScan Admin',
            'email' => 'admin@eduscan.demo',
        ]);

        // Create school settings
        SchoolSetting::factory()->create();

        // Create class schedules
        $classes = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C', '10A', '10B', '11A', '11B', '12A', '12B'];
        foreach ($classes as $className) {
            ClassSchedule::factory()->create([
                'class_name' => $className,
            ]);
        }

        // Create students
        $students = Student::factory(50)->create();

        // Create attendance records for the last 7 days
        $students->each(function ($student) {
            for ($i = 6; $i >= 0; $i--) {
                $date = Carbon::today()->subDays($i);
                
                // 85% chance of having attendance record
                if (random_int(1, 100) <= 85) {
                    // Scan in record
                    AttendanceRecord::factory()->create([
                        'student_id' => $student->id,
                        'attendance_date' => $date,
                        'scan_type' => 'scan_in',
                        'scan_time' => $date->copy()->setTime(
                            random_int(7, 8), // 7-8 AM
                            random_int(0, 59)
                        ),
                        'status' => random_int(1, 100) <= 20 ? 'late' : 'present', // 20% chance of being late
                    ]);
                    
                    // 90% chance of having scan out record if scanned in
                    if (random_int(1, 100) <= 90) {
                        AttendanceRecord::factory()->create([
                            'student_id' => $student->id,
                            'attendance_date' => $date,
                            'scan_type' => 'scan_out',
                            'scan_time' => $date->copy()->setTime(
                                random_int(14, 16), // 2-4 PM
                                random_int(0, 59)
                            ),
                            'status' => 'present',
                        ]);
                    }
                }
            }
        });
    }
}
