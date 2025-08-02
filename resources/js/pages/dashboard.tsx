import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AttendanceStats {
    total: number;
    present: number;
    absent: number;
    late: number;
}

interface TrendData {
    date: string;
    present: number;
}

interface RecentScan {
    id: number;
    student_name: string;
    student_class: string;
    status: 'present' | 'late' | 'absent';
    scan_type: 'scan_in' | 'scan_out';
    scan_time: string;
    created_at: string;
}

interface Props {
    todayStats: AttendanceStats;
    trendData: TrendData[];
    recentScans: RecentScan[];
    [key: string]: unknown;
}

export default function Dashboard({ todayStats, trendData, recentScans }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'present':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'late':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'absent':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    const getScanTypeIcon = (scanType: string) => {
        return scanType === 'scan_in' ? '🔄' : '🚪';
    };

    return (
        <AppShell>
            <Head title="Dashboard - EduScan" />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📊 Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Today's attendance overview and recent activity</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/attendance-scan">
                            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                                📱 Scan Now
                            </Button>
                        </Link>
                        <Link href="/students/create">
                            <Button variant="outline" className="w-full sm:w-auto">
                                👥 Add Student
                            </Button>
                        </Link>
                        <Link href="/reports">
                            <Button variant="outline" className="w-full sm:w-auto">
                                📈 View Report
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">Total Students</CardTitle>
                            <div className="text-2xl">👥</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{todayStats.total}</div>
                            <p className="text-xs text-blue-700 dark:text-blue-400">Registered students</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">Present</CardTitle>
                            <div className="text-2xl">✅</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{todayStats.present}</div>
                            <p className="text-xs text-green-700 dark:text-green-400">Students present today</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Late</CardTitle>
                            <div className="text-2xl">⏰</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{todayStats.late}</div>
                            <p className="text-xs text-yellow-700 dark:text-yellow-400">Students late today</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-red-800 dark:text-red-300">Absent</CardTitle>
                            <div className="text-2xl">❌</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-900 dark:text-red-100">{todayStats.absent}</div>
                            <p className="text-xs text-red-700 dark:text-red-400">Students absent today</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Trend Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📈 7-Day Attendance Trend
                            </CardTitle>
                            <CardDescription>
                                Daily attendance for the past week
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {trendData.map((day, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-16">
                                            {day.date}
                                        </span>
                                        <div className="flex-1 mx-4">
                                            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div 
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ 
                                                        width: `${todayStats.total > 0 ? (day.present / todayStats.total) * 100 : 0}%` 
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-8 text-right">
                                            {day.present}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Scans */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🕒 Recent Scan Activity
                            </CardTitle>
                            <CardDescription>
                                Latest attendance scans from today
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentScans.length > 0 ? (
                                    recentScans.map((scan) => (
                                        <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="text-xl">
                                                    {getScanTypeIcon(scan.scan_type)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-gray-100">
                                                        {scan.student_name}
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        {scan.student_class} • {scan.scan_time}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className={getStatusColor(scan.status)}>
                                                    {scan.status}
                                                </Badge>
                                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                                    {scan.created_at}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                        <div className="text-4xl mb-2">📱</div>
                                        <p>No scans yet today</p>
                                        <p className="text-sm">Start scanning to see activity here</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}