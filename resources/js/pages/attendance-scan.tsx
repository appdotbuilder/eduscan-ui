import React, { useState, useRef, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ScanResult {
    success: boolean;
    message: string;
    student?: {
        name: string;
        class: string;
        nisn: string;
    };
    status?: 'present' | 'late' | 'absent';
    scan_type?: 'scan_in' | 'scan_out';
    scan_time?: string;
    existing_time?: string;
    barcode?: string;
}

interface Props {
    scanResult?: ScanResult;
    [key: string]: unknown;
}

export default function AttendanceScan({ scanResult }: Props) {
    const [scanType, setScanType] = useState<'scan_in' | 'scan_out'>('scan_in');
    const [barcode, setBarcode] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Auto-focus the input field
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [scanResult]);

    const handleScan = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!barcode.trim()) {
            return;
        }

        setIsScanning(true);
        
        router.post('/attendance-scan', {
            barcode: barcode.trim(),
            scan_type: scanType,
        }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                setIsScanning(false);
                setBarcode('');
                // Re-focus input after scan
                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                }, 100);
            }
        });
    };

    const getStatusColor = (status?: string) => {
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

    const getScanTypeIcon = (scanType?: string) => {
        return scanType === 'scan_in' ? '🔄' : '🚪';
    };

    return (
        <AppShell>
            <Head title="Attendance Scan - EduScan" />
            
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">📱 Attendance Scan</h1>
                    <p className="text-gray-600 dark:text-gray-400">Scan student barcodes to record attendance</p>
                </div>

                {/* Scan Mode Toggle */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Select Scan Mode</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4 justify-center">
                            <Button
                                variant={scanType === 'scan_in' ? 'default' : 'outline'}
                                onClick={() => setScanType('scan_in')}
                                className="flex-1 max-w-xs"
                            >
                                🔄 Scan In
                            </Button>
                            <Button
                                variant={scanType === 'scan_out' ? 'default' : 'outline'}
                                onClick={() => setScanType('scan_out')}
                                className="flex-1 max-w-xs"
                            >
                                🚪 Scan Out
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Barcode Input */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            🎯 Ready to Scan
                        </CardTitle>
                        <CardDescription>
                            Enter or scan the student barcode below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleScan} className="space-y-4">
                            <div>
                                <Label htmlFor="barcode" className="text-base font-medium">
                                    Student Barcode
                                </Label>
                                <Input
                                    ref={inputRef}
                                    id="barcode"
                                    type="text"
                                    value={barcode}
                                    onChange={(e) => setBarcode(e.target.value)}
                                    placeholder="Scan or enter barcode..."
                                    className="text-lg h-12"
                                    disabled={isScanning}
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full h-12 text-lg"
                                disabled={isScanning || !barcode.trim()}
                            >
                                {isScanning ? (
                                    <>⏳ Processing...</>
                                ) : (
                                    <>
                                        {getScanTypeIcon(scanType)} 
                                        {scanType === 'scan_in' ? 'Record Entry' : 'Record Exit'}
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Scan Result */}
                {scanResult && (
                    <Card className={`border-2 ${
                        scanResult.success 
                            ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10' 
                            : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10'
                    }`}>
                        <CardHeader>
                            <CardTitle className={`flex items-center gap-2 ${
                                scanResult.success ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'
                            }`}>
                                {scanResult.success ? '✅ Scan Successful' : '❌ Scan Failed'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {scanResult.success && scanResult.student ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                    {scanResult.student.name}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {scanResult.student.class} • NISN: {scanResult.student.nisn}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                {scanResult.status && (
                                                    <Badge className={getStatusColor(scanResult.status)}>
                                                        {scanResult.status.toUpperCase()}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="flex items-center gap-1">
                                                {getScanTypeIcon(scanResult.scan_type)}
                                                {scanResult.scan_type?.replace('_', ' ').toUpperCase()}
                                            </span>
                                            <span className="font-mono text-lg">
                                                {scanResult.scan_time}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {scanResult.status === 'late' && (
                                        <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/10">
                                            <AlertDescription className="text-yellow-800 dark:text-yellow-300">
                                                ⏰ Student arrived late. Consider marking attendance accordingly.
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10">
                                        <AlertDescription className="text-red-800 dark:text-red-300">
                                            {scanResult.message}
                                        </AlertDescription>
                                    </Alert>
                                    
                                    {scanResult.student && scanResult.existing_time && (
                                        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                <strong>{scanResult.student.name}</strong> ({scanResult.student.class}) 
                                                already scanned at <strong>{scanResult.existing_time}</strong>
                                            </p>
                                        </div>
                                    )}
                                    
                                    {scanResult.barcode && (
                                        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                Barcode: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                                    {scanResult.barcode}
                                                </code>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Instructions */}
                <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                    <CardContent className="pt-6">
                        <div className="space-y-3">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                                💡 Scanning Tips
                            </h3>
                            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                <li>• The input field is auto-focused for quick scanning</li>
                                <li>• Switch between Scan In/Out modes as needed</li>
                                <li>• Students marked as "late" arrive after the configured threshold</li>
                                <li>• Duplicate scans are automatically detected and prevented</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}