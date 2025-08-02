import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Student {
    id: number;
    nisn: string;
    name: string;
    class: string;
    gender: 'Male' | 'Female';
    parent_whatsapp: string | null;
    barcode: string;
    is_active: boolean;
    created_at: string;
}

interface PaginatedStudents {
    data: Student[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Props {
    students: PaginatedStudents;
    classes: string[];
    filters: {
        class?: string;
        search?: string;
    };
    [key: string]: unknown;
}

export default function StudentsIndex({ students, classes, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedClass, setSelectedClass] = useState(filters.class || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        
        router.get('/students', {
            search: search || undefined,
            class: selectedClass || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (student: Student) => {
        if (confirm(`Are you sure you want to delete ${student.name}?`)) {
            router.delete(`/students/${student.id}`, {
                preserveScroll: true,
            });
        }
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedClass('');
        router.get('/students', {}, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppShell>
            <Head title="Students - EduScan" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">👥 Student Management</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage student records and attendance tracking
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/students/create">
                            <Button className="w-full sm:w-auto">
                                ➕ Add Student
                            </Button>
                        </Link>
                        <Button variant="outline" className="w-full sm:w-auto">
                            📄 Import CSV
                        </Button>
                        <Button variant="outline" className="w-full sm:w-auto">
                            📊 Export CSV
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{students.total}</p>
                                </div>
                                <div className="text-3xl">👥</div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        {students.data.filter(s => s.is_active).length}
                                    </p>
                                </div>
                                <div className="text-3xl">✅</div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Classes</p>
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{classes.length}</p>
                                </div>
                                <div className="text-3xl">🏫</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>🔍 Search & Filter</CardTitle>
                        <CardDescription>Find students by name, NISN, or filter by class</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Search by name or NISN..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <div className="w-full sm:w-48">
                                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Classes" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">All Classes</SelectItem>
                                            {classes.map((className) => (
                                                <SelectItem key={className} value={className}>
                                                    {className}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit">
                                    🔍 Search
                                </Button>
                                {(search || selectedClass) && (
                                    <Button type="button" variant="outline" onClick={clearFilters}>
                                        ✖️ Clear
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Students Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Students List</CardTitle>
                        <CardDescription>
                            Showing {students.from}-{students.to} of {students.total} students
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {students.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>NISN</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Class</TableHead>
                                            <TableHead>Gender</TableHead>
                                            <TableHead>WhatsApp</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {students.data.map((student) => (
                                            <TableRow key={student.id}>
                                                <TableCell className="font-mono text-sm">
                                                    {student.nisn}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {student.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {student.class}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm">
                                                        {student.gender === 'Male' ? '👨' : '👩'} {student.gender}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {student.parent_whatsapp ? (
                                                        <a 
                                                            href={`https://wa.me/${student.parent_whatsapp.replace(/\D/g, '')}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                                        >
                                                            📱 {student.parent_whatsapp}
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={
                                                        student.is_active 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                                                    }>
                                                        {student.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Link href={`/students/${student.id}`}>
                                                            <Button variant="ghost" size="sm">
                                                                👁️
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/students/${student.id}/edit`}>
                                                            <Button variant="ghost" size="sm">
                                                                ✏️
                                                            </Button>
                                                        </Link>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm"
                                                            onClick={() => alert(`Barcode: ${student.barcode}`)}
                                                        >
                                                            📊
                                                        </Button>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm"
                                                            onClick={() => handleDelete(student)}
                                                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            🗑️
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">👥</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    No students found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    {filters.search || filters.class 
                                        ? 'Try adjusting your search or filters'
                                        : 'Get started by adding your first student'
                                    }
                                </p>
                                <Link href="/students/create">
                                    <Button>
                                        ➕ Add First Student
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {students.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Page {students.current_page} of {students.last_page}
                        </div>
                        <div className="flex gap-2">
                            {students.current_page > 1 && (
                                <Button 
                                    variant="outline" 
                                    onClick={() => router.get(`/students?page=${students.current_page - 1}`)}
                                >
                                    ← Previous
                                </Button>
                            )}
                            {students.current_page < students.last_page && (
                                <Button 
                                    variant="outline"
                                    onClick={() => router.get(`/students?page=${students.current_page + 1}`)}
                                >
                                    Next →
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}