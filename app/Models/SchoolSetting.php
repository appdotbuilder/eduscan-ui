<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SchoolSetting
 *
 * @property int $id
 * @property string $school_name
 * @property string $address
 * @property string|null $principal
 * @property string|null $phone
 * @property string|null $email
 * @property string|null $website
 * @property string|null $logo_path
 * @property string $default_entry_time
 * @property string $default_exit_time
 * @property int $default_late_threshold_minutes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting whereDefaultEntryTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting whereDefaultExitTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting whereDefaultLateThresholdMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting whereLogoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting wherePrincipal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting whereSchoolName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolSetting whereWebsite($value)
 * @method static \Database\Factories\SchoolSettingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class SchoolSetting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'school_name',
        'address',
        'principal',
        'phone',
        'email',
        'website',
        'logo_path',
        'default_entry_time',
        'default_exit_time',
        'default_late_threshold_minutes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'default_late_threshold_minutes' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}