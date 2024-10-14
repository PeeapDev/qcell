<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('queues', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('max_size')->default(100);
            $table->integer('current_size')->default(0);
            $table->integer('estimated_wait_time')->default(0); // in minutes
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Create a pivot table for the many-to-many relationship between queues and users
        Schema::create('queue_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('queue_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('position');
            $table->timestamp('joined_at');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('queue_user');
        Schema::dropIfExists('queues');
    }
};
