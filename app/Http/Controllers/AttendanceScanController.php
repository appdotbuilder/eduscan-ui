<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AttendanceRecord;
use App\Models\ClassSchedule;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceScanController extends Controller
{
    /**
     * Display the attendance scan page.
     */
    public function index()
    {
        return Inertia::render('attendance-scan');
    }
    
    /**
     * Process barcode scan.
     */
    public function store(Request $request)
    {
        $request->validate([
            'barcode' => 'required|string',
            'scan_type' => 'required|in:scan_in,scan_out',
        ]);
        
        // Find student by barcode
        $student = Student::active()->where('barcode', $request->barcode)->first();
        
        if (!$student) {
            return Inertia::render('attendance-scan', [
                'scanResult' => [
                    'success' => false,
                    'message' => 'Student not found or inactive',
                    'barcode' => $request->barcode,
                ]
            ]);
        }
        
        $today = Carbon::today();
        $now = Carbon::now();
        
        // Check if already scanned today for this type
        $existingRecord = AttendanceRecord::where('student_id', $student->id)
            ->where('attendance_date', $today)
            ->where('scan_type', $request->scan_type)
            ->first();
        
        if ($existingRecord) {
            return Inertia::render('attendance-scan', [
                'scanResult' => [
                    'success' => false,
                    'message' => 'Already scanned ' . str_replace('_', ' ', $request->scan_type) . ' today',
                    'student' => [
                        'name' => $student->name,
                        'class' => $student->class,
                        'nisn' => $student->nisn,
                    ],
                    'existing_time' => Carbon::parse($existingRecord->scan_time)->format('H:i'),
                ]
            ]);
        }
        
        // Determine status based on class schedule
        $status = 'present';
        if ($request->scan_type === 'scan_in') {
            $classSchedule = ClassSchedule::where('class_name', $student->class)
                ->active()
                ->first();
            
            if ($classSchedule) {
                $entryTime = Carbon::createFromFormat('H:i:s', $classSchedule->entry_time);
                $lateThreshold = $entryTime->addMinutes($classSchedule->late_threshold_minutes);
                
                if ($now->gt($lateThreshold)) {
                    $status = 'late';
                }
            }
        }
        
        // Create attendance record
        $attendanceRecord = AttendanceRecord::create([
            'student_id' => $student->id,
            'attendance_date' => $today,
            'scan_type' => $request->scan_type,
            'scan_time' => $now,
            'status' => $status,
        ]);
        
        return Inertia::render('attendance-scan', [
            'scanResult' => [
                'success' => true,
                'message' => 'Scan successful',
                'student' => [
                    'name' => $student->name,
                    'class' => $student->class,
                    'nisn' => $student->nisn,
                ],
                'status' => $status,
                'scan_type' => $request->scan_type,
                'scan_time' => $now->format('H:i'),
            ]
        ]);
    }
}