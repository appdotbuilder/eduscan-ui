<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AttendanceRecord;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $today = Carbon::today();
        
        // Get today's attendance statistics
        $todayStats = [
            'total' => Student::active()->count(),
            'present' => AttendanceRecord::whereDate('attendance_date', $today)
                ->where('status', 'present')
                ->distinct('student_id')
                ->count(),
            'absent' => 0, // Will be calculated
            'late' => AttendanceRecord::whereDate('attendance_date', $today)
                ->where('status', 'late')
                ->distinct('student_id')
                ->count(),
        ];
        
        $todayStats['absent'] = $todayStats['total'] - $todayStats['present'] - $todayStats['late'];
        
        // Get 7-day trend data
        $trendData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $presentCount = AttendanceRecord::whereDate('attendance_date', $date)
                ->whereIn('status', ['present', 'late'])
                ->distinct('student_id')
                ->count();
            
            $trendData[] = [
                'date' => $date->format('M d'),
                'present' => $presentCount,
            ];
        }
        
        // Get recent scan activities
        $recentScans = AttendanceRecord::with('student')
            ->whereDate('attendance_date', $today)
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function (AttendanceRecord $record) {
                return [
                    'id' => $record->id,
                    'student_name' => $record->student->name,
                    'student_class' => $record->student->class,
                    'status' => $record->status,
                    'scan_type' => $record->scan_type,
                    'scan_time' => Carbon::parse($record->scan_time)->format('H:i'),
                    'created_at' => $record->created_at->diffForHumans(),
                ];
            });
        
        return Inertia::render('dashboard', [
            'todayStats' => $todayStats,
            'trendData' => $trendData,
            'recentScans' => $recentScans,
        ]);
    }
}