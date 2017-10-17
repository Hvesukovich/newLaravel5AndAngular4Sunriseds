<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $table = 'team';
    protected $fillable = [
        'firstName',
        'lastName',
        'sity',
        'image',
        'position',
        'technologies',
        'experience',
        'created_at',
        'updated_at'
    ];

    public function getTeam(){
        return $this->get()->toArray();
    }

    public function createEmployee($data){
        return $this->create($data);
    }

    public function getEmployeeById($id){
        return $this->find($id);
    }

    public function updateDataEmployee($data){
        return $this->find($data['id'])->update($data);
    }

}
