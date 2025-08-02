<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendance_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->date('attendance_date');
            $table->enum('scan_type', ['scan_in', 'scan_out']);
            $table->time('scan_time');
            $table->enum('status', ['present', 'late', 'absent'])->default('present');
            $table->text('notes')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['student_id', 'attendance_date']);
            $table->index('attendance_date');
            $table->index('scan_type');
            $table->index('status');
            $table->index(['attendance_date', 'status']);
            
            // Unique constraint to prevent duplicate scans
            $table->unique(['student_id', 'attendance_date', 'scan_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_records');
    }
};