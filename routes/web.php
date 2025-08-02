<?php

use App\Http\Controllers\AttendanceScanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Attendance Scanning
    Route::get('/attendance-scan', [AttendanceScanController::class, 'index'])->name('attendance-scan.index');
    Route::post('/attendance-scan', [AttendanceScanController::class, 'store'])->name('attendance-scan.store');
    
    // Student Management
    Route::resource('students', StudentController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
