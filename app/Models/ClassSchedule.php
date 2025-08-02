<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ClassSchedule
 *
 * @property int $id
 * @property string $class_name
 * @property string $entry_time
 * @property string $exit_time
 * @property int $late_threshold_minutes
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ClassSchedule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClassSchedule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClassSchedule query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClassSchedule whereClassName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassSchedule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassSchedule whereEntryTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassSchedule whereExitTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassSchedule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassSchedule whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassSchedule whereLateThresholdMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassSchedule whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassSchedule active()
 * @method static \Database\Factories\ClassScheduleFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ClassSchedule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'class_name',
        'entry_time',
        'exit_time',
        'late_threshold_minutes',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'late_threshold_minutes' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active schedules.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}