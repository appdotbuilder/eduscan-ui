<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\AttendanceRecord
 *
 * @property int $id
 * @property int $student_id
 * @property string $attendance_date
 * @property string $scan_type
 * @property string $scan_time
 * @property string $status
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Student $student
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceRecord newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceRecord newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceRecord query()
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceRecord whereAttendanceDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceRecord whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceRecord whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceRecord whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceRecord whereScanTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceRecord whereScanType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceRecord whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceRecord whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceRecord whereUpdatedAt($value)
 * @method static \Database\Factories\AttendanceRecordFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class AttendanceRecord extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'attendance_date',
        'scan_type',
        'scan_time',
        'status',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'attendance_date' => 'date',
        'scan_time' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the student that owns the attendance record.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}