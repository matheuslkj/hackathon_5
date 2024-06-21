<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alerta extends Model
{
    use HasFactory;

    protected $fillable = [
        'idoso_id',
        'vacina_id',
        'data_alvo',
        'lido',
    ];

    public function idoso()
    {
        return $this->belongsTo(Idoso::class);
    }

    public function vacina()
    {
        return $this->belongsTo(Vacina::class);
    }
}
