<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class IdososResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'nascimento' => $this->nascimento,
            'endereco' => $this->endereco,
            'telefone' => $this->telefone,
            'historico_medico' => $this->historico_medico,
            'cpf' => $this->cpf
        ];
    }
}
