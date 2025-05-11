<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserIdToTodosTable extends Migration
{
    public function up()
    {
        Schema::table('todos', function (Blueprint $table) {
            // user_id sütununu ekle
            $table->unsignedBigInteger('user_id')->nullable()->after('id');

            // user_id için foreign key tanımla
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('todos', function (Blueprint $table) {
            // Foreign key'i ve sütunu kaldır
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
}