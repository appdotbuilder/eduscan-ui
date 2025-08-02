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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('nisn', 20)->unique()->comment('National Student Identification Number');
            $table->string('name');
            $table->string('class');
            $table->enum('gender', ['Male', 'Female']);
            $table->string('parent_whatsapp', 20)->nullable();
            $table->string('barcode')->unique()->comment('Generated barcode for scanning');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('nisn');
            $table->index('class');
            $table->index('barcode');
            $table->index(['class', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};