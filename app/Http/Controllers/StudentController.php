<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of students.
     */
    public function index(Request $request)
    {
        $query = Student::query();
        
        // Apply filters
        if ($request->filled('class')) {
            $query->where('class', $request->class);
        }
        
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('nisn', 'LIKE', "%{$search}%");
            });
        }
        
        $students = $query->orderBy('class')
            ->orderBy('name')
            ->paginate(20)
            ->withQueryString();
        
        // Get unique classes for filter dropdown
        $classes = Student::distinct()
            ->pluck('class')
            ->sort()
            ->values();
        
        return Inertia::render('students/index', [
            'students' => $students,
            'classes' => $classes,
            'filters' => $request->only(['class', 'search']),
        ]);
    }
    
    /**
     * Show the form for creating a new student.
     */
    public function create()
    {
        return Inertia::render('students/create');
    }
    
    /**
     * Store a newly created student.
     */
    public function store(StoreStudentRequest $request)
    {
        $student = Student::create($request->validated());
        
        return redirect()->route('students.index')
            ->with('success', 'Student created successfully.');
    }
    
    /**
     * Display the specified student.
     */
    public function show(Student $student)
    {
        $student->load('attendanceRecords');
        
        return Inertia::render('students/show', [
            'student' => $student,
        ]);
    }
    
    /**
     * Show the form for editing the specified student.
     */
    public function edit(Student $student)
    {
        return Inertia::render('students/edit', [
            'student' => $student,
        ]);
    }
    
    /**
     * Update the specified student.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());
        
        return redirect()->route('students.index')
            ->with('success', 'Student updated successfully.');
    }
    
    /**
     * Remove the specified student.
     */
    public function destroy(Student $student)
    {
        $student->delete();
        
        return redirect()->route('students.index')
            ->with('success', 'Student deleted successfully.');
    }
}