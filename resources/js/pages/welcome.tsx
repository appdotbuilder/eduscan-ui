import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="EduScan - Barcode Student Attendance System" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">📊</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">EduScan</h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Attendance Made Simple</p>
                                </div>
                            </div>
                            
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="mb-8">
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-8">
                                📱 Mobile-First Design
                            </span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            📊 Student Attendance
                            <span className="block text-blue-600 dark:text-blue-400">Made Simple</span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                            EduScan revolutionizes student attendance tracking with barcode scanning technology. 
                            Perfect for middle and high schools seeking efficient, accurate attendance management.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                                        🚀 Go to Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('register')}>
                                        <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                                            🎯 Get Started Free
                                        </Button>
                                    </Link>
                                    <Link href={route('login')}>
                                        <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                                            👋 Sign In
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <span className="text-white text-2xl">📱</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Quick Barcode Scanning</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Lightning-fast barcode scanning with real-time feedback. Switch between scan-in and scan-out modes instantly.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <span className="text-white text-2xl">📈</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Smart Analytics</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Comprehensive attendance reports, trend analysis, and automated late detection based on class schedules.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <span className="text-white text-2xl">⚙️</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Easy Management</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Effortless student management, class scheduling, and school settings configuration in one clean interface.
                                </p>
                            </div>
                        </div>

                        {/* Feature Highlights */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">✨ Everything You Need</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl mb-3">🎯</div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Dashboard</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Live attendance stats and trend visualization</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-3">👥</div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Student Management</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Add, edit, and manage student records</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-3">📊</div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Detailed Reports</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Comprehensive attendance reporting</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-3">🌙</div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dark Mode</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Beautiful interface that works day and night</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center text-gray-600 dark:text-gray-400">
                            <p>© 2024 EduScan. Making school attendance management effortless.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}