import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export default function CreateStudent({ errors = {} }: Props) {
    const [formData, setFormData] = useState({
        nisn: '',
        name: '',
        class: '',
        gender: '',
        parent_whatsapp: '',
        is_active: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post('/students', formData, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <AppShell>
            <Head title="Add Student - EduScan" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">➕ Add New Student</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Create a new student record for attendance tracking
                    </p>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Student Information</CardTitle>
                        <CardDescription>
                            Fill in the student's details below. All fields marked with * are required.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* NISN */}
                                <div className="space-y-2">
                                    <Label htmlFor="nisn">NISN *</Label>
                                    <Input
                                        id="nisn"
                                        type="text"
                                        value={formData.nisn}
                                        onChange={(e) => handleChange('nisn', e.target.value)}
                                        placeholder="Enter NISN"
                                        className={errors.nisn ? 'border-red-500' : ''}
                                    />
                                    {errors.nisn && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.nisn}</p>
                                    )}
                                </div>

                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        placeholder="Enter full name"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                    )}
                                </div>

                                {/* Class */}
                                <div className="space-y-2">
                                    <Label htmlFor="class">Class *</Label>
                                    <Select value={formData.class} onValueChange={(value) => handleChange('class', value)}>
                                        <SelectTrigger className={errors.class ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="7A">7A</SelectItem>
                                            <SelectItem value="7B">7B</SelectItem>
                                            <SelectItem value="7C">7C</SelectItem>
                                            <SelectItem value="8A">8A</SelectItem>
                                            <SelectItem value="8B">8B</SelectItem>
                                            <SelectItem value="8C">8C</SelectItem>
                                            <SelectItem value="9A">9A</SelectItem>
                                            <SelectItem value="9B">9B</SelectItem>
                                            <SelectItem value="9C">9C</SelectItem>
                                            <SelectItem value="10A">10A</SelectItem>
                                            <SelectItem value="10B">10B</SelectItem>
                                            <SelectItem value="11A">11A</SelectItem>
                                            <SelectItem value="11B">11B</SelectItem>
                                            <SelectItem value="12A">12A</SelectItem>
                                            <SelectItem value="12B">12B</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.class && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.class}</p>
                                    )}
                                </div>

                                {/* Gender */}
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender *</Label>
                                    <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                                        <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">👨 Male</SelectItem>
                                            <SelectItem value="Female">👩 Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.gender && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.gender}</p>
                                    )}
                                </div>
                            </div>

                            {/* Parent WhatsApp */}
                            <div className="space-y-2">
                                <Label htmlFor="parent_whatsapp">Parent's WhatsApp</Label>
                                <Input
                                    id="parent_whatsapp"
                                    type="text"
                                    value={formData.parent_whatsapp}
                                    onChange={(e) => handleChange('parent_whatsapp', e.target.value)}
                                    placeholder="e.g., +62812345678"
                                    className={errors.parent_whatsapp ? 'border-red-500' : ''}
                                />
                                {errors.parent_whatsapp && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.parent_whatsapp}</p>
                                )}
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Optional. Used for notifications and communication.
                                </p>
                            </div>

                            {/* Form Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="flex-1 sm:flex-none"
                                >
                                    {isSubmitting ? (
                                        <>⏳ Creating...</>
                                    ) : (
                                        <>✅ Create Student</>
                                    )}
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => router.get('/students')}
                                    className="flex-1 sm:flex-none"
                                >
                                    ❌ Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                    <CardContent className="pt-6">
                        <div className="space-y-3">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                                💡 Student Information Tips
                            </h3>
                            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                <li>• NISN must be unique for each student</li>
                                <li>• A unique barcode will be automatically generated</li>
                                <li>• Parent WhatsApp can be used for notifications</li>
                                <li>• Students are active by default and can attend classes</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}