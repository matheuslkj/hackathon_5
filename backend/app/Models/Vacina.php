<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vacina extends Model
{
    use HasFactory;
    protected $fillable = [
        'nome',
        'descricao',
        'doses_necessarias',
        'data_campanha'
    ];

    public function alertas()
    {
        return $this->hasMany(Alerta::class);
    }
}
